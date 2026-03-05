# k6 Load Tests for otel-data-gateway

GraphQL load testing for the otel-data-gateway Apollo Server BFF using
[k6](https://grafana.com/docs/k6/).

## Prerequisites

Install k6:

```bash
# Ubuntu/Debian
sudo gpg -k
sudo gpg --no-default-keyring --keyring /usr/share/keyrings/k6-archive-keyring.gpg \
  --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys C5AD17C747E3415A3642D57D77C6C491D6AC1D68
echo "deb [signed-by=/usr/share/keyrings/k6-archive-keyring.gpg] https://dl.k6.io/deb stable main" | \
  sudo tee /etc/apt/sources.list.d/k6.list
sudo apt-get update && sudo apt-get install k6

# macOS
brew install k6
```

## Test Files

| File             | Description                                 |
| ---------------- | ------------------------------------------- |
| `queries.js`     | GraphQL query definitions (Tier 1-4)        |
| `loadtest.js`    | Standard load test with 3 user scenarios    |
| `stress-test.js` | Step-load stress test (10→200 VUs, ~14 min) |

## Quick Start

```bash
# Standard load test (10 VUs, 5 minutes)
k6 run loadtest/loadtest.js

# Custom configuration
k6 run loadtest/loadtest.js -e USERS=20 -e DURATION=10m

# Against local dev server
k6 run loadtest/loadtest.js -e BASE_URL=http://localhost:4000

# Stress test (step load, ~14 minutes)
k6 run loadtest/stress-test.js
```

## CSV Output

Save results for analysis:

```bash
k6 run loadtest/stress-test.js --out csv=results/stress.csv
k6 run loadtest/loadtest.js --out csv=results/loadtest.csv
```

## User Scenarios

### loadtest.js (3 scenarios)

| Scenario        | Weight  | Queries                                                             |
| --------------- | ------- | ------------------------------------------------------------------- |
| `dashboardFlow` | 40% VUs | health, devices, locationCount, garminSports                        |
| `locationFlow`  | 30% VUs | locations (paginated), unifiedGps, dailySummary, referenceLocations |
| `garminFlow`    | 30% VUs | garminActivities, garminActivity, garminTrackPoints                 |

### stress-test.js (step load)

Ramps through 7 stages (2 min each):

| Stage | Target VUs |
| ----- | ---------- |
| 1     | 10         |
| 2     | 25         |
| 3     | 50         |
| 4     | 75         |
| 5     | 100        |
| 6     | 150        |
| 7     | 200        |

Mixed workload: 30% dashboard, 25% locations, 25% garmin, 10% unified, 10%
spatial.

## Semaphore Integration

Run via Ansible playbooks:

```bash
# Standard load test
ansible-playbook playbooks/load-testing/k6-gateway-runner.yml \
  -i inventories/vm-inventory.yml

# Stress test
ansible-playbook playbooks/load-testing/k6-gateway-stress-test.yml \
  -i inventories/vm-inventory.yml
```
