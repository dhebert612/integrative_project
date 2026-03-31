export type Project = {
    slug: string;
    title: string;
    tagline: string;
    tech: string[];
    highlights: string[];
    links: {
        repo?: string;
        live?: string;
        demo?: string;
    };
    featured?: boolean;
}

import fireworksVideo from "./fireworks.mp4";
import chatVideo from "./Chat.mp4";

export const projects: Project[] = [
  {
    slug: "planet-viewer",
    title: "Planet Viewer (Skydar)",
    tagline: "Web app that shows visible planets with a 3D viewer.",
    tech: ["React", "JavaScript", "Three.js / R3F", "Node", "MongoDB", "Express"],
    highlights: [
      "Calculated planetary positions using an <strong>astronomy library</strong>.",
      "Built a 3D planet sphere viewer and optimized performance.",
      "Led a small team and coordinated features and reviews.",
      "Created an <strong>API</strong> which returns planet coordinates based on time and location."
    ],
    links: {
      repo: "https://gitlab.com/dawson-cst-cohort-2026/520/section1/teams/Team-F13/520-project-ionita-hebert-nadarajah",
      live: "http://16.52.156.183:3001/",
    },
    featured: true,
  },
  {
    slug: "fireworks-simulation",
    title: "Fireworks Simulation",
    tagline: "MonoGame fireworks simulation with particle physics and clean architecture patterns.",
    tech: ["C#", ".NET", "MonoGame", "OOP", "Design Patterns"],
    highlights: [
      "Simulated particles with gravity, impulses, lifespan decay, and momentum inheritance for realistic bursts.",
      "Applied <strong>interface-driven design</strong> with <strong>immutable models</strong> and guard clauses for safer state management.",
      "Used <strong>Factory pattern</strong> and <strong>lazy initialization</strong> to control object creation and improve performance characteristics.",
      "Built reusable <strong>effect/pattern abstractions</strong> to generate varied firework behaviors."
    ],
    links: {
      repo: "https://gitlab.com/dawson-cst-cohort-2026/510/section1/hebert/fireworksSimulator",
      demo: fireworksVideo
    },
    featured: false,
  },
  {
    slug: "realtime-chat-sensor-dashboard",
    title: "Realtime Chat + Sensor Dashboard",
    tagline: "WebSocket chat with history replay plus an MQTT-powered sensor dashboard.",
    tech: ["Python", "WebSockets", "MQTT", "JavaScript"],
    highlights: [
      "Built a <strong>WebSocket server</strong> broadcasting realtime chat with history replay for new clients.",
      "Streamed temperature/humidity (and image feeds) from <strong>MQTT topics</strong> into a live dashboard UI.",
      "Designed <strong>message/event payloads</strong> for reliable fan-out and UI updates."
    ],
    links: {
      repo: "https://gitlab.com/dawson-cst-cohort-2026/540/students/DavidH/a2-distribute",
      demo: chatVideo
    },
    featured: true,
  },
  {
    slug: "office-hour-scheduler",
    title: "Office-Hour Scheduler",
    tagline: "Flask REST API for scheduling with roles, JWT auth, and PostgreSQL.",
    tech: ["Flask", "PostgreSQL", "JWT", "Docker"],
    highlights: [
      "Implemented <strong>RESTful APIs</strong> with role-based access control for students, teachers, and admins.",
      "Added <strong>JWT authentication</strong> with refresh tokens; structured the app using <strong>Blueprints</strong> + <strong>factory pattern</strong>.",
      "Introduced simple caching for frequently accessed data to reduce repeated queries.",
      "Containerized the service with <strong>Docker</strong> for reproducible local and deployment environments."
    ],
    links: {
      // repo: "https://...",
      // live: "https://..."
    },
    featured: true,
  }
];