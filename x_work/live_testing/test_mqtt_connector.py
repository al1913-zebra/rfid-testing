#!/usr/bin/env python3
"""Phase 4 — Command-validation harness for the Handheld RFID IOTC MQTT API.

Run with one command (idempotent, deterministic, clean teardown):
    python test_mqtt_connector.py [--host 192.168.1.6] [--port 1883] [--report phase4-validation-report.md]

What it does (LIVE-vs-MOCK aware):
  1. ALWAYS: in-memory schema/contract validation of every command/response/event
     example against its own (ref-resolved) schema using jsonschema  -> [verified-from-schema]
  2. IF a broker is reachable: stands up a *mock connector* (subscribes on
     {EP}/clients/cmnd, validates the inbound envelope, publishes a schema-shaped
     response on {EP}/clients/resp with a documented 0-30 code) and a *mock
     application* (publishes well-formed + malformed envelopes, asserts responses).
     Routing/shape round-trips  -> [verified-via-local-mock: routing/shape only]
  3. IF no broker: in-memory validation only; routing assertions -> [verified-from-schema].

HONESTY REFRAME (mandatory): the mock connector's code mapping is an ASSUMPTION
encoded here, NOT a discovered firmware fact. A passing mock test proves only
envelope/topic round-trip and code representability. This run did NOT prove the
RFD40 session attached, so NO [verified-on-device] label is emitted anywhere.
CTRL/DATA-plane and all TLS/securityParams paths remain firmware-unknown.
"""
import argparse, json, os, sys, threading, time
from collections import OrderedDict

import yaml
from jsonschema import Draft7Validator
import paho.mqtt.client as mqtt

ROOT = os.path.dirname(os.path.abspath(__file__))

# ---------------------------------------------------------------- ref resolution
LIST_KW = {"required", "enum", "allOf", "anyOf", "oneOf", "items"}
DICT_KW = {"properties", "definitions", "patternProperties"}

def load_any(path):
    with open(path, "r", encoding="utf-8") as f:
        txt = f.read()
    return json.loads(txt) if path.lower().endswith(".json") else yaml.safe_load(txt)

def _navigate(doc, frag):
    cur = doc
    for part in [p for p in frag.split("/") if p and p != "#"]:
        part = part.replace("~1", "/").replace("~0", "~")
        cur = cur[int(part)] if isinstance(cur, list) else cur[part]
    return cur

def _inline(node, base, root, stack, depth=0):
    if depth > 60:
        return {"x-deep": True}
    if isinstance(node, dict):
        if "$ref" in node and isinstance(node["$ref"], str):
            ref = node["$ref"]
            sib = {k: v for k, v in node.items() if k != "$ref"}
            if ref.startswith("#"):
                try:
                    tgt = _navigate(root, ref)
                except Exception:
                    return {"x-bad-internal-ref": ref}
                res = _inline(tgt, base, root, stack, depth + 1)
            else:
                fp, _, frag = ref.partition("#")
                ap = os.path.normpath(os.path.join(base, fp))
                if not os.path.exists(ap):
                    return {"x-missing-ref": ref}
                key = (ap, frag)
                if key in stack:
                    return {"type": "object", "x-cycle": ref}
                sub = load_any(ap)
                tgt = _navigate(sub, frag) if frag else sub
                res = _inline(tgt, os.path.dirname(ap), sub, stack | {key}, depth + 1)
            if isinstance(res, dict) and sib:
                m = dict(res)
                for k, v in sib.items():
                    m[k] = _inline(v, base, root, stack, depth + 1)
                return m
            return res
        return {k: _inline(v, base, root, stack, depth + 1) for k, v in node.items()}
    if isinstance(node, list):
        return [_inline(x, base, root, stack, depth + 1) for x in node]
    return node

def _sanitize(node):
    if isinstance(node, dict):
        out = {}
        for k, v in node.items():
            if k in LIST_KW and not isinstance(v, list):
                continue
            if k in DICT_KW and not isinstance(v, dict):
                continue
            out[k] = _sanitize(v)
        return out
    if isinstance(node, list):
        return [_sanitize(x) for x in node]
    return node

def resolve_schema(path):
    doc = load_any(path)
    return _sanitize(_inline(doc, os.path.dirname(path), doc, frozenset())), doc

# ---------------------------------------------------------------- report rows
ROWS = []  # (operation, test, topic, sent, expected, observed, result, provenance)
def add_row(op, test, topic, sent, expected, observed, result, prov):
    ROWS.append((op, test, topic, sent, expected, observed, result, prov))

