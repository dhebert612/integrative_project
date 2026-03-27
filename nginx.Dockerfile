FROM nginx:1.28.3-alpine@sha256:a8b39bd9cf0f83869a2162827a0caf6137ddf759d50a171451b335cecc87d236

# 1. Update libraries to fix CVE-2026-27135, CVE-2026-3805
RUN apk update && apk upgrade --no-cache && \
    apk add --no-cache libpng libcrypto3 libssl3 curl nghttp2-libs

# 2. Fix permissions for the unprivileged 'nginx' user
RUN chown -R nginx:nginx /var/cache/nginx /var/log/nginx /etc/nginx/conf.d && \
    touch /var/run/nginx.pid && \
    chown nginx:nginx /var/run/nginx.pid

COPY nginx.conf /etc/nginx/nginx.conf

USER nginx

EXPOSE 8080