FROM alpine:latest

MAINTAINER high stakes academy <hsaghostbot@gmail.com>

RUN apk update && \
apk add tini curl wget nodejs nodejs-npm vim bash git && \
npm install npm@latest -g;

RUN adduser -D -g "" -G wheel hseco && \
    mkdir -p /var/www/app && \
    chown -R hseco /var/www && \
    echo "hseco  ALL = ( ALL ) NOPASSWD: ALL" >> /etc/sudoers

# Define the running user
USER hseco

# Define some NPM jailed environment variables
ENV NPM_PACKAGES="/home/hseco/.cache/npm-packages" \
    NODE_PATH="/home/hsecor/.cache/npm-packages/lib/node_modules" \
    MANPATH="/home/hseco/.cache/npm-packages/share/man:/usr/share/man" \
    PREFIX='/home/hseco/.local' \
    PATH="/home/hseco/.local/bin:/home/hseco/.cache/npm-packages/bin:/home/hseco/.yarn/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"

# NPM config for setting the prefix as well
RUN mkdir -p $NPM_PACKAGES && \
    npm config set prefix $NPM_PACKAGES && \
    npm config set cache '/home/hseco/.cache/npm'

# Installing Yarn
# RUN echo 'Installing Yarn' && \
#     curl -o- -L https://yarnpkg.com/install.sh | bash

EXPOSE 3000

# Application directory
WORKDIR "/var/www/app"

# Entrypoint
ENTRYPOINT ["/sbin/tini", "--"]

# # As non daemon and single base image, it may be used as cli container
CMD ["/bin/bash", "-c"]