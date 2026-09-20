# Project Plan

**Status**: Integrated
**Created**: 2026-09-20
**Mode**: NEW

---

## 1. Project Overview

**Goal**: Construire Veneria, un site vitrine francophone haut de gamme pour presenter des produits et services, recevoir des demandes de contact et administrer le contenu depuis un espace protege. Le projet est concu pour que chaque module soit testable independamment.

**App Type**: Full-stack SSR

**API Login**: Yes

**Mode**: NEW

**Deployment Plan**: No deployment plan found

**External Integrations**: Neon PostgreSQL via Prisma (`DATABASE_URL`) pour les produits, services et messages; Cloudinary pour les images (`CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`); Azure Container Apps pour l'execution du conteneur Docker.

---

## 2. Veneria Web App — frontend

| Component | Technology |
|-----------|-----------|
| **Language** | TypeScript |
| **Runtime** | Node |
| **Framework** | Next.js 15 App Router |
| **Package Manager** | npm |
| **Test Runner** | vitest |
| **Mocking Library** | vi.mock |
| **Test Command** | npm test |
| **Orchestration** | docker-compose |

The service owns the SSR public site, Server Actions, Prisma access, validation, protected administration, and Cloudinary upload flows. Keep domain services behind testable modules and validate all mutations with Zod.

---

## 3. Services Required

| Azure Service | Role in App | Environment Variable | Default Value (Local) | Classification |
|---------------|------------|---------------------|----------------------|----------------|
| Azure Container Apps | Run the Dockerized Next.js SSR application | `PORT` | `3000` | Essential |

Neon PostgreSQL and Cloudinary are required external managed integrations selected by the product requirements; they are not Azure resources in this plan. Cloudinary is confirmed as the canonical media store for all product and service images, using `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, and `CLOUDINARY_API_SECRET`. No Azure Blob Storage or other Azure storage resource is required.

---

## 4. Prerequisites

### Run

| Tool | Service(s) | Installed | Version |
|------|------------|-----------|---------|
| Node.js | `veneria-web` | ✅ | `v24.21.0` |
| npm | `veneria-web` | ✅ | `11.19.0` |

### Debug

| Tool | Service(s) | Installed | Version |
|------|------------|-----------|---------|
| Docker | `veneria-web` | ❓ | Could not be confirmed |
| Docker Compose | `veneria-web` | ❓ | Could not be confirmed |
| Chrome | `veneria-web` | ✅ | `153.0.8010.50` |

Double-check all tools marked ❓ before local container debugging. No Azure Functions extension is required because this plan contains no Azure Functions service.

---

## 5. Design System & UI

**Component Library**: Tailwind CSS + shadcn/ui
**Style Direction**: Editorial Mediterranean luxury: warm mineral surfaces, deep green actions, ochre and terracotta accents, generous editorial spacing, and discreet rounded corners (rounded-lg maximum, with no aggressive radius). Public pages feel tactile and image-led; admin views are denser while retaining the same craft palette.
**Typography**: Plus Jakarta Sans for headings and Inter for body text, both loaded with `next/font`

### Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `primary` | `#1F4A2C` | Deep green actions, active navigation, links and primary CTAs |
| `accent`  | `#B9752D` | Ochre and earth accents, categories and secondary highlights |
| `surface` | `#FAF7F0` | Cream background for the general page surface |
| `text`    | `#292821` | Very dark primary text for headings and body copy |
| `muted`   | `#756F63` | Captions, metadata and supporting text |
| `border`  | `#D9D0C2` | Fine dividers and field borders |

### Pages

| Page | Route | Purpose | Layout |
|------|-------|---------|--------|
| Accueil | `/` | Introduire Veneria et orienter vers les collections et services | `header + nav + hero + card-list + footer` |
| Produits | `/produits` | Parcourir le catalogue public | `header + nav + main + grid + footer` |
| Detail produit | `/produits/[slug]` | Examiner un produit et envoyer une demande | `header + nav + split(media|main) + actions + footer` |
| Services | `/services` | Decouvrir les accompagnements proposes | `header + nav + main + card-list + footer` |
| Contact | `/contact` | Envoyer un message a l'equipe Veneria | `header + nav + two-column(form+main) + footer` |
| Administration | `/admin` | Gerer les produits, services et messages recus | `header + sidebar + main + table + action-bar` |

### Sample Content

Accueil — mise en avant:
| Element | Valeur | Etat |
|---|---|---|
| Collection | Terre cuite artisanale | En vedette |
| Produit | Vase Alba | 68 EUR |
| Service | Conseil amenagement | Disponible |

Produits — catalogue:
| Produit | Categorie | Prix | Statut |
|---|---|---:|---|
| Vase Alba | Objets | 68 EUR | Publie |
| Lampe Solis | Luminaires | 145 EUR | Publie |
| Table basse Nera | Mobilier | 420 EUR | Publie |

Detail produit — Vase Alba:
| Champ | Valeur | Etat |
|---|---|---|
| Matiere | Ceramique emaillee | Disponible |
| Origine | Atelier de Vallauris | Publie |
| Delai | 3 a 4 semaines | Sur commande |

