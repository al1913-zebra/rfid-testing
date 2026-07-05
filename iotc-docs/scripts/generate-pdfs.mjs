// Generate a print-optimized PDF for every command/event API-reference page,
// plus one consolidated "full API reference" PDF, into build/pdf/.
//
// Runs in CI AFTER `npm run build` and BEFORE the gh-pages deploy (see
// .github/workflows/deploy.yml). The PDFs are build artifacts shipped in the
// gh-pages output — they are NOT committed to the source repo (build/ is
// .gitignored, and gh-pages is force_orphan'd each deploy).
//
// Fidelity: each page is rendered fresh with Chromium (print media), so the
// @media print rules in src/css/print.scss reveal BOTH ApiBody tabs and every
// SchemaTable/JsonBlock is already fully expanded — nothing is dropped.

import { chromium } from 'playwright';
import { PDFDocument } from 'pdf-lib';
import { spawn } from 'node:child_process';
import { readdirSync, existsSync, mkdirSync, writeFileSync, readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';

const BASE_URL = '/zebra-handheld-rfid-iotc/';
const PORT = 4173;
const ORIGIN = `http://127.0.0.1:${PORT}`;
const BUILD_DIR = 'build';
// Command/event groups only — NOT the conceptual reference pages
// (faq/appendices/errors/mdm/glossary/api-overview, which are .md).
const GROUPS = ['mgmt', 'ctrl', 'events', 'data'];
const VERSION = JSON.parse(readFileSync('package.json', 'utf8')).version;
const TODAY = new Date().toISOString().slice(0, 10);

const log = (...a) => console.log('[generate-pdfs]', ...a);

// The command/event pages are exactly the .mdx files under docs/reference/<group>/.
// (Conceptual reference pages are authored as .md, so this cleanly excludes them.)
function findRoutes() {
  const routes = [];
  for (const g of GROUPS) {
    const dir = join('docs', 'reference', g);
    if (!existsSync(dir)) continue;
    for (const f of readdirSync(dir).sort()) {
      if (f.endsWith('.mdx')) routes.push(`/reference/${g}/${f.replace(/\.mdx$/, '')}/`);
    }
  }
  return routes;
}

function waitForServer(url, timeoutMs = 90000) {
  const start = Date.now();
  return new Promise((resolve, reject) => {
    const tick = async () => {
      try {
        const r = await fetch(url);
        if (r.status >= 200 && r.status < 400) return resolve();
      } catch {
        /* not up yet */
      }
      if (Date.now() - start > timeoutMs) return reject(new Error(`server did not start: ${url}`));
      setTimeout(tick, 500);
    };
    tick();
  });
}

async function renderPage(page, url, outPath, retries = 3) {
  let lastErr;
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
      // Emulate print media FIRST. Example is the default (visible) ApiBody tab, so
      // the Schema panel is display:none under screen media; print.scss reveals BOTH
      // panels ([role='tabpanel']{display:block}). Only then is the SchemaTable
      // actually visible — waiting on it before emulateMedia would time out.
      await page.emulateMedia({ media: 'print' });
      // Every command/event page renders at least one SchemaTable via <ApiBody>.
      await page.waitForSelector('.schema-table', { timeout: 20000 });
      await page.waitForTimeout(300); // let the print layout settle
      const buf = await page.pdf({
        format: 'A4',
        printBackground: true,
        margin: { top: '14mm', bottom: '16mm', left: '12mm', right: '12mm' },
        displayHeaderFooter: true,
        headerTemplate: '<div></div>',
        footerTemplate:
          '<div style="font-size:8px;width:100%;text-align:center;color:#888;padding:0 10mm;">' +
          'Zebra Handheld RFID — IoT Connector · MQTT API Reference · ' +
          '<span class="pageNumber"></span> / <span class="totalPages"></span></div>',
      });
      mkdirSync(dirname(outPath), { recursive: true });
      writeFileSync(outPath, buf);
      return buf;
    } catch (e) {
      lastErr = e;
      log(`  attempt ${attempt}/${retries} failed for ${url}: ${e.message}`);
      await new Promise((r) => setTimeout(r, 1500));
    }
  }
  throw lastErr;
}

async function main() {
  const routes = findRoutes();
  log(`found ${routes.length} command/event routes`);
  if (routes.length === 0) throw new Error('no API-reference (.mdx) routes found under docs/reference/{mgmt,ctrl,events,data}');

  // Each route must have been built (guards against id/slug drift).
  for (const r of routes) {
    const idx = join(BUILD_DIR, r.replace(/^\//, ''), 'index.html');
    if (!existsSync(idx)) throw new Error(`built page missing for route ${r} (expected ${idx})`);
  }

  const server = spawn(
    'npx',
    ['docusaurus', 'serve', '--port', String(PORT), '--host', '127.0.0.1', '--no-open'],
    { stdio: 'inherit', shell: process.platform === 'win32' },
  );

  try {
    await waitForServer(ORIGIN + BASE_URL);
    log('preview server up');

    const browser = await chromium.launch();
    const page = await browser.newPage();

    const perPage = [];
    for (const r of routes) {
      const url = ORIGIN + BASE_URL.replace(/\/$/, '') + r;
      const outPath = join(BUILD_DIR, 'pdf', `${r.replace(/^\//, '').replace(/\/$/, '')}.pdf`);
      log(`rendering ${r}`);
      perPage.push(await renderPage(page, url, outPath));
    }

    // Consolidated: branded cover + all per-page PDFs merged in order.
    const cover = await browser.newPage();
    await cover.setContent(
      `<!doctype html><html><body style="margin:0;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;">
       <div style="height:250mm;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;padding:0 20mm;">
         <div style="font-size:13px;letter-spacing:2px;color:#666;text-transform:uppercase;">Zebra Handheld RFID</div>
         <h1 style="font-size:30px;color:#004C97;margin:12px 0 4px;">IoT Connector</h1>
         <h2 style="font-size:20px;font-weight:400;color:#333;margin:0 0 24px;">MQTT API Reference</h2>
         <div style="font-size:13px;color:#444;">RFD40 / RFD90 Series · API v1.1</div>
         <div style="font-size:12px;color:#888;margin-top:6px;">Document version ${VERSION} · Generated ${TODAY}</div>
         <div style="font-size:11px;color:#aaa;margin-top:24px;">https://al1913-zebra.github.io/zebra-handheld-rfid-iotc/reference/api-overview/</div>
       </div>
     </body></html>`,
    );
    await cover.emulateMedia({ media: 'print' });
    const coverBuf = await cover.pdf({
      format: 'A4',
      printBackground: true,
      margin: { top: '0', bottom: '0', left: '0', right: '0' },
    });

    const merged = await PDFDocument.create();
    for (const buf of [coverBuf, ...perPage]) {
      const doc = await PDFDocument.load(buf);
      const copied = await merged.copyPages(doc, doc.getPageIndices());
      copied.forEach((p) => merged.addPage(p));
    }
    const fullPath = join(BUILD_DIR, 'pdf', 'reference', 'api-reference-full.pdf');
    mkdirSync(dirname(fullPath), { recursive: true });
    writeFileSync(fullPath, await merged.save());

    await browser.close();

    if (perPage.length !== routes.length) {
      throw new Error(`generated ${perPage.length} PDFs but expected ${routes.length}`);
    }
    log(`done: ${perPage.length} per-page PDFs + 1 consolidated -> ${fullPath}`);
  } finally {
    server.kill();
  }
}

main().catch((e) => {
  console.error('[generate-pdfs] FAILED:', e);
  process.exit(1);
});
