"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { DataSource, EvidenceLevel, Freshness } from "./data/types";

const freshnessOptions: Freshness[] = [
  "Live",
  "Near real-time",
  "Daily",
  "Periodic",
  "Static reference",
  "Historical",
  "Unknown",
];

const evidenceOptions: EvidenceLevel[] = [
  "Live-tested",
  "Page-verified",
  "Catalog-verified",
  "Reported",
  "Unavailable",
];

function SourceCard({ source }: { source: DataSource }) {
  const fieldCount = source.schemas.reduce((total, schema) => total + schema.fields.length, 0);

  return (
    <article className="source-card">
      <div className="card-topline">
        <span className={`status status-${source.freshness.toLowerCase().replaceAll(" ", "-")}`}>
          {source.freshness}
        </span>
        <span className="evidence">{source.evidence}</span>
      </div>
      <div>
        <p className="card-category">
          {source.category} / {source.subcategory}
        </p>
        <h2>{source.name}</h2>
        <p className="card-summary">{source.executiveSummary}</p>
      </div>
      <dl className="card-facts">
        <div>
          <dt>Provider</dt>
          <dd>{source.provider}</dd>
        </div>
        <div>
          <dt>Coverage</dt>
          <dd>{source.geography}</dd>
        </div>
      </dl>
      <div className="card-footer">
        <span>
          {source.schemas.length} {source.schemas.length === 1 ? "entity" : "entities"} · {fieldCount}{" "}
          fields
        </span>
        <Link href={`/sources/${source.slug}`} aria-label={`Open ${source.name} data profile`}>
          Open data profile <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  );
}

export function CatalogClient({ sources }: { sources: DataSource[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [freshness, setFreshness] = useState("All");
  const [evidence, setEvidence] = useState("All");

  const categories = useMemo(
    () => [...new Set(sources.map((source) => source.category))].sort(),
    [sources],
  );

  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase();

    return sources.filter((source) => {
      const text = [
        source.name,
        source.shortName,
        source.category,
        source.subcategory,
        source.executiveSummary,
        source.provider,
        source.keyEntities.join(" "),
        source.schemas
          .flatMap((schema) => [
            schema.name,
            schema.description,
            ...schema.fields.flatMap((field) => [field.field, field.meaning, field.example]),
          ])
          .join(" "),
      ]
        .filter(Boolean)
        .join(" ")
        .toLocaleLowerCase();

      return (
        (!normalizedQuery || text.includes(normalizedQuery)) &&
        (category === "All" || source.category === category) &&
        (freshness === "All" || source.freshness === freshness) &&
        (evidence === "All" || source.evidence === evidence)
      );
    });
  }, [category, evidence, freshness, query, sources]);

  const reset = () => {
    setQuery("");
    setCategory("All");
    setFreshness("All");
    setEvidence("All");
  };

  return (
    <section className="catalog shell" aria-labelledby="catalog-heading">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Source inventory</p>
          <h2 id="catalog-heading">Browse the evidence</h2>
        </div>
        <p>
          {filtered.length} of {sources.length} sources
        </p>
      </div>

      <div className="filter-panel">
        <label className="search-field">
          <span>Search sources, providers, or fields</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Try GPS, outage, school, air…"
          />
        </label>
        <label>
          <span>Category</span>
          <select value={category} onChange={(event) => setCategory(event.target.value)}>
            <option>All</option>
            {categories.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </label>
        <label>
          <span>Freshness</span>
          <select value={freshness} onChange={(event) => setFreshness(event.target.value)}>
            <option>All</option>
            {freshnessOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </label>
        <label>
          <span>Evidence</span>
          <select value={evidence} onChange={(event) => setEvidence(event.target.value)}>
            <option>All</option>
            {evidenceOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </label>
        <button type="button" className="reset-button" onClick={reset}>
          Reset
        </button>
      </div>

      {filtered.length ? (
        <div className="source-grid">
          {filtered.map((source) => (
            <SourceCard key={source.slug} source={source} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <strong>No source matches those filters.</strong>
          <button type="button" onClick={reset}>
            Clear filters
          </button>
        </div>
      )}
    </section>
  );
}
