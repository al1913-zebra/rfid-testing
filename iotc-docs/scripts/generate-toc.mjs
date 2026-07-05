// generate-toc.mjs — compile a single unified Table of Contents for docs/.
//
// Strategy: parse sidebars.ts for the intended order/structure (the 9-Part
// journey), reconcile with the files physically present in docs/, extract each
// file's H1–H3 outline (skipping front matter and fenced code blocks), and emit
// one nested-bullet Markdown TOC. File entries use the page's front-matter
// sidebar_label/title; header bullets link to docs/<id>.md#<anchor> (GitHub-
// slugger anchors, honouring explicit {#id}) so every link resolves.
//
//   node scripts/generate-toc.mjs        → writes DOCUMENTATION_TOC.md at repo root
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const DOCS = 'docs';
const OUT = '_meta/governance/ia-blueprints/DOCUMENTATION_TOC.md';
const GEN_DATE = '2026-06-07';

// ---------- 1. parse sidebars.ts (strip TS, eval to a JS object) ----------
let src = fs.readFileSync('sidebars.ts', 'utf8')
  .replace(/import[^\n]*\n/g, '')
  .replace(/export\s+default\s+sidebars\s*;?/, '')
  .replace(/const\s+sidebars\s*:\s*SidebarsConfig\s*=/, 'globalThis.__sidebars =');
eval(src); // our own file; produces globalThis.__sidebars
const sidebars = globalThis.__sidebars;
if (!sidebars || !sidebars.docs) throw new Error('Could not parse sidebars.ts');

// ---------- 2. helpers ----------
const exists = (id) => fs.existsSync(path.join(DOCS, id + '.md'));
const relPath = (id) => `../../../docs/${id}.md`; // links resolve from _meta/governance/ia-blueprints/

