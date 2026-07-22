import type { Metadata } from "next";
import Link from "next/link";
import { CatalogClient } from "./catalog-client";
import { SiteHeader } from "./components/site-header";
import { sources } from "./data/sources";

export const metadata: Metadata = {
  title: { absolute: "Tbilisi Data Atlas" },
  description:
    "A field-level catalog of public and publicly observable data sources for Tbilisi and Georgia.",
};

export default function Home() {
  const liveCount = sources.filter(
    (source) => source.freshness === "Live" || source.freshness === "Near real-time",
  ).length;
  const testedCount = sources.filter((source) => source.evidence === "Live-tested").length;
  const fieldCount = sources.reduce(
    (total, source) =>
      total + source.schemas.reduce((schemaTotal, schema) => schemaTotal + schema.fields.length, 0),
    0,
  );

  return (
    <main>
      <SiteHeader />
      <section className="hero shell">
        <div className="hero-copy">
          <p className="eyebrow">Evidence-first source catalog · 22 July 2026</p>
          <h1>
            What data does
            <span>Tbilisi actually expose?</span>
          </h1>
          <p className="hero-intro">
            A source-by-source inventory of what exists, how current it is, how it can be
            accessed, and what every returned field means. The evidence catalog stays distinct
            from—but is now directly connected to—the <Link href="/ideas">cross-source idea studio</Link>.
          </p>
        </div>
        <div className="hero-note" aria-label="Research standard">
          <span className="signal-dot" aria-hidden="true" />
          <p>Each source is labeled by evidence level.</p>
          <strong>Live-tested ≠ officially open.</strong>
          <span>Access, licensing, and technical availability are evaluated separately.</span>
        </div>
      </section>

      <section className="metrics shell" aria-label="Catalog summary">
        <div>
          <strong>{sources.length}</strong>
          <span>sources cataloged</span>
        </div>
        <div>
          <strong>{liveCount}</strong>
          <span>live or near-real-time</span>
        </div>
        <div>
          <strong>{testedCount}</strong>
          <span>live-tested</span>
        </div>
        <div>
          <strong>{fieldCount}</strong>
          <span>fields documented</span>
        </div>
      </section>

      <CatalogClient sources={sources} />

      <footer className="site-footer shell">
        <p>Tbilisi Data Atlas · research snapshot, not a guarantee of future availability.</p>
        <Link href="/methodology">Methodology and evidence labels</Link>
      </footer>
    </main>
  );
}
