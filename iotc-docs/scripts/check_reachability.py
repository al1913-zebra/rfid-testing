#!/usr/bin/env python3
"""
check_reachability.py — reachability & link-graph audit for the IOTC docs.

Run from the repo root:

    python3 scripts/check_reachability.py

What it checks (mirrors brain/ORPHAN-PAGES-AUDIT.md and brain/URL-NAMING.md):

  1. Broken internal links — every `](/path)` in docs/ must resolve to a real
     doc route, a sidebar generated-index slug, or a static asset.
  2. Broken anchors — every `](/path#anchor)` must point at a heading that
     exists on the target page (explicit `{#id}` or the slugified heading).
  3. Orphan pages — every doc must be reachable: surfaced directly in
     sidebars.ts, or reachable from a surfaced page by following in-page links.

Exit code is non-zero if any broken link or broken anchor is found (orphans
are reported as warnings, not failures — some deep-reference pages are
intentionally reached only via in-page cross-links).

Standard library only; no third-party dependencies, no build required.
"""

from __future__ import annotations

import re
import sys
from collections import deque
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DOCS = ROOT / "docs"
STATIC = ROOT / "static"
SIDEBARS = ROOT / "sidebars.ts"

LINK_RE = re.compile(r"\]\((/[A-Za-z0-9/_#.\-]+)\)")
HEADING_RE = re.compile(r"^#{1,6}\s+(.*)$")
EXPLICIT_ANCHOR_RE = re.compile(r"\{#([A-Za-z0-9_-]+)\}")
SIDEBAR_ID_RE = re.compile(r"'([a-z0-9][A-Za-z0-9/_-]+)'")
SIDEBAR_SLUG_RE = re.compile(r"slug:\s*'(/[A-Za-z0-9/_-]+)'")


def slugify(text: str) -> str:
    """Approximate Docusaurus' default heading-id slugification."""
    text = EXPLICIT_ANCHOR_RE.sub("", text)
    text = re.sub(r"`([^`]*)`", r"\1", text)            # strip inline code
    text = re.sub(r"\[([^\]]*)\]\([^)]*\)", r"\1", text)  # link text only
    text = text.strip().lower()
    text = re.sub(r"[^\w\- ]+", "", text)               # drop punctuation
    text = re.sub(r"[ _]+", "-", text)
    return text.strip("-")


def doc_ids() -> set[str]:
    return {
        p.relative_to(DOCS).with_suffix("").as_posix()
        for p in DOCS.rglob("*.md")
    }


def static_routes() -> set[str]:
    if not STATIC.exists():
        return set()
    return {"/" + p.relative_to(STATIC).as_posix() for p in STATIC.rglob("*") if p.is_file()}


def parse_sidebars() -> tuple[set[str], set[str]]:
    text = SIDEBARS.read_text(encoding="utf-8")
    slugs = {m for m in SIDEBAR_SLUG_RE.findall(text)}
    # candidate doc-id strings are quoted, contain a slash, and don't start with '/'
    surfaced = {s for s in SIDEBAR_ID_RE.findall(text) if "/" in s and not s.startswith("/")}
    return surfaced, slugs


def page_anchors(text: str) -> set[str]:
    anchors: set[str] = set()
    in_fence = False
    for line in text.splitlines():
        if line.lstrip().startswith("```"):
            in_fence = not in_fence
            continue
        if in_fence:
            continue
        m = HEADING_RE.match(line)
        if not m:
            continue
        heading = m.group(1)
        for explicit in EXPLICIT_ANCHOR_RE.findall(heading):
            anchors.add(explicit)
        anchors.add(slugify(heading))
    return anchors


def page_links(text: str) -> list[str]:
    out: list[str] = []
    in_fence = False
    for line in text.splitlines():
        if line.lstrip().startswith("```"):
            in_fence = not in_fence
            continue
        if in_fence:
            continue
        out.extend(LINK_RE.findall(line))
    return out


def main() -> int:
    ids = doc_ids()
    surfaced, slugs = parse_sidebars()
    statics = static_routes()
    valid_routes = {"/" + i for i in ids} | slugs | statics

    texts = {i: (DOCS / (i + ".md")).read_text(encoding="utf-8") for i in ids}
    anchors = {i: page_anchors(t) for i, t in texts.items()}

    broken_links: list[str] = []
    broken_anchors: list[str] = []
    graph: dict[str, set[str]] = {i: set() for i in ids}

    for doc, text in texts.items():
        for raw in page_links(text):
            path, _, anchor = raw.partition("#")
            if path not in valid_routes:
                broken_links.append(f"{doc}.md -> {raw}  (path not found)")
                continue
            target_id = path.lstrip("/")
            if target_id in ids:
                graph[doc].add(target_id)
                if anchor and anchor not in anchors.get(target_id, set()):
                    broken_anchors.append(f"{doc}.md -> {raw}  (anchor not on target)")

    # Reachability: BFS from every surfaced page.
    reachable: set[str] = set()
    queue = deque(i for i in surfaced if i in ids)
    reachable.update(queue)
    while queue:
        cur = queue.popleft()
        for nxt in graph.get(cur, ()):  # noqa: B007
            if nxt not in reachable:
                reachable.add(nxt)
                queue.append(nxt)
    orphans = sorted(ids - reachable)

    print(f"docs: {len(ids)}  |  surfaced in sidebar: {len(surfaced & ids)}  "
          f"|  routes: {len(valid_routes)}")
    print(f"broken links: {len(broken_links)}  |  broken anchors: {len(broken_anchors)}  "
          f"|  orphans: {len(orphans)}\n")

    for label, items in (("BROKEN LINKS", broken_links),
                         ("BROKEN ANCHORS", broken_anchors)):
        if items:
            print(f"== {label} ==")
            for it in items:
                print("  " + it)
            print()

    if orphans:
        print("== ORPHANS (not reachable from any surfaced page; review — some are intentional deep refs) ==")
        for o in orphans:
            print("  " + o)
        print()

    if not broken_links and not broken_anchors and not orphans:
        print("OK — every page is reachable and every internal link/anchor resolves.")

    # Broken links/anchors are hard failures; orphans are warnings.
    return 1 if (broken_links or broken_anchors) else 0


if __name__ == "__main__":
    sys.exit(main())
