FROM node:20.10.0

# Install pnpm and setup work dir
RUN npm install -g pnpm
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install dependencies
COPY package.json /usr/src/app/
COPY pnpm-lock.yaml /usr/src/app/
RUN pnpm install

# Copy dist
COPY /dist /usr/src/app
COPY tsconfig.json /usr/src/app

EXPOSE 8080
CMD ["node", "endpoints"]