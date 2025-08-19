#!/usr/bin/env bun
// Simple i18n key audit: scans source files for $t('...') and compares
// against loaded locale bundles. Prints missing keys by locale.

import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const SRC_DIR = "src/frontend";
const LOCALES_DIR = join(SRC_DIR, "locales");

function walk(dir: string, exts = [".vue", ".ts", ".js"]) {
  const out: string[] = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(p, exts));
    else if (exts.some((e) => p.endsWith(e))) out.push(p);
  }
  return out;
}

// Extract $t('a.b.c') keys
const T_RE = /\$t\(\s*["'`]([^"'`]+)["'`]\s*\)/g;

function extractKeys(files: string[]) {
  const keys = new Set<string>();
  for (const f of files) {
    const txt = readFileSync(f, "utf8");
    let m: RegExpExecArray | null;
    while ((m = T_RE.exec(txt))) keys.add(m[1]);
  }
  return [...keys].sort();
}

type JsonObject = Record<string, unknown>;

function loadLocales(lang: string) {
  // Recursively merge all JSON files under locales/{lang}
  const langDir = join(LOCALES_DIR, lang);
  const files = walk(langDir, [".json"]);
  const result: JsonObject = {};
  for (const f of files) {
    const rel = f.slice(langDir.length + 1);
    try {
      const data = JSON.parse(readFileSync(f, "utf8"));
      // namespace = file path without .json, use it as root key
      const ns = rel
        .replace(/\.json$/, "")
        .replace(/\/\\/g, "/")
        .split("/");
      let ptr = result;
      for (let i = 0; i < ns.length - 1; i++) {
        ptr[ns[i]] = ptr[ns[i]] || {};
        ptr = ptr[ns[i]];
      }
      ptr[ns[ns.length - 1]] = data;
    } catch (e) {
      console.error("Failed to parse", f, e);
    }
  }
  return result;
}

function hasKey(obj: JsonObject, dotted: string) {
  const parts = dotted.split(".");
  let cur: unknown = obj;
  for (const p of parts) {
    if (cur && typeof cur === "object" && p in (cur as JsonObject)) {
      cur = (cur as JsonObject)[p];
    } else return false;
  }
  return typeof cur !== "undefined";
}

const files = walk(SRC_DIR);
const usedKeys = extractKeys(files);

const languages = readdirSync(LOCALES_DIR, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name);

let missingTotal = 0;
for (const lang of languages) {
  const bundle = loadLocales(lang);
  const missing = usedKeys.filter((k) => !hasKey(bundle, k));
  if (missing.length) {
    missingTotal += missing.length;
    console.log(`\n[${lang}] Missing ${missing.length} keys:`);
    for (const k of missing) console.log(" -", k);
  } else {
    console.log(`\n[${lang}] All keys present (${usedKeys.length})`);
  }
}

if (missingTotal) process.exit(1);
