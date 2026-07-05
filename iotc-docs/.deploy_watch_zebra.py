import json, os, re, sys, time, urllib.request, urllib.error

REPO = "al1913-zebra/zebra-handheld-rfid-iotc"
SHA = "29cf2a00c65752d54252a6d2dacdd2e43bd2f920"
TOKEN = os.environ.get("GIT_TOKEN", "")
API = "https://api.github.com"
PAGES = "https://al1913-zebra.github.io/zebra-handheld-rfid-iotc"
ORIGIN = "https://al1913-zebra.github.io"
MARKER = ".schema-panel{"   # base .schema-panel rule — new this change (only --fullbleed existed before)
DEADLINE = time.time() + 60 * 40

def api(path, method="GET"):
    req = urllib.request.Request(API + path, method=method)
    req.add_header("Accept", "application/vnd.github+json")
    if TOKEN:
        req.add_header("Authorization", "Bearer " + TOKEN)
    try:
        with urllib.request.urlopen(req, timeout=30) as r:
            body = r.read().decode("utf-8", "replace")
            return r.status, (json.loads(body) if body.strip() else {})
    except urllib.error.HTTPError as e:
        return e.code, {}
    except Exception as e:
        return -1, {"err": str(e)}

def http(url):
    try:
        with urllib.request.urlopen(urllib.request.Request(url), timeout=30) as r:
            return r.status, r.read()
    except urllib.error.HTTPError as e:
        return e.code, b""
    except Exception:
        return -1, b""

def deploy_run():
    st, d = api("/repos/%s/actions/runs?head_sha=%s&per_page=20" % (REPO, SHA))
    if st != 200:
        return None
    for run in d.get("workflow_runs", []):
        if "pages build and deployment" not in (run.get("name") or "").lower():
            return run  # the Deploy/CodeQL for our commit; Deploy is what we want
    return None

def latest_pages_run():
    st, d = api("/repos/%s/actions/runs?per_page=20" % REPO)
    if st != 200:
        return None
    for run in d.get("workflow_runs", []):
        if "pages build and deployment" in (run.get("name") or "").lower():
            return run  # most recent pages publish (keyed to the gh-pages branch commit)
    return None

def css_marker_live():
    hs, hb = http(PAGES + "/reference/mgmt/get-status/")
    if hs != 200:
        return False, hs
    html = hb.decode("utf-8", "replace")
    for p in sorted(set(re.findall(r'/zebra-handheld-rfid-iotc/assets/css/[^"\']+\.css', html))):
        cs, cb = http(ORIGIN + p)
        if cs == 200 and MARKER in cb.decode("utf-8", "replace"):
            return True, hs
    return False, hs

def flush(*a):
    print(*a, flush=True)

flush("=== zebra/box deploy watch for %s ===" % SHA[:7])
# 1) Deploy build must succeed (SCSS compiles, no broken links).
deploy_ok = False
while time.time() < DEADLINE:
    dr = deploy_run()
    if dr is None:
        flush("waiting for Deploy run..."); time.sleep(15); continue
    flush("Deploy: status=%s concl=%s run=%s" % (dr.get("status"), dr.get("conclusion"), dr.get("id")))
    if dr.get("status") != "completed":
        time.sleep(20); continue
    if dr.get("conclusion") != "success":
        flush("DEPLOY FAILED (concl=%s) -> build did not pass. Inspect run %s" % (dr.get("conclusion"), dr.get("id")))
        sys.exit(2)
    deploy_ok = True
    break
if not deploy_ok:
    flush("TIMEOUT waiting for Deploy"); sys.exit(1)

# 2) Wait for the new CSS to go live; rerun a FAILED pages publish (keyed to the latest pages run).
rerun_done = set()
while time.time() < DEADLINE:
    live, hs = css_marker_live()
    if live:
        flush("LIVE OK: new schema CSS is live (.schema-panel base rule present)")
        break
    pr = latest_pages_run()
    ps = pr.get("status") if pr else None
    pc = pr.get("conclusion") if pr else None
    pid = pr.get("id") if pr else None
    flush("live_css=%s (html %s) | pages: status=%s concl=%s run=%s" % (live, hs, ps, pc, pid))
    if pr and ps == "completed" and pc != "success" and pid not in rerun_done:
        code, _ = api("/repos/%s/actions/runs/%s/rerun-failed-jobs" % (REPO, pid), method="POST")
        flush("  -> reran failed pages publish %s (status %s)" % (pid, code))
        rerun_done.add(pid)
    time.sleep(20)
else:
    flush("TIMEOUT: new CSS not confirmed live"); sys.exit(3)

# 3) Sanity: sample PDFs still serve.
res = {}
for p in ["/pdf/reference/mgmt/get-status.pdf", "/pdf/reference/ctrl/control-operation.pdf", "/pdf/reference/api-reference-full.pdf"]:
    s, b = http(PAGES + p)
    res[p] = "%s/%s" % (s, "PDF" if b[:4] == b"%PDF" else "x")
flush("pdfs: " + json.dumps(res))
flush("DONE: schema-table box + zebra CSS shipped and live.")
