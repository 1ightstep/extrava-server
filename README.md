# extrava-server

Barebones backend architecture for ESP32 medical raw data ingestion.

## Architecture

- `src/controllers`: HTTP controller handlers
- `src/routes`: API route definitions
- `src/services`: business logic (ingestion pipeline)
- `src/db`: Redis and MongoDB connection utilities
- `src/middlewares`: global middleware and error handling

## API routes

- `GET /api/health` - server health check
- `POST /api/esp32/raw` - accept raw payload from ESP32/phone bridge
- `GET /api/users/:userId` - barebones user route

## Processing flow

1. Raw packet is accepted from ESP32 (direct Wi-Fi) or phone bridge.
2. Packet is appended to Redis stream `esp32:raw` for fast intake.
3. Packet is persisted in MongoDB collection `esp32_raw_packets`.
4. Service includes a `queueForPython` stub for your upcoming Python processing step.

## Environment

- `PORT` (default `3000`)
- `REDIS_URL` (default `redis://127.0.0.1:6379`)
- `MONGODB_URI` (default `mongodb://127.0.0.1:27017/extrava`)
