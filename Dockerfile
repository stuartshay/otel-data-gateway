# syntax=docker/dockerfile:1.23
# =============================================================================
# Stage 1: Build TypeScript (runs on the build host, not the target arch)
# Pinned to $BUILDPLATFORM because tsc output is architecture-independent.
# Native/optional deps installed here are NOT copied into the final image.
# =============================================================================
FROM --platform=$BUILDPLATFORM node:24-alpine AS builder

WORKDIR /app

COPY package*.json ./
# Drop the husky `prepare` lifecycle (devDep, not present in the image) but
# keep all other install scripts so packages like `@newrelic/native-metrics`
# resolve their prebuilt binaries via `node-gyp-build`.
RUN --mount=type=cache,target=/root/.npm,sharing=locked \
    npm pkg delete scripts.prepare && npm ci

COPY codegen.ts tsconfig.json ./
COPY src/ ./src/

RUN npm run build

# =============================================================================
# Stage 2: Production deps (runs on the TARGET platform)
# Installs production-only dependencies for the runtime architecture so
# native/optional binaries (e.g. @newrelic/native-metrics) match the image arch.
# =============================================================================
FROM node:24-alpine AS deps

WORKDIR /app

COPY package*.json ./
RUN --mount=type=cache,target=/root/.npm,sharing=locked \
    npm pkg delete scripts.prepare && npm ci --omit=dev

# =============================================================================
# Stage 3: Production runtime
# =============================================================================
FROM node:24-alpine

# hadolint ignore=DL3018
RUN apk add --no-cache tini

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY package*.json newrelic.cjs VERSION ./

ENV NODE_ENV=production
ENV PORT=4000
ENV NEW_RELIC_CONFIG_FILE=./newrelic.cjs

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -qO- http://localhost:4000/health || exit 1

EXPOSE 4000

USER node

ARG APP_VERSION=dev
ENV APP_VERSION=${APP_VERSION}
LABEL org.opencontainers.image.title="otel-data-gateway"
LABEL org.opencontainers.image.description="Apollo Server GraphQL BFF gateway for otel-data-api"
LABEL org.opencontainers.image.version="${APP_VERSION}"
LABEL org.opencontainers.image.vendor="homelab"

ENTRYPOINT ["/sbin/tini", "--"]
CMD ["node", "--require", "newrelic", "dist/index.js"]
