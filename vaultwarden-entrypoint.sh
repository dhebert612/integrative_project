#!/bin/sh

# Read secrets from files and export as environment variables
if [ -f /run/secrets/vaultwarden-password ]; then
  export ADMIN_TOKEN=$(cat /run/secrets/vaultwarden-password)
fi

# Execute the original entrypoint
exec /start.sh