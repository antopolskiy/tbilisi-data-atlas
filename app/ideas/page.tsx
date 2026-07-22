import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "../components/site-header";
import { ideaLenses, ideas } from "../data/ideas";
import { sourceBySlug } from "../data/sources";

export const metadata: Metadata = {
  title: "Cross-source ideas",
  description:
    "Unexpected, people-centered ideas made by pairing public data sources from the Tbilisi Data Atlas.",
};

const lensId = (lens: string) => lens.toLowerCase().replaceAll(" ", "-").replaceAll("&", "and");

export default function IdeasPage() {
  const uniqueSources = new Set(ideas.flatMap((idea) => idea.sourceSlugs));

  return (
    <main>
      <SiteHeader />
      <section className="idea-hero shell">
        <div>
          <p className="eyebrow">Cross-source concept studio</p>
          <h1>
            What becomes possible
            <span>when the sources meet?</span>
          </h1>
          <p>
            These are not product claims. They are bounded experiments that connect two kinds of
            public truth—two clocks, official status and observed evidence, or nominal availability
            and practical reachability.
          </p>
        </div>
        <aside className="idea-principle">
          <p>Selection rule</p>
          <strong>One person. One decision. One visible reveal.</strong>
          <span>
            Every concept links back to the exact source profiles and keeps the most important data
            limitation in the main interaction.
          </span>
        </aside>
      </section>

      <section className="idea-metrics shell" aria-label="Idea studio summary">
        <div>
          <strong>{ideas.length}</strong>
          <span>cross-source ideas</span>
        </div>
        <div>
          <strong>{uniqueSources.size}</strong>
          <span>sources connected</span>
        </div>
        <div>
          <strong>{ideas.filter((idea) => idea.tempo === "Live").length}</strong>
          <span>live decision loops</span>
        </div>
      </section>

      <nav className="idea-jump shell" aria-label="Idea lenses">
        <span>Explore by lens</span>
        {ideaLenses.map((lens) => (
          <a href={`#${lensId(lens)}`} key={lens}>
            {lens}
          </a>
        ))}
      </nav>

      <section className="featured-ideas shell" aria-labelledby="featured-ideas-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Start here</p>
            <h2 id="featured-ideas-title">Three different ways to win</h2>
          </div>
          <p>Distinctive · live · dependable</p>
        </div>
        <div className="featured-idea-grid">
          {ideas
            .filter((idea) => idea.featured)
            .map((idea, index) => (
              <article className="featured-idea" key={idea.slug}>
                <header>
                  <span>0{index + 1}</span>
                  <div>
                    <p>{idea.lens}</p>
                    <i className={`tempo tempo-${idea.tempo.toLowerCase().replaceAll(" ", "-")}`}>
                      {idea.tempo}
                    </i>
                  </div>
                </header>
                <h3>{idea.title}</h3>
                <blockquote>{idea.question}</blockquote>
                <p>{idea.summary}</p>
                <div className="idea-source-chain" aria-label="Connected sources">
                  {idea.sourceSlugs.map((slug, sourceIndex) => {
                    const source = sourceBySlug.get(slug);
                    return source ? (
                      <span key={slug}>
                        {sourceIndex > 0 ? <b aria-hidden="true">+</b> : null}
                        <Link href={`/sources/${slug}`}>{source.shortName ?? source.name}</Link>
                      </span>
                    ) : null;
                  })}
                </div>
                <Link className="idea-open" href={`/ideas/${idea.slug}`}>
                  Open concept and evidence →
                </Link>
              </article>
            ))}
        </div>
      </section>

      <div className="idea-lenses shell">
        {ideaLenses.map((lens) => {
          const lensIdeas = ideas.filter((idea) => idea.lens === lens);
          return (
            <section className="idea-lens" id={lensId(lens)} key={lens}>
              <header className="idea-lens-heading">
                <div>
                  <p className="eyebrow">Concept lens</p>
                  <h2>{lens}</h2>
                </div>
                <span>{lensIdeas.length.toString().padStart(2, "0")} ideas</span>
              </header>
              <div className="idea-card-grid">
                {lensIdeas.map((idea) => (
                  <article className="idea-card" key={idea.slug}>
                    <div className="idea-card-topline">
                      <span className={`tempo tempo-${idea.tempo.toLowerCase().replaceAll(" ", "-")}`}>
                        {idea.tempo}
                      </span>
                      <span>{idea.sourceSlugs.length} sources</span>
                    </div>
                    <div>
                      <h3>{idea.title}</h3>
                      <p className="idea-question">{idea.question}</p>
                      <p className="idea-summary">{idea.summary}</p>
                    </div>
                    <div className="idea-source-links" aria-label="Data sources used">
                      {idea.sourceSlugs.map((slug) => {
                        const source = sourceBySlug.get(slug);
                        return source ? (
                          <Link href={`/sources/${slug}`} key={slug}>
                            {source.shortName ?? source.name}
                          </Link>
                        ) : null;
                      })}
                    </div>
                    <Link className="idea-open" href={`/ideas/${idea.slug}`}>
                      See the connection →
                    </Link>
                  </article>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      <section className="join-warning shell">
        <p className="eyebrow">A useful constraint</p>
        <h2>Some joins should remain impossible.</h2>
        <p>
          A pharmacy register does not show medicine stock. Parking capacity does not show open
          spaces. A map edit does not prove construction or damage. The studio treats those gaps as
          product facts—not footnotes to work around.
        </p>
        <Link href="/methodology">Read the evidence methodology →</Link>
      </section>

      <footer className="site-footer shell">
        <p>Tbilisi Data Atlas · ideas are bounded hypotheses, not operational advice.</p>
        <Link href="/">Explore all data sources</Link>
      </footer>
    </main>
  );
}
