# =============================================================================
# Stage 1: Build TypeScript
# =============================================================================
FROM node:24-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN HUSKY=0 npm ci

COPY tsconfig.json ./
COPY src/ ./src/

RUN npm run build

# =============================================================================
# Stage 2: Production runtime
# =============================================================================
FROM node:24-alpine

# hadolint ignore=DL3018
RUN apk add --no-cache tini

WORKDIR /app

COPY package*.json ./
RUN npm pkg delete scripts.prepare && \
    npm ci --omit=dev && \
    npm cache clean --force

COPY --from=builder /app/dist ./dist
COPY VERSION ./

ENV NODE_ENV=production
ENV PORT=4000

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
CMD ["node", "dist/index.js"]
