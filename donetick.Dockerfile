FROM donetick/donetick:v0.1.74@sha256:5e6e2afe0f23c16f791ce52ef22c1914e39673f889e85ba4517b7e6ad4fbc2f0

COPY donetick-entrypoint.sh /donetick-entrypoint.sh
RUN chmod +x /donetick-entrypoint.sh

ENTRYPOINT ["/donetick-entrypoint.sh"]