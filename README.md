# Tbilisi Data Atlas

An evidence-first, multi-page HTML catalog of public and publicly observable data sources for Tbilisi and Georgia. The report contains 50 source profiles, 1,219 field definitions, representative records, access and licensing notes, and a separate inventory of investigated but unavailable or restricted avenues.

No product concepts are included in this report.

## Public report

<https://antopolskiy.github.io/tbilisi-data-atlas/>

## Run locally

```bash
cd /Users/santop/vault/1_Projects/2026-07-cursor-tbilisi-hackathon/.agents/data-source-report
npm run dev
```

Open <http://localhost:3000/>.

## Report routes

- `/` — searchable source catalog
- `/matrix` — compact source comparison matrix
- `/availability` — investigated unavailable, unresolved, private, or restricted avenues
- `/methodology` — evidence and field-freshness definitions
- `/sources/{slug}` — one detailed page per data source

## Validate

```bash
npm run lint
npm test
```

The test suite builds the report, checks the primary routes, asserts the integrated source and field counts, verifies unique generated slugs, and validates every generated field definition.

## Research inputs

Detailed source-by-source research and negative-result inventories live in the sibling `../research-batches/` directory. Import-ready structured records live in `app/data/generated/`.

## Evidence boundary

`Live-tested` means a read-only request returned usable data during the 22 July 2026 research session. It does not automatically mean the source has an open license, stable API contract, or permission for unrestricted reuse. Source pages keep technical access, evidence, freshness, licensing, and privacy separate.
