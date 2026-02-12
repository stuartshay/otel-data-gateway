# otel-data-gateway

Apollo Server GraphQL BFF (Backend-for-Frontend) gateway that maps REST
endpoints from [otel-data-api](https://github.com/stuartshay/otel-data-api) to
a unified GraphQL API.

## Architecture

```text
otel-ui (React) → otel-data-gateway (GraphQL) → otel-data-api (REST/FastAPI)
```

## Quick Start

```bash
# Setup
./setup.sh

# Development (watch mode)
npm run dev

# Open GraphQL Playground
open http://localhost:4000
```

## GraphQL Queries

| Query                | REST Endpoint                      | Description         |
| -------------------- | ---------------------------------- | ------------------- |
| `locations`          | `/api/v1/locations`                | OwnTracks locations |
| `location`           | `/api/v1/locations/:id`            | Location by ID      |
| `devices`            | `/api/v1/locations/devices`        | List devices        |
| `locationCount`      | `/api/v1/locations/count`          | Location count      |
| `garminActivities`   | `/api/v1/garmin/activities`        | Garmin activities   |
| `garminActivity`     | `/api/v1/garmin/activities/:id`    | Activity by ID      |
| `garminTrackPoints`  | `/api/v1/garmin/.../tracks`        | Track points        |
| `garminSports`       | `/api/v1/garmin/sports`            | Sport types         |
| `unifiedGps`         | `/api/v1/gps/unified`              | Unified GPS points  |
| `dailySummary`       | `/api/v1/gps/daily-summary`        | Daily summary       |
| `referenceLocations` | `/api/v1/reference-locations`      | Reference locations |
| `referenceLocation`  | `/api/v1/reference-locations/:id`  | Reference by ID     |
| `nearbyPoints`       | `/api/v1/spatial/nearby`           | Nearby GPS points   |
| `calculateDistance`  | `/api/v1/spatial/distance`         | Calculate distance  |
| `withinReference`    | `/api/v1/spatial/within-ref/:name` | Within reference    |

## Example Query

```graphql
query {
  locations(device_id: "iphone", limit: 5) {
    items {
      id
      latitude
      longitude
      timestamp
      battery
    }
    total
    limit
    offset
  }
}
```

## Environment Variables

| Variable            | Default                               | Description |
| ------------------- | ------------------------------------- | ----------- |
| `PORT`              | `4000`                                | Server port |
| `OTEL_DATA_API_URL` | `https://api.lab.informationcart.com` | API URL     |
| `NODE_ENV`          | `production`                          | Environment |

## Commands

```bash
make help          # Show all commands
make dev           # Start dev server (watch mode)
make build         # Build for production
make start         # Start production server
make lint          # Run all linters
make format        # Format code
make type-check    # TypeScript type checking
make test          # Run tests
make docker-build  # Build Docker image
```

## Docker

```bash
docker build -t stuartshay/otel-data-gateway .
docker run -p 4000:4000 \
  -e OTEL_DATA_API_URL=https://api.lab.informationcart.com \
  stuartshay/otel-data-gateway
```

## Target Infrastructure

| Property     | Value                           |
| ------------ | ------------------------------- |
| K8s Cluster  | k8s-pi5-cluster                 |
| Namespace    | otel-data-gateway               |
| DNS          | gateway.lab.informationcart.com |
| Docker Image | stuartshay/otel-data-gateway    |
| Port         | 4000                            |

## Related Repositories

- [otel-data-api](https://github.com/stuartshay/otel-data-api) — REST API backend
- [otel-ui](https://github.com/stuartshay/otel-ui) — React frontend
- [k8s-gitops](https://github.com/stuartshay/k8s-gitops) — Kubernetes deployment