function frontMatterLabel(content, id) {
  const fm = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  const block = fm ? fm[1] : '';
  const get = (k) => {
    const m = block.match(new RegExp('^' + k + ':\\s*(.+)$', 'm'));
    return m ? m[1].trim().replace(/^["']|["']$/g, '') : null;
  };
  return get('sidebar_label') || get('title') || id.split('/').pop();
}

// Diátaxis badge glyph from the page's badge callout (`> 📘 **EXPLANATION** …`).
// Returns the leading emoji of the first blockquote badge line, or '·' if none.
function frontMatterBadge(content) {
  let body = content;
  const fm = body.match(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/);
  if (fm) body = body.slice(fm[0].length);
  const m = body.match(/^>\s*(\p{Extended_Pictographic}(?:️|‍\p{Extended_Pictographic})*)\s*\*\*/mu);
  return m ? m[1] : '·';
}

// fence-aware H1–H3 extraction; honours trailing {#explicit-id}
function extractHeaders(content) {
  let body = content;
  const fm = body.match(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/);
  if (fm) body = body.slice(fm[0].length);
  const out = [];
  let inFence = false;
  let fenceChar = '';
  for (const line of body.split(/\r?\n/)) {
    const fence = line.match(/^\s*(`{3,}|~{3,})/);
    if (fence) {
      const ch = fence[1][0];
      if (!inFence) { inFence = true; fenceChar = ch; }
      else if (ch === fenceChar) { inFence = false; fenceChar = ''; }
      continue;
    }
    if (inFence) continue;
    const h = line.match(/^(#{1,3})\s+(.+?)\s*$/);
    if (!h) continue;
    let text = h[2].trim();
    let explicit = null;
    const idm = text.match(/\s*\{#([\w-]+)\}\s*$/);
    if (idm) { explicit = idm[1]; text = text.slice(0, idm.index).trim(); }
    // Reduce inline markdown to its rendered text so display + slug match how
    // GitHub/Docusaurus anchor the heading (e.g. a heading that wraps an API
    // link must NOT fold the URL into the anchor). Code/emphasis markers are
    // left for the slugger to strip, matching github-slugger behaviour.
    text = text
      .replace(/!\[[^\]]*\]\([^)]*\)/g, '')      // images -> drop
      .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')    // [text](url) -> text
      .replace(/<(https?:\/\/[^>]+)>/g, '$1')     // <autolink> -> url text
      .trim();
    if (!text) continue;
    out.push({ level: h[1].length, text, explicit });
  }
  return out;
}

// github-slugger-compatible anchor generator (per-file, with de-duplication)
function makeSlugger() {
  const occ = Object.create(null);
  return (text, explicit) => {
    if (explicit) return explicit;
    const base = text.toLowerCase().replace(/[^\p{L}\p{N}\p{Pc}\p{Pd}\s]/gu, '').trim().replace(/\s+/g, '-');
    let result = base;
    while (result in occ) { occ[base] = (occ[base] || 0) + 1; result = base + '-' + occ[base]; }
    occ[result] = 0;
    return result;
  };
}

const seen = new Set();          // doc-ids placed into the TOC
const missing = [];              // sidebar entries with no file on disk
let headerCount = 0;
// Diátaxis quadrant tally across every placed file (A-14)
const badgeCounts = { '📘': 0, '📗': 0, '📙': 0, '📕': 0, other: 0 };

const esc = (t) => t.replace(/[\[\]]/g, ''); // keep link text valid

function renderDoc(id, indent, lines) {
  if (!exists(id)) { missing.push(id); lines.push(`${'  '.repeat(indent)}- ⚠️ MISSING FILE: \`${id}\``); return; }
  seen.add(id);
  const content = fs.readFileSync(path.join(DOCS, id + '.md'), 'utf8');
  const label = frontMatterLabel(content, id);
  const badge = frontMatterBadge(content);
  if (badge in badgeCounts) badgeCounts[badge]++; else badgeCounts.other++;
  const rp = relPath(id);
  lines.push(`${'  '.repeat(indent)}- ${badge} [${esc(label)}](${rp})`);
  const headers = extractHeaders(content);
  const slug = makeSlugger();
  const stack = [];
  for (const h of headers) {
    while (stack.length && stack[stack.length - 1] >= h.level) stack.pop();
    const depth = stack.length;
    stack.push(h.level);
    headerCount++;
    lines.push(`${'  '.repeat(indent + 1 + depth)}- [${esc(h.text)}](${rp}#${slug(h.text, h.explicit)})`);
  }
}

function renderNode(node, indent, lines) {
  if (typeof node === 'string') return renderDoc(node, indent, lines);
  if (node && node.type === 'category') {
    lines.push(`${'  '.repeat(indent)}- **${node.label}**`);
    for (const it of node.items || []) renderNode(it, indent + 1, lines);
    return;
  }
  if (node && node.type === 'doc' && node.id) return renderDoc(node.id, indent, lines);
}

// ---------- 3. build the TOC body from the sidebar ----------
const body = [];
for (const part of sidebars.docs) renderNode(part, 0, body);

// ---------- 4. reconcile: any docs on disk NOT in the sidebar ----------
function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? walk(path.join(dir, e.name)) : (e.name.endsWith('.md') ? [path.join(dir, e.name)] : []));
}
const allDocs = walk(DOCS).map((f) => f.slice(DOCS.length + 1).replace(/\\/g, '/').replace(/\.md$/, '')).sort();
const orphans = allDocs.filter((id) => !seen.has(id));
const orphanLines = [];
for (const id of orphans) renderDoc(id, 0, orphanLines);

// ---------- 5. assemble + write ----------
const md = [];
md.push('# Zebra Handheld RFID — IoT Connector · Documentation Table of Contents');
md.push('');
md.push(`> Unified, sidebar-ordered TOC of every page under [\`docs/\`](../../../docs/), with each page's H1–H3 outline.`);
md.push(`> Generated by [\`scripts/generate-toc.mjs\`](../../../scripts/generate-toc.mjs) from [\`sidebars.ts\`](../../../sidebars.ts) on ${GEN_DATE}.`);
md.push(`> File links point to the Markdown source; nested bullets link to the in-file section anchors.`);
md.push('');
md.push(`**Coverage:** ${seen.size} of ${allDocs.length} files placed by the sidebar` + (orphans.length ? `, ${orphans.length} not in the sidebar (listed at the end)` : ' — every file is in the sidebar') + `; ${headerCount} headings indexed.`);
md.push('');
md.push(`**Quadrant balance** — Diátaxis mode of each placed file, read from its badge: 📘 ${badgeCounts['📘']} Explanation · 📗 ${badgeCounts['📗']} Tutorial · 📙 ${badgeCounts['📙']} How-to · 📕 ${badgeCounts['📕']} Reference` + (badgeCounts.other ? ` · ${badgeCounts.other} other` : '') + '.');
md.push('');
md.push('---');
md.push('');
md.push(...body);
if (orphanLines.length) {
  md.push('');
  md.push('---');
  md.push('');
  md.push('## Files not referenced by the sidebar');
  md.push('');
  md.push('_Present in `docs/` but not surfaced in `sidebars.ts` (included here so every physical file is accounted for)._');
  md.push('');
  md.push(...orphanLines);
}
md.push('');
fs.writeFileSync(OUT, md.join('\n'));

// ---------- 6. report ----------
console.log(`Wrote ${OUT}`);
console.log(`  sidebar-placed files: ${seen.size}`);
console.log(`  files on disk:        ${allDocs.length}`);
console.log(`  orphan (not in sidebar): ${orphans.length}${orphans.length ? ' -> ' + orphans.join(', ') : ''}`);
console.log(`  headings indexed:     ${headerCount}`);
console.log(`  quadrant balance:     📘 ${badgeCounts['📘']} · 📗 ${badgeCounts['📗']} · 📙 ${badgeCounts['📙']} · 📕 ${badgeCounts['📕']}${badgeCounts.other ? ' · other ' + badgeCounts.other : ''}`);
console.log(`  MISSING sidebar files (no .md on disk): ${missing.length}${missing.length ? ' -> ' + missing.join(', ') : ''}`);
console.log(`  accounted-for total:  ${seen.size + orphans.length} (must equal files on disk ${allDocs.length}: ${seen.size + orphans.length === allDocs.length ? 'OK' : 'MISMATCH'})`);
