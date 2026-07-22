import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Link className="wordmark" href="/" aria-label="Tbilisi Data Atlas home">
          <span className="wordmark-mark" aria-hidden="true">
            T
          </span>
          <span>
            Tbilisi
            <strong>Data Atlas</strong>
          </span>
        </Link>
        <nav aria-label="Primary navigation">
          <Link href="/">Sources</Link>
          <Link href="/ideas">Ideas</Link>
          <Link href="/matrix">Matrix</Link>
          <Link href="/availability">Unavailable</Link>
          <Link href="/methodology">Methodology</Link>
        </nav>
      </div>
    </header>
  );
}
