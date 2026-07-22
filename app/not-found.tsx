import Link from "next/link";
import { SiteHeader } from "./components/site-header";

export default function NotFound() {
  return (
    <main>
      <SiteHeader />
      <section className="not-found shell">
        <p className="eyebrow">404 · No source profile</p>
        <h1>That data source is not in the atlas.</h1>
        <p>Return to the inventory to browse validated and documented sources.</p>
        <Link href="/">Browse all sources →</Link>
      </section>
    </main>
  );
}
