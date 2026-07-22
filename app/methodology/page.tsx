import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "../components/site-header";

export const metadata: Metadata = {
  title: "Methodology",
  description: "How sources, freshness, fields, and evidence are evaluated.",
};

const evidence = [
  ["Live-tested", "A read-only request returned usable data during this research session."],
  ["Page-verified", "A public interface visibly exposed the data, but no reusable endpoint was validated."],
  ["Catalog-verified", "A catalog or layer listing was inspected without retrieving representative records."],
  ["Reported", "Primary documentation describes the data, but this research did not retrieve it."],
  ["Unavailable", "The source or endpoint failed current checks."],
];

const freshness = [
  ["live", "Current operations or observations: vehicle position, outage status, sensor measurement."],
  ["reference", "Relatively stable identity or geography: route name, station location, category label."],
  ["derived", "Calculated for a request: minutes to arrival, route plan, current index classification."],
  ["historical", "A completed past period: census result, procurement award, annual statistic."],
  ["unknown", "The source does not establish cadence or the field semantics remain unclear."],
];

export default function MethodologyPage() {
  return (
    <main>
      <SiteHeader />
      <header className="method-hero shell">
        <Link className="back-link" href="/">
          ← All sources
        </Link>
        <p className="eyebrow">Research method</p>
        <h1>Evidence before availability claims.</h1>
        <p>
          A public webpage, an accessible endpoint, and openly reusable data are three different
          things. This catalog records them separately and distinguishes source freshness from the
          freshness of every returned field.
        </p>
      </header>

      <div className="method-grid shell">
        <section>
          <span className="section-number">01</span>
          <h2>Evidence labels</h2>
          <div className="definition-list">
            {evidence.map(([term, definition]) => (
              <div key={term}>
                <strong>{term}</strong>
                <p>{definition}</p>
              </div>
            ))}
          </div>
        </section>
        <section>
          <span className="section-number">02</span>
          <h2>Field freshness</h2>
          <div className="definition-list">
            {freshness.map(([term, definition]) => (
              <div key={term}>
                <strong className="freshness-label">
                  <i className={`field-freshness field-${term}`} aria-hidden="true" />
                  {term}
                </strong>
                <p>{definition}</p>
              </div>
            ))}
          </div>
        </section>
        <section>
          <span className="section-number">03</span>
          <h2>Field dictionaries</h2>
          <p>
            Tables record the exact field or path, observed/documented type, nullability, example,
            human meaning, freshness, units, enums, anomalies, and localization behavior. Nested
            entities receive separate tables instead of being flattened into an unreadable list.
          </p>
        </section>
        <section>
          <span className="section-number">04</span>
          <h2>Licensing boundary</h2>
          <p>
            Technical accessibility is not treated as permission to reuse. When terms are unclear,
            the catalog says so. A community wrapper&apos;s software license never substitutes for the
            underlying provider&apos;s data license.
          </p>
        </section>
        <section>
          <span className="section-number">05</span>
          <h2>Representative samples</h2>
          <p>
            Samples preserve public values, nulls, localized text, and anomalies that teach
            something about the schema. Credentials, cookies, personal information, and tokens are
            excluded.
          </p>
        </section>
        <section>
          <span className="section-number">06</span>
          <h2>Interpretation limits</h2>
          <p>
            Geographic proximity is not population impact. Missing crowdsourced records are not
            absence. One current vehicle snapshot is not long-term transit equity. Each source page
            records the boundary between the data and any inference.
          </p>
        </section>
      </div>

      <footer className="site-footer shell">
        <p>Methodology version 1 · 22 July 2026</p>
        <Link href="/">Browse sources</Link>
      </footer>
    </main>
  );
}