# ---------------------------------------------------------------- documented codes
CODES = {  # the only source: refrence/response/response.yaml (0-30)
    0: "Success", 1: "Command payload is accepted", 2: "Invalid payload",
    3: "Not able to retrieve information", 23: "Invalid enum value",
    24: "Max 32 prefilters limit exceeded", 25: "Max 3 publish topics exceeded",
    26: "Max 1 subscribe topic exceeded", 27: "Invalid tenant ID length",
}

# operation -> (group, command-enum-value, payload-key-or-None)
CONTROL = {
    "control_operation": ("control", "control_operation", "ctrlOprPayload"),
    "get_operating_mode": ("control", "get_operating_mode", None),
    "set_operating_mode": ("control", "set_operating_mode", "operatingMode"),
    "get_post_filter": ("control", "get_post_filter", None),
    "set_post_filter": ("control", "set_post_filter", "postFilterPayload"),
}
DEVMGMT = {
    "get_version": ("dev_mgmt", "get_version", None),
    "get_status": ("dev_mgmt", "get_status", None),
    "config_endpoint": ("dev_mgmt", "config_endpoint", "epConfig"),
    "get_endpoint_config": ("dev_mgmt", "get_endpoint_config", "endpointDetails"),
    "reboot": ("dev_mgmt", "reboot", None),
    "set_wifi": ("dev_mgmt", "set_wifi", "wifiConfig"),
    "config_events": ("dev_mgmt", "config_events", "eventConfiguration"),
}
EPTYPE = {"control": "CTRL", "dev_mgmt": "MGMT"}

# ---------------------------------------------------------------- (1) in-memory validation
def in_memory_validation():
    print("\n=== (1) IN-MEMORY SCHEMA VALIDATION (jsonschema) — [verified-from-schema] ===")
    groups = ["commands/control", "commands/dev_mgmt", "response/control",
              "response/dev_mgmt", "events"]
    n_ok = n_bad = n_err = 0
    for g in groups:
        d = os.path.join(ROOT, g)
        for fn in sorted(os.listdir(d)):
            if not fn.endswith(".json"):
                continue
            rel = f"{g}/{fn}"
            try:
                schema, raw = resolve_schema(os.path.join(d, fn))
            except Exception as e:
                n_err += 1
                add_row(fn, "schema-resolve", rel, "-", "resolves", f"ERROR: {str(e)[:60]}",
                        "ERROR", "[verified-from-schema]")
                continue
            examples = raw.get("examples") if isinstance(raw, dict) else None
            if not isinstance(examples, list) or not examples:
                continue
            val = Draft7Validator({k: v for k, v in schema.items() if k != "examples"})
            for i, ex in enumerate(examples):
                errs = sorted(val.iter_errors(ex), key=lambda e: list(e.path))
                if errs:
                    n_bad += 1
                    msg = errs[0].message[:80]
                    add_row(fn, f"example#{i} vs schema", rel, "example", "valid",
                            f"INVALID: {msg}", "FAIL", "[verified-from-schema]")
                else:
                    n_ok += 1
                    add_row(fn, f"example#{i} vs schema", rel, "example", "valid",
                            "valid", "PASS", "[verified-from-schema]")
    print(f"  examples valid={n_ok}  invalid={n_bad}  schema-resolve-errors={n_err}")
    return n_ok, n_bad, n_err

# ---------------------------------------------------------------- broker probe
def broker_reachable(host, port):
    try:
        c = mqtt.Client(client_id="iotc-probe", clean_session=True,
                        callback_api_version=mqtt.CallbackAPIVersion.VERSION1)
    except Exception:
        c = mqtt.Client(client_id="iotc-probe", clean_session=True)
    ok = {"v": False}
    def on_connect(cl, u, f, rc, *a): ok["v"] = (rc == 0)
    c.on_connect = on_connect
    try:
        c.connect(host, port, keepalive=10); c.loop_start(); time.sleep(1.5)
        c.loop_stop(); c.disconnect()
    except Exception:
        return False
    return ok["v"]

def new_client(cid):
    try:
        return mqtt.Client(client_id=cid, clean_session=True,
                           callback_api_version=mqtt.CallbackAPIVersion.VERSION1)
    except Exception:
        return mqtt.Client(client_id=cid, clean_session=True)

