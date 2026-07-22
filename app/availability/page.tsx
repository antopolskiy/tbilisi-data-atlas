import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "../components/site-header";
import { investigatedAvenues } from "../data/avenues";

export const metadata: Metadata = {
  title: "Unavailable avenues",
  description: "Public-data avenues that were investigated but were unavailable, unresolved, private, or restricted.",
};

export default function AvailabilityPage() {
  return (
    <main>
      <SiteHeader />
      <header className="method-hero shell matrix-hero">
        <Link className="back-link" href="/">
          ← All sources
        </Link>
        <p className="eyebrow">Negative results</p>
        <h1>What we looked for—and could not responsibly claim.</h1>
        <p>
          These avenues were checked because they would be socially or operationally relevant.
          They are separated from the source catalog when access failed, the data was private, the
          interface could not be resolved, or reuse was explicitly restricted.
        </p>
      </header>

      <section className="shell unavailable-section" aria-labelledby="unavailable-heading">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Research boundary</p>
            <h2 id="unavailable-heading">{investigatedAvenues.length} investigated avenues</h2>
          </div>
        </div>
        <div className="unavailable-grid">
          {investigatedAvenues.map((avenue) => (
            <article key={`${avenue.category}-${avenue.name}`}>
              <header>
                <div>
                  <p>{avenue.category}</p>
                  <h3>{avenue.name}</h3>
                </div>
                <span>{avenue.status}</span>
              </header>
              <p>{avenue.reason}</p>
              <div className="boundary-note">
                <strong>Catalog boundary</strong>
                <p>{avenue.boundary}</p>
              </div>
              <footer>
                <span>Checked {avenue.testedAt}</span>
                {avenue.checkedUrls.length ? (
                  <details>
                    <summary>Checked routes</summary>
                    <ul>
                      {avenue.checkedUrls.map((url) => (
                        <li key={url}>
                          <a href={url} target="_blank" rel="noreferrer">
                            {url} ↗
                          </a>
                        </li>
                      ))}
                    </ul>
                  </details>
                ) : null}
              </footer>
            </article>
          ))}
        </div>
      </section>

      <footer className="site-footer shell">
        <p>An unavailable source is a research result, not a hidden data claim.</p>
        <Link href="/">Browse validated sources</Link>
      </footer>
    </main>
  );
}
