import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "../../components/site-header";
import { ideasForSource } from "../../data/ideas";
import { sourceBySlug, sources } from "../../data/sources";
import type { FieldFreshness } from "../../data/types";

export function generateStaticParams() {
  return sources.map((source) => ({ slug: source.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const source = sourceBySlug.get(slug);

  if (!source) return {};

  return {
    title: source.name,
    description: source.executiveSummary,
  };
}

const freshnessDefinition: Record<FieldFreshness, string> = {
  live: "Changes with current operations or observations",
  reference: "Relatively stable identity, geography, or metadata",
  derived: "Calculated for the request or relative to current time",
  historical: "Describes a completed past period",
  unknown: "Cadence or semantics not established",
};

export default async function SourcePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const source = sourceBySlug.get(slug);

  if (!source) notFound();

  const fieldCount = source.schemas.reduce((total, schema) => total + schema.fields.length, 0);
  const connectedIdeas = ideasForSource(source.slug);

  return (
    <main>
      <SiteHeader />
      <article className="source-profile">
        <header className="profile-hero">
          <div className="shell">
            <Link className="back-link" href="/">
              ← All sources
            </Link>
            <div className="profile-labels">
              <span className={`status status-${source.freshness.toLowerCase().replaceAll(" ", "-")}`}>
                {source.freshness}
              </span>
              <span className="evidence">{source.evidence}</span>
              <span className="source-kind">{source.sourceKind}</span>
            </div>
            <p className="eyebrow">
              {source.category} / {source.subcategory}
            </p>
            <h1>{source.name}</h1>
            <p className="profile-summary">{source.executiveSummary}</p>
          </div>
        </header>

        <div className="shell profile-layout">
          <aside className="profile-aside">
            <div className="aside-block">
              <p className="aside-title">At a glance</p>
              <dl className="profile-facts">
                <div>
                  <dt>Provider</dt>
                  <dd>{source.provider}</dd>
                </div>
                <div>
                  <dt>Coverage</dt>
                  <dd>{source.geography}</dd>
                </div>
                <div>
                  <dt>Update pattern</dt>
                  <dd>{source.updateCadence}</dd>
                </div>
                <div>
                  <dt>Validated</dt>
                  <dd>{source.testedAt}</dd>
                </div>
                <div>
                  <dt>Schema coverage</dt>
                  <dd>
                    {source.schemas.length} entities · {fieldCount} fields
                  </dd>
                </div>
                {source.recordCount ? (
                  <div>
                    <dt>Observed volume</dt>
                    <dd>{source.recordCount}</dd>
                  </div>
                ) : null}
              </dl>
            </div>
            <div className="aside-block">
              <p className="aside-title">Returned entities</p>
              <ul className="entity-list">
                {source.keyEntities.map((entity) => (
                  <li key={entity}>{entity}</li>
                ))}
              </ul>
            </div>
          </aside>

          <div className="profile-content">
            <section className="content-section" id="access">
              <div className="content-heading">
                <span>01</span>
                <div>
                  <p className="eyebrow">Provenance and access</p>
                  <h2>How the data is reached</h2>
                </div>
              </div>
              <p className="lead-copy">{source.accessSummary}</p>
              <div className="license-note">
                <strong>Reuse status</strong>
                <p>{source.license}</p>
                {source.licenseUrl ? (
                  <a href={source.licenseUrl} target="_blank" rel="noreferrer">
                    Read license or terms ↗
                  </a>
                ) : null}
              </div>
              <div className="access-list">
                {source.accessPoints.map((point) => (
                  <article key={`${point.label}-${point.url}`}>
                    <div>
                      <h3>{point.label}</h3>
                      <a href={point.url} target="_blank" rel="noreferrer">
                        {point.url} ↗
                      </a>
                    </div>
                    <dl>
                      <div>
                        <dt>Method</dt>
                        <dd>{point.method ?? "Not established"}</dd>
                      </div>
                      <div>
                        <dt>Format</dt>
                        <dd>{point.format}</dd>
                      </div>
                      <div>
                        <dt>Authentication</dt>
                        <dd>{point.authentication}</dd>
                      </div>
                    </dl>
                    {point.notes ? <p>{point.notes}</p> : null}
                  </article>
                ))}
              </div>
            </section>

            <section className="content-section" id="schema">
              <div className="content-heading">
                <span>02</span>
                <div>
                  <p className="eyebrow">Field-level detail</p>
                  <h2>What is actually returned</h2>
                </div>
              </div>
              <div className="freshness-key" aria-label="Field freshness legend">
                {Object.entries(freshnessDefinition).map(([key, definition]) => (
                  <span key={key} title={definition}>
                    <i className={`field-freshness field-${key}`} aria-hidden="true" />
                    {key}
                  </span>
                ))}
              </div>

              <div className="schema-stack">
                {source.schemas.map((schema) => (
                  <section className="schema-card" key={schema.name}>
                    <div className="schema-heading">
                      <div>
                        <h3>{schema.name}</h3>
                        <p>{schema.description}</p>
                      </div>
                      <span>{schema.fields.length} fields</span>
                    </div>
                    <div className="table-scroll">
                      <table>
                        <thead>
                          <tr>
                            <th>Field / path</th>
                            <th>Type</th>
                            <th>Null?</th>
                            <th>Example</th>
                            <th>Meaning</th>
                            <th>Freshness</th>
                          </tr>
                        </thead>
                        <tbody>
                          {schema.fields.map((item) => (
                            <tr key={`${schema.name}-${item.field}`}>
                              <td>
                                <code>{item.field}</code>
                              </td>
                              <td>{item.type}</td>
                              <td>{item.nullable}</td>
                              <td className="example-cell">{item.example}</td>
                              <td>
                                {item.meaning}
                                {item.notes ? <small>{item.notes}</small> : null}
                              </td>
                              <td>
                                <span className="freshness-label">
                                  <i
                                    className={`field-freshness field-${item.freshness}`}
                                    aria-hidden="true"
                                  />
                                  {item.freshness}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </section>
                ))}
              </div>
            </section>

            <section className="content-section" id="samples">
              <div className="content-heading">
                <span>03</span>
                <div>
                  <p className="eyebrow">Representative evidence</p>
                  <h2>Sample records</h2>
                </div>
              </div>
              <div className="sample-stack">
                {source.samples.map((sample) => (
                  <article className="sample-card" key={sample.label}>
                    <header>
                      <div>
                        <h3>{sample.label}</h3>
                        {sample.retrievedAt ? <p>Retrieved {sample.retrievedAt}</p> : null}
                      </div>
                      <span>{sample.format}</span>
                    </header>
                    <pre>
                      <code>{sample.value}</code>
                    </pre>
                    {sample.note ? <p className="sample-note">{sample.note}</p> : null}
                  </article>
                ))}
              </div>
            </section>

            <section className="content-section" id="limits">
              <div className="content-heading">
                <span>04</span>
                <div>
                  <p className="eyebrow">Boundaries</p>
                  <h2>Reliability, caveats, and privacy</h2>
                </div>
              </div>
              <div className="boundary-grid">
                <article>
                  <h3>What held up</h3>
                  <ul>
                    {source.reliability.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>
                <article>
                  <h3>What can go wrong</h3>
                  <ul>
                    {source.caveats.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>
                {source.privacy?.length ? (
                  <article>
                    <h3>Privacy boundary</h3>
                    <ul>
                      {source.privacy.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </article>
                ) : null}
              </div>
            </section>

            {connectedIdeas.length ? (
              <section className="content-section source-ideas" id="ideas">
                <div className="content-heading">
                  <span>05</span>
                  <div>
                    <p className="eyebrow">Cross-source possibilities</p>
                    <h2>Ideas using this source</h2>
                  </div>
                </div>
                <div className="source-idea-grid">
                  {connectedIdeas.map((idea) => {
                    const otherSourceCount = idea.sourceSlugs.length - 1;
                    return (
                      <Link href={`/ideas/${idea.slug}`} key={idea.slug}>
                        <span>{idea.lens}</span>
                        <h3>{idea.title}</h3>
                        <p>{idea.question}</p>
                        <small>
                          Joined with {otherSourceCount} other {otherSourceCount === 1 ? "source" : "sources"} →
                        </small>
                      </Link>
                    );
                  })}
                </div>
              </section>
            ) : null}

            <section className="content-section source-links" id="sources">
              <div className="content-heading">
                <span>{connectedIdeas.length ? "06" : "05"}</span>
                <div>
                  <p className="eyebrow">Source trail</p>
                  <h2>Primary pages and documentation</h2>
                </div>
              </div>
              <ol>
                {source.citations.map((citation) => (
                  <li key={`${citation.label}-${citation.url}`}>
                    <div>
                      <span>{citation.type ?? "Source"}</span>
                      <a href={citation.url} target="_blank" rel="noreferrer">
                        {citation.label} ↗
                      </a>
                    </div>
                    <code>{citation.url}</code>
                  </li>
                ))}
              </ol>
            </section>
          </div>
        </div>
      </article>
      <footer className="site-footer shell">
        <p>Research snapshot validated {source.testedAt}.</p>
        <Link href="/">Return to all sources</Link>
      </footer>
    </main>
  );
}