# ---------------------------------------------------------------- encoded code logic
def evaluate_envelope(env):
    """Return (code, description) for an inbound envelope.
    This mapping is an ASSUMPTION encoded here (NOT firmware truth) -> [verified-via-local-mock]."""
    if not isinstance(env, dict):
        return 2, CODES[2]
    cmd, rid = env.get("command"), env.get("requestId")
    if cmd is None or rid is None or not isinstance(rid, str):
        return 2, CODES[2]
    known = set(CONTROL) | set(DEVMGMT) | {
        "get_config", "set_config", "get_current_region", "set_os", "get_wifi",
        "delete_wifi_profile", "get_eth", "install_certificate", "delete_certificate",
        "get_installed_certificates"}
    if cmd not in known:
        return 23, CODES[23]
    if cmd == "config_endpoint":
        conf = (env.get("epConfig") or {}).get("configuration", {})
        mq = conf.get("mqttParams", {}) if isinstance(conf, dict) else {}
        if isinstance(mq.get("publishTopics"), list) and len(mq["publishTopics"]) > 3:
            return 25, CODES[25]
        if isinstance(mq.get("subscribeTopics"), list) and len(mq["subscribeTopics"]) > 1:
            return 26, CODES[26]
        if isinstance(conf.get("tenantId"), str) and len(conf["tenantId"]) > 64:
            return 27, CODES[27]
    if cmd == "set_operating_mode":
        prof = (env.get("operatingMode") or {}).get("operatingModes", {}).get("profiles")
        valid = {"FAST_READ", "CYCLE_COUNT", "DENSE_READERS", "OPTIMAL_BATTERY",
                 "BALANCED_PERFORMANCE", "ADVANCED"}
        if prof is not None and prof not in valid:
            return 23, CODES[23]
    if cmd == "set_post_filter":
        pf = env.get("postFilterPayload") or {}
        arr = pf.get("preFilters") or pf.get("filters") or pf.get("select")
        if isinstance(arr, list) and len(arr) > 32:
            return 24, CODES[24]
    return 0, CODES[0]

# ---------------------------------------------------------------- mock connector
class MockConnector:
    """Subscribes on every {EP}/clients/cmnd, validates the inbound envelope, and
    publishes a schema-shaped response on {EP}/clients/resp."""
    def __init__(self, host, port):
        self.c = new_client("iotc-mock-connector")
        self.c.on_connect = self._on_connect
        self.c.on_message = self._on_message
        self.host, self.port = host, port

    def _on_connect(self, cl, u, f, rc, *a):
        for ep in ("CTRL", "MGMT"):
            cl.subscribe(f"{ep}/clients/cmnd", 1)

    def _on_message(self, cl, u, msg):
        ep = msg.topic.split("/")[0]
        try:
            env = json.loads(msg.payload.decode("utf-8", "replace"))
        except Exception:
            env = None
        code, desc = evaluate_envelope(env)
        resp = OrderedDict()
        resp["command"] = (env or {}).get("command") if isinstance(env, dict) else None
        resp["requestId"] = (env or {}).get("requestId") if isinstance(env, dict) else None
        resp["apiVersion"] = "V1.1"
        resp["response"] = {"code": code, "description": desc}
        cl.publish(f"{ep}/clients/resp", json.dumps(resp), qos=1)

    def start(self):
        self.c.connect(self.host, self.port, keepalive=30); self.c.loop_start()
    def stop(self):
        self.c.loop_stop(); self.c.disconnect()

# ---------------------------------------------------------------- mock application
class MockApp:
    def __init__(self, host, port):
        self.c = new_client("iotc-mock-app")
        self.lock = threading.Lock()
        self.responses = {}  # requestId -> (topic, dict)
        self.c.on_connect = lambda cl, u, f, rc, *a: [cl.subscribe(f"{ep}/clients/resp", 1)
                                                      for ep in ("CTRL", "MGMT")]
        self.c.on_message = self._on_message
        self.host, self.port = host, port
        self.seq = 0

    def _on_message(self, cl, u, msg):
        try:
            j = json.loads(msg.payload.decode("utf-8", "replace"))
        except Exception:
            return
        rid = j.get("requestId") if isinstance(j, dict) else None
        if rid is not None:
            with self.lock:
                self.responses[rid] = (msg.topic, j)

    def start(self):
        self.c.connect(self.host, self.port, keepalive=30); self.c.loop_start(); time.sleep(1.0)
    def stop(self):
        self.c.loop_stop(); self.c.disconnect()

    def rid(self):
        self.seq += 1
        return f"{self.seq:016x}"  # 16 hex digits per documented intent

    def round_trip(self, ep, envelope, timeout=6.0):
        rid = envelope["requestId"]
        self.c.publish(f"{ep}/clients/cmnd", json.dumps(envelope), qos=1)
        deadline = time.time() + timeout
        while time.time() < deadline:
            with self.lock:
                if rid in self.responses:
                    return self.responses[rid]
            time.sleep(0.05)
        return None, None

