# =============================================================================
# Stage 1: Build TypeScript
# =============================================================================
FROM node:24-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY tsconfig.json ./
COPY src/ ./src/

RUN npm run build

# =============================================================================
# Stage 2: Production runtime
# =============================================================================
FROM node:24-alpine

RUN apk add --no-cache tini

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev && npm cache clean --force

COPY --from=builder /app/dist ./dist
COPY VERSION ./

ENV NODE_ENV=production
ENV PORT=4000

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -qO- --header='Content-Type: application/json' \
  --post-data='{"query":"{health{status}}"}' \
  http://localhost:4000/ || exit 1

EXPOSE 4000

USER node

ARG APP_VERSION=dev
LABEL org.opencontainers.image.title="otel-data-gateway"
LABEL org.opencontainers.image.description="Apollo Server GraphQL BFF gateway for otel-data-api"
LABEL org.opencontainers.image.version="${APP_VERSION}"
LABEL org.opencontainers.image.vendor="homelab"

ENTRYPOINT ["/sbin/tini", "--"]
CMD ["node", "dist/index.js"]
