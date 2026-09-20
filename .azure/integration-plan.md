
# Veneria Integration Plan

## Backend
- Folder: repository root
- Run: `npm run dev`
- Port: `3000`
- Build: `npm run build`
- Health: `GET /api/health`
- Runtime: Next.js 15 App Router SSR

## Frontend
- Folder: repository root
- Build: `npm run build`
- Dev: `npm run dev`
- API seam: `src/api/index.ts`; replace `mockClient` export with live client method-for-method.
- Delete after wiring: `src/api/mockClient.ts`, `src/mocks/*`, local duplicated types, and any preview-state switcher files if added.

## API routes
- GET `/api/health`
- POST `/api/contact`
- POST `/api/auth/register`
- POST `/api/auth/login`
- GET `/api/auth/me`
- GET `/api/products`
- POST `/api/products`
- GET `/api/services`
- POST `/api/services`
- GET `/api/admin/messages`
- GET `/produits`
- GET `/produits/[slug]`
- GET `/services`
- GET `/services/[slug]`
- POST `/contact`
- POST `/admin/produits`
- PATCH `/admin/produits/[id]`
- DELETE `/admin/produits/[id]`
- POST `/admin/services`
- PATCH `/admin/services/[id]`
- GET `/admin/messages`
- PATCH `/admin/messages/[id]`

## Database
- PostgreSQL via Neon; Prisma
- Schema: `prisma/schema.prisma`
- Migrations: `prisma/migrations/`
- Connection: `DATABASE_URL`
- NO seed data is to be created.

## Media and auth
- Cloudinary env: `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`
- Auth signing: `AUTH_SECRET`; complete JWT/session hardening during integration.

## Shared types
- `src/types/index.ts`; frontend and server imports use `@/types`.

## Services
- Essential: Next.js web app, Neon PostgreSQL
- Enhancement: Cloudinary media storage

## Integration results
- Prisma migration `20260920120000_init` is present, non-empty, and applied; `prisma migrate status` reports the database is up to date.
- Backend smoke test passed on port 3000: `/api/health`, `/api/products`, `/api/services`, `/api/auth/me`, `/api/admin/messages`, `/produits`, and `/services` returned 200.
- Validation probes returned structured 422 responses for invalid contact, auth, product, and service writes. Missing message updates now return structured 404 responses.
- Frontend API seam uses the typed live client in `src/api/client.ts`; no mock client, mock data, or preview-state imports remain under `src/`.
- End-to-end SSR verification passed: `/admin/messages` rendered successfully through the live API client after a clean host restart.
- `npm run build` and `npx tsc --noEmit` passed. `npm test` is configured but no test files are currently present.
