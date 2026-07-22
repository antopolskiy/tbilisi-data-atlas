import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import test from "node:test";

async function render(path = "/") {
  const route = path === "/" || path.endsWith("/") ? path : `${path}/`;
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${route}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${route}`, { headers: { accept: "text/html" } }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the catalog homepage and report metadata", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Tbilisi Data Atlas<\/title>/i);
  assert.match(html, /What data does/);
  assert.match(html, /50<\/strong><span>sources cataloged/);
  assert.match(html, /1219<\/strong><span>fields documented/);
  assert.match(html, /\/og-ideas\.png/);
});

test("renders comparison, unavailable, and detailed source routes", async () => {
  const [matrix, unavailable, transit] = await Promise.all([
    render("/matrix"),
    render("/availability"),
    render("/sources/ttc-passenger-information"),
  ]);

  assert.equal(matrix.status, 200);
  assert.match(await matrix.text(), /The whole catalog, one row per source/);

  assert.equal(unavailable.status, 200);
  assert.match(await unavailable.text(), /What we looked for/);

  assert.equal(transit.status, 200);
  const transitHtml = await transit.text();
  assert.match(transitHtml, /Vehicle position/);
  assert.match(transitHtml, /realtimeArrivalMinutes/);
  assert.match(transitHtml, /Sample records/);
  assert.match(transitHtml, /Ideas using this source/);
  assert.match(transitHtml, /Home Before the Lights/);
});

test("renders the cross-source idea studio with bidirectional evidence links", async () => {
  const [studio, idea] = await Promise.all([
    render("/ideas"),
    render("/ideas/home-before-the-lights"),
  ]);

  assert.equal(studio.status, 200);
  const studioHtml = await studio.text();
  assert.match(studioHtml, /What becomes possible/);
  assert.match(studioHtml, /24<\/strong><span>cross-source ideas/);
  assert.match(studioHtml, /href="\/sources\/telasi-power-outages"/);
  assert.match(studioHtml, /href="\/ideas\/home-before-the-lights"/);

  assert.equal(idea.status, 200);
  const ideaHtml = await idea.text();
  assert.match(ideaHtml, /Will electricity probably return before I arrive home/);
  assert.match(ideaHtml, /Open every connected source/);
  assert.match(ideaHtml, /href="\/sources\/ttc-passenger-information"/);
});

test("all generated source records have unique slugs and field-level schemas", async () => {
  const generatedRoot = new URL("../app/data/generated/", import.meta.url);
  const files = (await readdir(generatedRoot)).filter((file) => file.endsWith(".json"));
  const batches = await Promise.all(
    files.map(async (file) => JSON.parse(await readFile(new URL(file, generatedRoot), "utf8"))),
  );
  const sources = batches.flat();
  const slugs = sources.map((source) => source.slug);

  assert.equal(slugs.length, new Set(slugs).size);
  assert.ok(sources.length >= 47);

  for (const source of sources) {
    assert.ok(source.executiveSummary?.length > 20, `${source.slug}: executive summary`);
    assert.ok(source.accessPoints?.length > 0, `${source.slug}: access points`);
    assert.ok(source.schemas?.length > 0, `${source.slug}: schemas`);
    const fields = source.schemas.flatMap((schema) => schema.fields);
    assert.ok(fields.length > 0, `${source.slug}: fields`);
    for (const field of fields) {
      assert.ok(field.field, `${source.slug}: field name`);
      assert.ok(field.type, `${source.slug}/${field.field}: type`);
      assert.ok(field.example !== undefined, `${source.slug}/${field.field}: example`);
      assert.ok(field.meaning, `${source.slug}/${field.field}: meaning`);
      assert.ok(
        ["live", "reference", "derived", "historical", "unknown"].includes(field.freshness),
        `${source.slug}/${field.field}: freshness`,
      );
    }
  }
});
