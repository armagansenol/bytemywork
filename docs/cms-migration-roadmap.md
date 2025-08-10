# Sanity ➜ Payload CMS + Supabase Migration Roadmap

This roadmap outlines a zero‑downtime migration that keeps Sanity as the source of truth until Payload + Supabase are production‑ready, then performs a safe cutover with instant rollback available via an environment flag.

## Goals & Non‑Goals

- Goals
  - Keep Sanity fully operational until Payload is ready.
  - Establish a CMS abstraction layer in the app to switch providers without touching pages.
  - Backfill data, then continuously sync Sanity ➜ Payload until cutover.
  - Preserve localization, slugs/SEO, media, and revalidation behavior.
  - Support instant rollback by flipping an env flag.
- Non‑Goals
  - Changing frontend design or IA
  - Refactoring unrelated app logic

## Target Architecture (End‑State)

- Payload CMS connected to Supabase Postgres.
- Optional: Supabase Storage (or S3‑compatible) for media via Payload upload adapter.
- Next.js uses a unified CMS client interface (`frontend/cms/`) that selects provider via `CMS_PROVIDER` env.
- Payload webhooks hit `app/api/revalidate/route.ts` for ISR/cache invalidation and preview support.
- Migration + sync layer mirrors Sanity → Payload until cutover; Sanity is then frozen.

## Environment & Feature Flags

- `CMS_PROVIDER=sanity|payload`
- `SANITY_*` (existing), `PAYLOAD_*`, `SUPABASE_*`
- Optional: `CMS_PROVIDER_OVERRIDES=/home:payload,/works:payload` (per‑route gradual rollout)

---

## Phase 0 — Preparation (1–2 days)

- [ ] Decide hosting: Payload server + Supabase (cloud) for Postgres/Storage.
- [ ] Provision environments: dev, staging, prod for Payload and Supabase.
- [ ] Add env flags (`CMS_PROVIDER`, `PAYLOAD_*`, `SUPABASE_*`).
- [ ] Choose media strategy: Payload uploads to Supabase Storage or S3; update Next Image `remotePatterns`.
- [ ] Document current Sanity schemas, i18n behavior, slugs, and image usage.

Deliverables
- Environments live, credentials stored securely.
- Written mapping draft from Sanity → Payload.

## Phase 1 — Bring up Payload + Supabase (2–3 days)

- [ ] Bootstrap Payload project; connect to Supabase Postgres.
- [ ] Configure admin auth (for editors). App user auth stays in app (optional Supabase Auth).
- [ ] Add plugins: localization, uploads (Supabase Storage/S3 adapter), any field‑level needs.
- [ ] Deploy dev/staging; verify DB connection, admin UI, uploads.

Deliverables
- Payload admin up in dev/staging, media upload working, DB connected.

## Phase 2 — Model Mapping (1–2 days)

Sanity → Payload mapping (high‑level):

- Documents
  - `settings` → Global (localized fields)
  - `project` → Collection
    - Fields: `projectName`, `slug`, `heroImage` (upload), `deliverables` (relation), `techStack` (relation), `date`, `client`, `websiteUrl`, localized fields
  - `deliverable` → Collection (localized `title`)
  - `techStack` → Collection
  - `contactForm` → Collection (if storing submissions)
- Rich text: Map Portable Text to Payload rich text/blocks; plan renderer compatibility.
- Localization: Enable Payload localization to mirror current `language` usage; consider localized slugs.

Deliverables
- Payload collections/globals sketched in code (or spec) with validations and unique indices (e.g., slug per locale).

## Phase 3 — CMS Abstraction Layer in Next.js (1–2 days)

Create a unified interface so pages/components stop depending directly on Sanity.

- [ ] Add `frontend/cms/` with:
  - `types/` for normalized domain models (image, slug, localized text)
  - `adapters/sanityClient.ts` (wrap current GROQ; returns normalized types)
  - `adapters/payloadClient.ts` (REST/GraphQL; returns normalized types)
  - `index.ts` with `getCMSClient()` based on `CMS_PROVIDER`
- [ ] Replace direct imports from `sanity/lib/*` in loaders/pages with the new client.
- [ ] Keep `CMS_PROVIDER=sanity` as default and verify app parity.

Example interface
```ts
export interface CMSClient {
  getSettings(params: { language: string }): Promise<Settings>
  listHighlightedProjects(params: { language: string; limit?: number }): Promise<Project[]>
  getProjectBySlug(params: { slug: string; language: string }): Promise<Project | null>
  submitContactForm?(data: ContactFormInput): Promise<void>
}
```

Deliverables
- App compiles with `CMS_PROVIDER=sanity` via the new abstraction; identical UI.

## Phase 4 — Initial Backfill Migration (2–4 days)

- [ ] Build `scripts/migrate-sanity-to-payload.ts`:
  - Read all Sanity docs via GROQ (expand references)
  - Transform to Payload shapes
  - Maintain ID map (Sanity `_id` → Payload `id`) for reference stability
  - Upload assets (images/files) to Payload/Supabase Storage; keep alt + dimensions
  - Insert in dependency order: `deliverable`, `techStack`, `project`, `settings`, `contactForm` history (if needed)
- [ ] Run against staging; compare counts/fields/refs and spot check pages.