Services — offres:
| Service | Duree | Prix de depart | Etat |
|---|---|---:|---|
| Conseil amenagement | 90 min | 180 EUR | Disponible |
| Direction artistique | 4 semaines | 1 200 EUR | Disponible |
| Selection sur mesure | 2 semaines | 320 EUR | Disponible |

Contact — formulaire:
| Champ | Valeur par defaut |
|---|---|
| Nom | Camille Martin |
| Email | camille.martin@example.com |
| Sujet | Projet d'amenagement |
| Message | Bonjour, je souhaite echanger au sujet d'une selection pour mon interieur. |

Administration — messages recus:
| Expediteur | Sujet | Recu le | Statut |
|---|---|---|---|
| Camille Martin | Projet d'amenagement | 18 sept. 2026 | Nouveau |
| Leo Bernard | Disponibilite Vase Alba | 17 sept. 2026 | En cours |
| Ines Roy | Conseil amenagement | 15 sept. 2026 | Traite |

The preview set assigns loading skeletons to Produits, an empty state to the Services tab, and an inline error with retry to Administration; the remaining pages show populated data.

---

## 6. Project Structure

```text
veneria/
├── .azure/
│   └── project-plan.md
├── .env.example
├── Dockerfile
├── docker-compose.yml
├── package.json
├── prisma/
│   └── schema.prisma
├── public/
├── src/
│   ├── app/
│   │   ├── (public)/
│   │   │   ├── page.tsx
│   │   │   ├── produits/page.tsx
│   │   │   ├── produits/[slug]/page.tsx
│   │   │   ├── services/page.tsx
│   │   │   ├── services/[slug]/page.tsx
│   │   │   ├── a-propos/page.tsx
│   │   │   └── contact/page.tsx
│   │   ├── admin/
│   │   │   ├── page.tsx
│   │   │   ├── produits/page.tsx
│   │   │   ├── services/page.tsx
│   │   │   └── messages/page.tsx
│   │   ├── api/health/route.ts
│   │   ├── layout.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── public/
│   │   ├── admin/
│   │   └── ui/
│   ├── lib/
│   │   ├── auth.ts
│   │   ├── cloudinary.ts
│   │   ├── prisma.ts
│   │   └── validation.ts
│   ├── actions/
│   │   ├── products.ts
│   │   ├── services.ts
│   │   └── messages.ts
│   └── types/
└── tests/
    ├── actions/
    ├── components/
    └── validation/
```

---

## 7. Route Definitions

| # | Method | Path | Description | Request Body | Response Body | Status Codes |
|---|--------|------|-------------|-------------|--------------|-------------|
| 1 | GET | `/api/health` | Health check for Container Apps | — | `{ status, services }` | 200, 503 |
| 2 | GET | `/produits` | Render the published product catalogue | — | SSR HTML | 200, 500 |
| 3 | GET | `/produits/[slug]` | Render one published product | — | SSR HTML | 200, 404, 500 |
| 4 | GET | `/services` | Render published services | — | SSR HTML | 200, 500 |
| 5 | GET | `/services/[slug]` | Render one published service | — | SSR HTML | 200, 404, 500 |
| 6 | POST | `/contact` | Validate and persist a contact message | `{ name, email, subject, message }` | `{ messageId, status }` | 201, 422, 500 |
| 7 | POST | `/admin/produits` | Create a product through a protected Server Action | `{ name, slug, description, price, imageUrl }` | `{ product }` | 201, 401, 422, 409 |
| 8 | PATCH | `/admin/produits/[id]` | Update a product through a protected Server Action | `{ name?, description?, price?, imageUrl?, published? }` | `{ product }` | 200, 401, 404, 422 |
| 9 | DELETE | `/admin/produits/[id]` | Delete a product through a protected Server Action | — | `{ deleted: true }` | 200, 401, 404 |
| 10 | POST | `/admin/services` | Create a service through a protected Server Action | `{ name, slug, description, duration, priceFrom }` | `{ service }` | 201, 401, 422, 409 |
| 11 | PATCH | `/admin/services/[id]` | Update a service through a protected Server Action | `{ name?, description?, duration?, priceFrom?, published? }` | `{ service }` | 200, 401, 404, 422 |
| 12 | GET | `/admin/messages` | List contact messages for administrators | — | `{ messages }` | 200, 401, 500 |
| 13 | PATCH | `/admin/messages/[id]` | Change a message workflow status | `{ status }` | `{ message }` | 200, 401, 404, 422 |

All error responses use `{ error: { code, message, details } }`.

---

## 8. Next Steps

1. Run **azure-project-scaffold** to execute this plan
2. Run **azure-project-integrate** to wire the frontend to live data, smoke-test the backend, and create the migrations
3. Run **azure-debug-plan** → **azure-debug-generate** for Docker emulators and VS Code debugging
4. Run the **azure-deploy** agent when ready; it uses **azure-app-onboard** for architecture, cost estimation, IaC generation, provisioning, and health verification