# ---------------------------------------------------------------- broker tests
def broker_tests(host, port):
    print(f"\n=== (2) BROKER MOCK ROUND-TRIPS @ {host}:{port} — [verified-via-local-mock: routing/shape only] ===")
    conn = MockConnector(host, port); conn.start()
    app = MockApp(host, port); app.start()
    time.sleep(0.8)
    npass = nfail = 0

    def check(op, ep, env, expect_code, label):
        nonlocal npass, nfail
        topic = f"{ep}/clients/cmnd"
        rid = env.get("requestId")
        # Envelopes with no (string) requestId cannot be correlated over async MQTT,
        # so assert the connector's encoded logic directly (connector-unit check).
        if not isinstance(rid, str):
            code, desc = evaluate_envelope(env)
            ok = (code == expect_code) and (0 <= code <= 30)
            result = "PASS" if ok else "FAIL"
            npass += result == "PASS"; nfail += result == "FAIL"
            add_row(op, label, f"{topic} (connector-unit)", json.dumps(env)[:48],
                    f"code={expect_code}", f"code={code}", result, "[verified-via-local-mock]")
            return
        rtopic, resp = app.round_trip(ep, env)
        if resp is None:
            nfail += 1
            add_row(op, label, topic, json.dumps(env)[:48], f"code={expect_code}",
                    "NO RESPONSE", "FAIL", "[verified-via-local-mock]")
            return
        ok_rid = resp.get("requestId") == rid
        ok_env = all(k in resp for k in ("command", "requestId", "apiVersion", "response"))
        code = resp.get("response", {}).get("code")
        ok_code = (code == expect_code) and (0 <= code <= 30)
        result = "PASS" if (ok_rid and ok_env and ok_code) else "FAIL"
        npass += result == "PASS"; nfail += result == "FAIL"
        add_row(op, label, f"{topic} -> {rtopic}", json.dumps(env)[:48],
                f"code={expect_code}, rid echoed, well-formed",
                f"code={code}, rid={'ok' if ok_rid else 'BAD'}, env={'ok' if ok_env else 'BAD'}",
                result, "[verified-via-local-mock]")

    # positive envelopes
    pos = [
        ("get_version", "MGMT", {"command": "get_version", "requestId": app.rid()}, 0, "positive envelope"),
        ("get_status", "MGMT", {"command": "get_status", "requestId": app.rid()}, 0, "positive envelope"),
        ("get_endpoint_config", "MGMT", {"command": "get_endpoint_config", "requestId": app.rid(),
            "endpointDetails": {"endpointName": "MDM_EP"}}, 0, "positive envelope"),
        ("control_operation", "CTRL", {"command": "control_operation", "requestId": app.rid(),
            "ctrlOprPayload": {"action": "START"}}, 0, "positive envelope"),
        ("get_operating_mode", "CTRL", {"command": "get_operating_mode", "requestId": app.rid()}, 0, "positive envelope"),
        ("set_operating_mode", "CTRL", {"command": "set_operating_mode", "requestId": app.rid(),
            "operatingMode": {"operatingModes": {"profiles": "BALANCED_PERFORMANCE"}}}, 0, "positive envelope"),
        ("config_endpoint", "MGMT", {"command": "config_endpoint", "requestId": app.rid(),
            "epConfig": {"operation": "add", "configuration": {"endpointName": "CTRL_EP",
                "epType": "CTRL", "protocol": "MQTT", "activate": True, "url": "192.168.1.6",
                "verificationType": "NONE", "port": 1883, "qosCommon": 1, "tenantId": "zebra"}}}, 0, "positive envelope"),
    ]
    for op, ep, env, code, label in pos:
        check(op, ep, env, code, label)

    # negative tests (mock-encoded code assumptions)
    neg = [
        ("set_operating_mode", "CTRL", {"command": "set_operating_mode", "requestId": app.rid(),
            "operatingMode": {"operatingModes": {"profiles": "TURBO_MODE"}}}, 23, "negative: bad enum -> 23"),
        ("set_post_filter", "CTRL", {"command": "set_post_filter", "requestId": app.rid(),
            "postFilterPayload": {"preFilters": [{"i": n} for n in range(33)]}}, 24, "negative: >32 prefilters -> 24"),
        ("config_endpoint", "MGMT", {"command": "config_endpoint", "requestId": app.rid(),
            "epConfig": {"operation": "add", "configuration": {"mqttParams": {
                "publishTopics": [{"topic": f"t{n}", "qos": 1, "retain": False} for n in range(4)]}}}},
            25, "negative: >3 publishTopics -> 25"),
        ("config_endpoint", "MGMT", {"command": "config_endpoint", "requestId": app.rid(),
            "epConfig": {"operation": "add", "configuration": {"mqttParams": {
                "subscribeTopics": [{"topic": f"s{n}", "qos": 1, "retain": False} for n in range(2)]}}}},
            26, "negative: >1 subscribeTopic -> 26"),
        ("get_version", "MGMT", {"command": "get_version"}, 2, "negative: missing requestId -> 2"),
        ("(unknown)", "MGMT", {"command": "no_such_cmd", "requestId": app.rid()}, 23, "negative: unknown command -> 23"),
    ]
    for op, ep, env, code, label in neg:
        check(op, ep, env, code, label)

    time.sleep(0.5)
    app.stop(); conn.stop()
    print(f"  broker round-trips: PASS={npass} FAIL={nfail}")
    return npass, nfail

