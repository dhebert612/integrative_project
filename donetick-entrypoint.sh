#!/bin/sh

# Read secrets from files and export as environment variables
if [ -f /run/secrets/donetick-JWT ]; then
  export DT_JWT_SECRET=$(cat /run/secrets/donetick-JWT)
fi

# Execute the original entrypoint
exec /donetick