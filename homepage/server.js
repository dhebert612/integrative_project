const express = require('express');
const Docker = require('dockerode');
const cors = require('cors');
const path = require('path');

const app = express();
const docker = new Docker({ socketPath: '/var/run/docker.sock' });
const sseClients = new Set();

const MAX_STREAM_NAMES = 30;

app.use(cors());

// Serve static files with proper MIME types
app.use(express.static(__dirname, {
  maxAge: '1h',
  etag: false,
  setHeaders: (res, path) => {
    if (path.endsWith('.css')) {
      res.setHeader('Content-Type', 'text/css');
    } else if (path.endsWith('.js')) {
      res.setHeader('Content-Type', 'application/javascript');
    } else if (path.endsWith('.html')) {
      res.setHeader('Content-Type', 'text/html');
    }
  }
}));

function normalizeContainerName(rawName) {
  return rawName.replace('/', '');
}

function toContainerDto(container) {
  return {
    name: normalizeContainerName(container.Names[0]),
    state: container.State,
    status: container.Status,
    image: container.Image
  };
}

async function getContainerByName(targetName) {
  const containers = await docker.listContainers({ all: true });
  const match = containers.find((c) =>
    c.Names.some((n) => normalizeContainerName(n) === targetName)
  );

  return match || null;
}

function parseRequestedNames(rawNames) {
  if (typeof rawNames !== 'string') {
    return new Set();
  }

  const parsed = rawNames
    .split(',')
    .map((name) => name.trim())
    .filter((name) => /^[a-zA-Z0-9_.-]+$/.test(name))
    .slice(0, MAX_STREAM_NAMES);

  return new Set(parsed);
}

async function getContainerSnapshotForNames(requestedNames) {
  const containers = await docker.listContainers({ all: true });

  return containers
    .map(toContainerDto)
    .filter((container) => requestedNames.has(container.name));
}

function sendSseEvent(res, payload) {
  res.write(`data: ${JSON.stringify(payload)}\n\n`);
}

function broadcastSseToSubscribers(containerName, payload) {
  for (const client of sseClients) {
    if (client.names.has(containerName)) {
      sendSseEvent(client.res, payload);
    }
  }
}

function hasSubscribersForContainer(containerName) {
  for (const client of sseClients) {
    if (client.names.has(containerName)) {
      return true;
    }
  }

  return false;
}

async function broadcastContainerUpdate(containerName) {
  if (!hasSubscribersForContainer(containerName)) {
    return;
  }

  const container = await getContainerByName(containerName);
  if (!container) {
    broadcastSseToSubscribers(containerName, {
      type: 'update',
      container: { name: containerName, state: 'missing', status: 'missing' }
    });
    return;
  }

  broadcastSseToSubscribers(containerName, { type: 'update', container: toContainerDto(container) });
}

async function startDockerEventStream() {
  try {
    eventStream = await docker.getEvents();
    let buffer = '';

    eventStream.on('data', async (chunk) => {
      buffer += chunk.toString();
      const lines = buffer.split('\n');
      buffer = lines.pop() || '';

      for (const line of lines) {
        if (!line.trim()) {
          continue;
        }

        try {
          const event = JSON.parse(line);
          if (event.Type !== 'container') {
            continue;
          }

          const containerName = event.Actor?.Attributes?.name;
          if (!containerName) {
            continue;
          }

          await broadcastContainerUpdate(containerName);
        } catch (parseError) {
          console.error('Failed to parse docker event line:', parseError.message);
        }
      }
    });

    eventStream.on('error', (error) => {
      console.error('Docker event stream error:', error.message);
      setTimeout(startDockerEventStream, 1000);
    });

    eventStream.on('end', () => {
      console.warn('Docker event stream ended. Restarting...');
      setTimeout(startDockerEventStream, 1000);
    });
  } catch (error) {
    console.error('Unable to start docker event stream:', error.message);
    setTimeout(startDockerEventStream, 2000);
  }
}

// SSE stream for live container status updates
app.get('/api/containers/stream', async (req, res) => {
  const requestedNames = parseRequestedNames(req.query.names);
  if (!requestedNames.size) {
    return res.status(400).json({ error: 'Query parameter names is required' });
  }

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();

  const client = { res, names: requestedNames };
  sseClients.add(client);

  try {
    const snapshot = await getContainerSnapshotForNames(requestedNames);
    sendSseEvent(res, { type: 'snapshot', containers: snapshot });
  } catch (error) {
    sendSseEvent(res, { type: 'error', message: 'Failed to load initial snapshot' });
  }

  const keepAlive = setInterval(() => {
    res.write(': keepalive\n\n');
  }, 20000);

  req.on('close', () => {
    clearInterval(keepAlive);
    sseClients.delete(client);
  });
});

// Get a specific container by name
app.get('/api/containers/:name', async (req, res) => {
  try {
    const targetName = req.params.name.trim();
    const match = await getContainerByName(targetName);

    if (!match) {
      return res.status(404).json({ error: `Container '${targetName}' not found` });
    }

    res.json(toContainerDto(match));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Serve index.html for all non-API, non-static routes (SPA fallback)
app.use((req, res) => {
  // Don't serve index.html for API routes or requests with file extensions
  if (req.path.startsWith('/api/')) {
    return res.status(404).json({ error: 'API route not found' });
  }
  
  if (!req.path.includes('.') || req.path.endsWith('.html')) {
    res.sendFile(path.join(__dirname, 'index.html'));
  } else {
    // For static file requests we can't find, return 404
    res.status(404).json({ error: 'Not found' });
  }
});

const PORT = process.env.PORT || 3001;
let eventStream = null;
let server = null;

const shutdown = async (signal) => {
  console.log(`\n${signal} received. Shutting down gracefully...`);

  // Close the HTTP server (stops accepting new connections)
  if (server) {
    server.close(() => {
      console.log('HTTP server closed');
    });
  }

  // Close all SSE connections
  for (const client of sseClients) {
    try {
      client.res.end();
    } catch (error) {
      console.error('Error closing SSE client:', error.message);
    }
  }
  sseClients.clear();
  console.log('SSE clients closed');

  // Close Docker event stream
  if (eventStream) {
    try {
      eventStream.destroy();
    } catch (error) {
      console.error('Error closing Docker event stream:', error.message);
    }
  }

  console.log('Shutdown complete. Exiting...');
  process.exit(0);
};

// Handle graceful shutdown on signals
process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  shutdown('uncaughtException');
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  shutdown('unhandledRejection');
});

server = app.listen(PORT, () => {
  console.log(`Dashboard API running on port ${PORT}`);
  startDockerEventStream();
});