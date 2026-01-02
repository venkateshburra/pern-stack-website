# Copilot / AI Agent Instructions for pern-stack-project ✅

Purpose
- Help an AI coding assistant get productive quickly: architecture, critical files, conventions, and workflows.

Quick start (local dev) ⚡
- Ensure a local `.env` with these vars: `PORT`, `PGUSER`, `PGPASSWORD`, `PGHOST`, `PGDATABASE`, `ARCJET_KEY`, `ARCJET_ENC`.
- Run the dev server: `npm run dev` (uses `nodemon backend/server.js`).
- DB is initialized on server start (`initDB()` in `backend/server.js`).

Architecture & why it’s structured this way 🏗️
- Backend: Express (ES modules). Routes -> Controllers -> Neon SQL (tagged template `sql` from `@neondatabase/serverless`).
- DB: Neon serverless; queries use the `sql` tagged template ensure parameterized values (e.g., `VALUES (${name}, ${price})`).
- Protection: Arcjet middleware in `backend/lib/arcjet.js` is used in a global request middleware (`aj.protect`) in `server.js` for bot detection, spoof detection and token-bucket rate limiting.
- Frontend: placeholder `frontend/` (empty); most current work is backend-only.

Files of interest 🔧
- `backend/server.js` — app bootstrap, Arcjet request protection middleware, `initDB()` and `app.listen()`.
- `backend/lib/arcjet.js` — Arcjet config: rules (shield, detectBot, tokenBucket) and modes. Tune here for blocking/limits.
- `backend/config/db.js` — Neon DB connection using env vars (SSL required in connection string).
- `backend/routes/productsRoutes.js` & `backend/controllers/productsController.js` — CRUD endpoints for `products` and example SQL usage.

Project-specific conventions & patterns 📏
- ES modules (`import` / `export default`) and `type: "module"` in `package.json`.
- DB queries: always use the `sql` template tag. Query returns are arrays; controllers typically use `[0]` for single-row results.
- Controller response shape: `{ success: true|false, data: ..., message: ... }`.
- Error handling: controllers log errors and return `500` with a generic message; validate required body fields and return `400`.

Arcjet behavior to be aware of 🔐
- `aj.protect(req, { requested: 1 })` used per request in `server.js`.
- `decision.isDenied()` → 429 when rate-limited (`decision.reason.isRateLimit()`), or 403 for bots. Spoofed bots are detected and rejected separately.
- To modify behaviour (refill rate, capacity, or allowed bot categories) edit `backend/lib/arcjet.js`.

Examples (useful commands) ▶️
- List products: `curl http://localhost:3000/api/products`
- Create: `curl -X POST -H "Content-Type: application/json" -d '{"name":"Foo","price":10.99,"image":"/img.png"}' http://localhost:3000/api/products`
- Get single: `curl http://localhost:3000/api/products/1`

Security & maintainability notes ⚠️
- Do NOT commit real secrets; `.env` contains production-like values—avoid echoing them in code/comments or PRs.
- Neon connection requires SSL (`sslmode=require`) — check `backend/config/db.js`.

When editing: small, focused changes preferred
- Keep changes minimal and test using `npm run dev` and curl requests.
- If you change DB schema, update `initDB()` in `backend/server.js` or add migration steps.

If anything is unclear or you'd like expansions (testing, CI, or frontend guidance), say which area to expand and I’ll update this file. ✍️