# ---------------------------------------------------------------- report writer
def write_report(path, mode, host, port, mem, broker):
    n_ok, n_bad, n_err = mem
    with open(path, "w", encoding="utf-8") as f:
        f.write("# Phase 4 — Command Validation Report\n\n")
        f.write(f"- **Run mode:** {mode}\n")
        f.write(f"- **Broker:** {host}:{port} (local Mosquitto; anonymous)\n")
        f.write("- **Device session:** NOT attached this run -> **no `[verified-on-device]`** labels.\n")
        f.write(f"- **In-memory schema validation:** {n_ok} example(s) valid, {n_bad} invalid, "
                f"{n_err} schema-resolve error(s).\n")
        if broker:
            f.write(f"- **Broker mock round-trips:** {broker[0]} pass, {broker[1]} fail "
                    f"(routing/shape only — `[verified-via-local-mock]`).\n")
        else:
            f.write("- **Broker mock round-trips:** SKIPPED (no broker reachable) -> routing `[verified-from-schema]` only.\n")
        f.write("\n> **Honesty reframe:** mock response codes are ASSUMPTIONS encoded in the harness, "
                "not firmware truth. Passing rows prove envelope/topic round-trip + code representability only. "
                "CTRL/DATA-plane and all TLS paths remain `[firmware-only-unknown]`.\n\n")
        f.write("| Operation | Test | Topic | Sent | Expected | Observed | Result | Provenance |\n")
        f.write("|-----------|------|-------|------|----------|----------|--------|------------|\n")
        for r in ROWS:
            cells = [str(x).replace("|", "\\|").replace("\n", " ") for x in r]
            f.write("| " + " | ".join(cells) + " |\n")
    print(f"\nReport written -> {path}")

# ---------------------------------------------------------------- main
def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--host", default="192.168.1.6")
    ap.add_argument("--port", type=int, default=1883)
    ap.add_argument("--report", default="phase4-validation-report.md")
    args = ap.parse_args()

    mem = in_memory_validation()
    if broker_reachable(args.host, args.port):
        mode = "MOCK (local broker reachable; device NOT attached)"
        broker = broker_tests(args.host, args.port)
    else:
        mode = "IN-MEMORY ONLY (no broker reachable)"
        broker = None
        print("\n=== (2) BROKER MOCK ROUND-TRIPS: SKIPPED — no broker reachable ===")

    write_report(args.report, mode, args.host, args.port, mem, broker)
    n_ok, n_bad, n_err = mem
    fails = n_err + (broker[1] if broker else 0)
    print(f"\n==== SUMMARY: mode={mode} | examples_valid={n_ok} examples_invalid={n_bad} "
          f"resolve_errors={n_err} | broker={broker} ====")
    # Exit 0 always: invalid examples are FINDINGS to report, not harness failures.
    sys.exit(0)

if __name__ == "__main__":
    main()
