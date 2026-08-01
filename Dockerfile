# syntax=docker/dockerfile:1.26
# =============================================================================
# Stage 1: Build TypeScript (runs on the build host, not the target arch)
# Pinned to $BUILDPLATFORM because tsc output is architecture-independent.
# Build-stage dependencies are not copied into the final runtime image.
# =============================================================================
FROM --platform=$BUILDPLATFORM node:24-alpine AS builder

WORKDIR /app

COPY package*.json ./
# Drop the husky `prepare` lifecycle (devDep, not present in the image) but
# keep all other install scripts for normal package installation behavior.
RUN --mount=type=cache,target=/root/.npm,sharing=locked \
    npm pkg delete scripts.prepare && npm ci

COPY codegen.ts tsconfig.json ./
COPY src/ ./src/

RUN npm run build

# =============================================================================
# Stage 2: Production deps (runs on the TARGET platform)
# Installs production-only dependencies for the runtime architecture.
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
COPY package*.json VERSION ./

ENV NODE_ENV=production
ENV PORT=4000

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD ["wget", "-qO-", "http://localhost:4000/health"]

EXPOSE 4000

# 1000 is node:24-alpine's built-in "node" user's UID -- numeric so it
# resolves without a passwd lookup on hosts that don't share this image's
# user database.
USER 1000

ARG APP_VERSION=dev
ENV APP_VERSION=${APP_VERSION}
LABEL org.opencontainers.image.title="otel-data-gateway"
LABEL org.opencontainers.image.description="Apollo Server GraphQL BFF gateway for otel-data-api"
LABEL org.opencontainers.image.version="${APP_VERSION}"
LABEL org.opencontainers.image.vendor="homelab"

ENTRYPOINT ["/sbin/tini", "--"]
# --import loads the OpenTelemetry SDK bootstrap to completion before the
# main entry point starts, so http/undici/express instrumentation is
# registered before those modules are ever imported by dist/index.js. This
# is the ESM equivalent of the classic `require('newrelic')`-first-line
# pattern -- that trick itself doesn't apply here since this app is ESM
# ("type": "module").
CMD ["node", "--import", "./dist/instrumentation.js", "dist/index.js"]
