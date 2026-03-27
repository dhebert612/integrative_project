FROM vaultwarden/server:1.35.4-alpine@sha256:34b4e91ed4c2a4d2191245325608b2a84bedbeb9c9dd561e3c0924b98ef7126c

RUN addgroup -g 1000 vaultwarden && \
    adduser -u 1000 -G vaultwarden -h /data -D vaultwarden && \
    chown -R vaultwarden:vaultwarden /data /web-vault

USER vaultwarden