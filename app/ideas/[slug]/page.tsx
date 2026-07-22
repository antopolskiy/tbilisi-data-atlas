import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "../../components/site-header";
import { ideaBySlug, ideas, relatedIdeas } from "../../data/ideas";
import { sourceBySlug } from "../../data/sources";

export function generateStaticParams() {
  return ideas.map((idea) => ({ slug: idea.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const idea = ideaBySlug.get(slug);

  if (!idea) return {};

  return {
    title: idea.title,
    description: idea.summary,
  };
}

export default async function IdeaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const idea = ideaBySlug.get(slug);

  if (!idea) notFound();

  const connectedSources = idea.sourceSlugs
    .map((sourceSlug) => sourceBySlug.get(sourceSlug))
    .filter((source) => source !== undefined);
  const related = relatedIdeas(idea);

  return (
    <main>
      <SiteHeader />
      <article className="idea-profile">
        <header className="idea-profile-hero">
          <div className="shell">
            <Link className="back-link" href="/ideas">
              ← All ideas
            </Link>
            <div className="profile-labels">
              <span className={`tempo tempo-${idea.tempo.toLowerCase().replaceAll(" ", "-")}`}>
                {idea.tempo}
              </span>
              <span className="source-kind">{idea.lens}</span>
              <span className="evidence">{connectedSources.length} connected sources</span>
            </div>
            <p className="eyebrow">Cross-source hypothesis</p>
            <h1>{idea.title}</h1>
            <blockquote>{idea.question}</blockquote>
            <p>{idea.summary}</p>
          </div>
        </header>

        <div className="shell idea-profile-layout">
          <aside className="idea-profile-aside">
            <p className="aside-title">The join</p>
            <ol>
              {connectedSources.map((source, index) => (
                <li key={source.slug}>
                  <span>{(index + 1).toString().padStart(2, "0")}</span>
                  <Link href={`/sources/${source.slug}`}>{source.shortName ?? source.name}</Link>
                  <small>{source.freshness}</small>
                </li>
              ))}
            </ol>
          </aside>

          <div className="idea-profile-content">
            <section>
              <div className="content-heading">
                <span>01</span>
                <div>
                  <p className="eyebrow">Why this pairing matters</p>
                  <h2>The non-obvious connection</h2>
                </div>
              </div>
              <p className="idea-lead">{idea.connection}</p>
            </section>

            <section>
              <div className="content-heading">
                <span>02</span>
                <div>
                  <p className="eyebrow">The demonstration</p>
                  <h2>One visible reveal</h2>
                </div>
              </div>
              <blockquote className="demo-reveal">{idea.reveal}</blockquote>
            </section>

            <section>
              <div className="content-heading">
                <span>03</span>
                <div>
                  <p className="eyebrow">Three-hour boundary</p>
                  <h2>The smallest credible version</h2>
                </div>
              </div>
              <p className="idea-lead">{idea.mvp}</p>
            </section>

            <section>
              <div className="content-heading">
                <span>04</span>
                <div>
                  <p className="eyebrow">Claim boundary</p>
                  <h2>What the data cannot establish</h2>
                </div>
              </div>
              <div className="idea-boundary">
                <span aria-hidden="true">!</span>
                <p>{idea.boundary}</p>
              </div>
            </section>

            <section>
              <div className="content-heading">
                <span>05</span>
                <div>
                  <p className="eyebrow">Underlying evidence</p>
                  <h2>Open every connected source</h2>
                </div>
              </div>
              <div className="connected-source-grid">
                {connectedSources.map((source) => (
                  <article key={source.slug}>
                    <div>
                      <span
                        className={`status status-${source.freshness
                          .toLowerCase()
                          .replaceAll(" ", "-")}`}
                      >
                        {source.freshness}
                      </span>
                      <span className="evidence">{source.evidence}</span>
                    </div>
                    <p>{source.category}</p>
                    <h3>{source.shortName ?? source.name}</h3>
                    <small>{source.provider}</small>
                    <Link href={`/sources/${source.slug}`}>Inspect fields and samples →</Link>
                  </article>
                ))}
              </div>
            </section>

            {related.length ? (
              <section>
                <div className="content-heading">
                  <span>06</span>
                  <div>
                    <p className="eyebrow">Shared ingredients</p>
                    <h2>Related combinations</h2>
                  </div>
                </div>
                <div className="related-idea-list">
                  {related.map((candidate) => (
                    <Link href={`/ideas/${candidate.slug}`} key={candidate.slug}>
                      <span>{candidate.lens}</span>
                      <strong>{candidate.title}</strong>
                      <p>{candidate.question}</p>
                    </Link>
                  ))}
                </div>
              </section>
            ) : null}
          </div>
        </div>
      </article>

      <footer className="site-footer shell">
        <p>Concepts remain hypotheses until their joined records are validated.</p>
        <Link href="/ideas">Return to all ideas</Link>
      </footer>
    </main>
  );
}
