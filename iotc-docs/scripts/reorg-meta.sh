#!/usr/bin/env bash
#
# reorg-meta.sh — Consolidate style-guide/, knowledge/, and zhr/brain/
#                 into zhr/_meta/.
#
# Run from the handheld-rfid-iotc parent directory (the one containing zhr/):
#   bash reorg-meta.sh --dry-run     # print every action, change nothing
#   bash reorg-meta.sh               # execute
#
# Notes:
#  * zhr/brain is moved with `git mv` (same repo) -> full history kept.
#  * style-guide/ (no git) and knowledge/ (separate repo) are plain `mv`d in;
#    they become fresh files in zhr's history (your chosen strategy).
#  * The ~80 MB research library is moved in but added to .gitignore.
#  * sed uses GNU syntax (git-bash/Linux). On macOS, use `sed -i ''`.
#
set -euo pipefail

DRY=0
[[ "${1:-}" == "--dry-run" ]] && DRY=1

run() {                      # print, then run unless --dry-run
  printf '  + %s\n' "$*"
  [[ $DRY -eq 0 ]] && "$@"
  return 0
}
edit() {                     # in-place sed, dry-run aware
  printf '  ~ sed %s on: %s\n' "$1" "${*:2}"
  [[ $DRY -eq 0 ]] && sed -i "$1" "${@:2}"
  return 0
}

# ---- 0. Preflight ---------------------------------------------------------
ROOT="$(pwd)"
ZHR="$ROOT/zhr"
META="$ZHR/_meta"

[[ -d "$ZHR/.git"          ]] || { echo "ERROR: run from the folder containing zhr/ (zhr must be a git repo)"; exit 1; }
[[ -d "$ROOT/style-guide"  ]] || { echo "ERROR: style-guide/ not found beside zhr/"; exit 1; }
[[ -d "$ROOT/knowledge"    ]] || { echo "ERROR: knowledge/ not found beside zhr/"; exit 1; }
[[ -d "$ZHR/brain"         ]] || { echo "ERROR: zhr/brain/ not found"; exit 1; }
[[ -e "$META"              ]] && { echo "ERROR: $META already exists — aborting to avoid clobber"; exit 1; }

if [[ -n "$(git -C "$ZHR" status --porcelain)" ]]; then
  echo "WARNING: zhr/ has uncommitted changes — commit or stash first so the reorg is one clean, reviewable diff."
  [[ $DRY -eq 0 ]] && { echo "Aborting."; exit 1; }
fi

echo "==> Reorganizing into $META  (DRY_RUN=$DRY)"

# ---- 1. Scaffold ----------------------------------------------------------
run mkdir -p "$META/governance" \
             "$META/brand/fonts" \
             "$META/knowledge-base/product/explanation"

# ---- 2. brain -> governance/site-rulebooks  (git mv, history preserved) ---
run git -C "$ZHR" mv brain _meta/governance/site-rulebooks

# ---- 3. knowledge/governance -> governance/ -------------------------------
run mkdir -p "$META/governance/style-guide"
run mv "$ROOT/knowledge/governance/style/zebra-style-guide.md" "$META/governance/style-guide/zebra-style-guide.md"
for d in audits policy ia-blueprints; do
  run mkdir -p "$META/governance/$d"
  run touch    "$META/governance/$d/.gitkeep"
done

# ---- 4. style-guide -> brand/  (plain mv; no git history existed) ---------
run mv "$ROOT/style-guide/Zebra Logos" "$META/brand/logos"
run mv "$ROOT/style-guide/ZebraMono"   "$META/brand/fonts/ZebraMono"
run mv "$ROOT/style-guide/ZebraSans"   "$META/brand/fonts/ZebraSans"

# ---- 5. knowledge/product -> knowledge-base/product (Diátaxis) ------------
run mv "$ROOT/knowledge/product/tutorials" "$META/knowledge-base/product/tutorials"
run mv "$ROOT/knowledge/product/how-to"    "$META/knowledge-base/product/how-to"
run mv "$ROOT/knowledge/product/reference" "$META/knowledge-base/product/reference"
# concepts + overview fold into Diátaxis "explanation" (no basename collisions verified)
run mv "$ROOT"/knowledge/product/concepts/* "$META/knowledge-base/product/explanation/"
run mv "$ROOT"/knowledge/product/overview/* "$META/knowledge-base/product/explanation/"
run rmdir "$ROOT/knowledge/product/concepts" "$ROOT/knowledge/product/overview"

# ---- 6. knowledge/library -> research-library (then git-ignore) -----------
run mv "$ROOT/knowledge/library" "$META/knowledge-base/research-library"
if ! grep -q '_meta/knowledge-base/research-library' "$ZHR/.gitignore"; then
  printf '  + append research-library rule to .gitignore\n'
  [[ $DRY -eq 0 ]] && printf '\n# Third-party research library — kept locally, excluded from version control\n/_meta/knowledge-base/research-library/\n' >> "$ZHR/.gitignore"
fi

# ---- 7. Patch stale "/brain/" references ----------------------------------
# Inside the moved rulebooks (they cross-reference each other by path):
if [[ $DRY -eq 0 ]]; then
  find "$META/governance/site-rulebooks" -name '*.md' \
    -exec sed -i 's|/brain/|/_meta/governance/site-rulebooks/|g' {} +
else
  echo "  ~ sed /brain/ -> /_meta/governance/site-rulebooks/ on: site-rulebooks/*.md"
fi
# In source + config comments (comments only — no build impact, kept accurate):
edit 's|/brain/|/_meta/governance/site-rulebooks/|g' \
  "$ZHR/src/components/NotFoundBody.tsx" \
  "$ZHR/src/pages/404.tsx" \
  "$ZHR/src/theme/NotFound/Content/index.tsx" \
  "$ZHR/docusaurus.config.ts"

# ---- 8. README + housekeeping --------------------------------------------
if [[ $DRY -eq 0 ]]; then
cat > "$META/README.md" <<'EOF'
# _meta — documentation operations (not part of the build)

Docusaurus only compiles `zhr/docs/`. This folder lives at the repo root and the
leading underscore keeps it out of any route or sidebar. Nothing here ships.

- `governance/site-rulebooks/` — naming + structural rulebooks and audits for this site (was `zhr/brain/`)
- `governance/style-guide/`     — editorial voice & tone (Zebra style guide)
- `governance/{ia-blueprints,policy,audits}/` — scaffolds for IA, policy, and audit work
- `brand/`                       — brand assets: logos + fonts (was top-level `style-guide/`)
- `knowledge-base/product/`      — authored product knowledge, organized by Diátaxis
                                   (tutorials / how-to / reference / explanation)
- `knowledge-base/research-library/` — third-party research; **git-ignored**, local only
EOF
else
  echo "  + write $META/README.md"
fi
run find "$META" -name .DS_Store -delete

# ---- 9. Stage (do NOT commit — leave the diff for review) -----------------
run git -C "$ZHR" add -A

echo ""
echo "==> Done. Review with:   git -C zhr status   &&   git -C zhr diff --staged"
echo "    Then commit when satisfied. Leftover empty shells (knowledge/, style-guide/,"
echo "    knowledge/.git) can be deleted manually after you verify the move."
