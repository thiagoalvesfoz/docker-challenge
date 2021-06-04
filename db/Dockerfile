FROM mysql:5.7
COPY dump.sql /tmp
RUN cp /tmp/dump.sql /docker-entrypoint-initdb.d
