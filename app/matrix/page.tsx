import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "../components/site-header";
import { sources } from "../data/sources";

export const metadata: Metadata = {
  title: "Source matrix",
  description: "A compact comparison of coverage, freshness, evidence, access, and schema depth.",
};

export default function MatrixPage() {
  const sorted = [...sources].sort((a, b) =>
    `${a.category}-${a.name}`.localeCompare(`${b.category}-${b.name}`),
  );

  return (
    <main>
      <SiteHeader />
      <header className="method-hero shell matrix-hero">
        <Link className="back-link" href="/">
          ← All sources
        </Link>
        <p className="eyebrow">Comparative index</p>
        <h1>The whole catalog, one row per source.</h1>
        <p>
          Use this matrix to compare freshness, evidence, access mode, and schema depth before
          opening the field-level profile.
        </p>
      </header>

      <section className="shell matrix-section" aria-labelledby="matrix-heading">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Coverage matrix</p>
            <h2 id="matrix-heading">{sources.length} independently cataloged sources</h2>
          </div>
        </div>
        <div className="table-scroll matrix-scroll">
          <table className="source-matrix">
            <thead>
              <tr>
                <th>Source</th>
                <th>Category</th>
                <th>Freshness</th>
                <th>Evidence</th>
                <th>Access kind</th>
                <th>Coverage</th>
                <th>Entities</th>
                <th>Fields</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((source) => {
                const fields = source.schemas.reduce(
                  (total, schema) => total + schema.fields.length,
                  0,
                );
                return (
                  <tr key={source.slug}>
                    <td>
                      <Link href={`/sources/${source.slug}`}>{source.name}</Link>
                      <small>{source.subcategory}</small>
                    </td>
                    <td>{source.category}</td>
                    <td>
                      <span
                        className={`status status-${source.freshness.toLowerCase().replaceAll(" ", "-")}`}
                      >
                        {source.freshness}
                      </span>
                    </td>
                    <td>{source.evidence}</td>
                    <td>{source.sourceKind}</td>
                    <td>{source.geography}</td>
                    <td>{source.schemas.length}</td>
                    <td>{fields}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      <footer className="site-footer shell">
        <p>Rows describe data access, not permission to reuse.</p>
        <Link href="/methodology">Read the evidence method</Link>
      </footer>
    </main>
  );
}