Deliverables
- Staging DB backfilled; ID mapping captured in a table/file.

## Phase 5 — Continuous Sync (2–3 days)

- [ ] Sanity outgoing webhooks (create/update/delete) → Next.js API endpoint
  - Endpoint transforms and upserts into Payload using ID map
  - Implement retries and logging (dead‑letter queue if desired)
- [ ] Nightly reconciliation job to heal drift (compare source/target snapshots).
- [ ] Dual‑write for runtime writes (e.g., `app/api/contact/route.ts`) behind env flag.

Deliverables
- Sanity edits propagate to Payload automatically; drift minimized.

## Phase 6 — Payload Adapter Completion + Parity Tests (2–4 days)

- [ ] Implement `payloadClient.ts` fulfilling the interface (settings, lists, detail, i18n, images, preview/drafts)
- [ ] Add tests comparing Sanity vs Payload responses on sampled content for:
  - Shape parity, localization, slugs
  - Image URLs/metadata
- [ ] Fix mapping/adapter discrepancies.

Deliverables
- Payload adapter returns equivalent data for all app use‑cases.

## Phase 7 — Page‑by‑Page Rollout (3–7 days)

- [ ] Enable per‑route overrides (`CMS_PROVIDER_OVERRIDES`)
- [ ] Start with low‑risk routes; verify SEO/meta/sitemap, images, and revalidation
- [ ] Update `next.config.mjs` remotePatterns for new media hosts
- [ ] Wire Payload → `app/api/revalidate/route.ts` with secret; verify tags
- [ ] Expand to detail pages and global/settings‑driven areas

Deliverables
- Majority of routes served by Payload without user‑visible changes.

## Phase 8 — Cutover (1 day)

- [ ] Flip `CMS_PROVIDER=payload` in production
- [ ] Keep Sanity sync running for 24–72 hours while monitoring
- [ ] Freeze Sanity writes; notify editors; disable webhooks after acceptance

Deliverables
- Production reads entirely from Payload; Sanity frozen.

## Phase 9 — Cleanup (1–2 days)

- [ ] Remove dual‑write/sync code
- [ ] Archive Sanity dataset/export
- [ ] Decommission Sanity or set read‑only
- [ ] Remove unused Sanity codepaths after a stability window

Deliverables
- Lean codebase with single CMS provider.

---

## Concrete Repo Changes

Add
- `frontend/cms/index.ts`
- `frontend/cms/types/*`
- `frontend/cms/adapters/sanityClient.ts`
- `frontend/cms/adapters/payloadClient.ts`
- `app/api/sync/sanity-webhook/route.ts` (ingest Sanity changes into Payload)
- `scripts/migrate-sanity-to-payload.ts`

Update
- Replace direct `sanity/lib/*` usage with `getCMSClient()` in `app/[locale]/**` loaders/pages
- `next.config.mjs`: add Next Image `remotePatterns` for Payload/Storage hosts
- `app/api/revalidate/route.ts`: accept Payload webhook secret and tag pages appropriately
- `.env*`: add `CMS_PROVIDER`, `PAYLOAD_*`, `SUPABASE_*`
- Optional: Dual‑write in `app/api/contact/route.ts`

## i18n, Slugs, Media

- i18n: Enable Payload localization; map existing `language` logic. Consider localized slugs.
- Slugs/SEO: Preserve exact slugs per locale; ensure unique constraints and redirects if needed.
- Media: Decide on Supabase Storage or S3; ensure image metadata (alt, width, height) preserved. Update Next Image domains.

## Revalidation & Preview

- Payload webhooks → `app/api/revalidate/route.ts` with shared secret; tag content appropriately.
- Implement preview/draft mode for editors; secure access via token/session.

## Testing & Monitoring

- Parity tests comparing Sanity vs Payload adapter outputs
- HTML snapshot tests for key routes under both providers
- Link checker (404), sitemap validation, structured data parity
- Monitor webhook failures, adapter errors, and revalidate misses

## Rollback Plan

- Keep `CMS_PROVIDER=sanity` available; flip env to revert instantly.
- Maintain ID map for safe re‑backfill or delta replays.
- Retain Sanity sync until the system is stable post‑cutover.

## Risks & Mitigations

- GROQ projection nuances vs Payload queries → Write adapter transforms + tests.
- Image crops/focal points differences → Validate on sample content; adapt transforms.
- Localization edge cases → Enforce schema constraints; add tests for localized slugs.
- Route param bug: `language` seen as `favicon.ico` in logs → Fix route param handling early to avoid noisy errors during parity testing.

## Rough Timeline (Adjust as needed)

- Week 1: Phases 0–2
- Week 2: Phases 3–4
- Week 3: Phases 5–6
- Week 4: Phase 7 + Cutover
- Week 5: Cleanup

## Immediate Next Steps

1) Create `frontend/cms/` with the interface and Sanity adapter wrapping current queries.
2) Add `CMS_PROVIDER` env and keep `sanity` as default; refactor pages to use the abstraction.
3) Scaffold Payload collections/globals (dev) to match mapping; deploy to staging.
4) Write the initial backfill script and run against staging; validate pages.

---

Questions or changes to the data model? Update the mapping in Phase 2 before backfill.
