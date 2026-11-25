#!/usr/bin/env node
/* ============================================================================
   WCAG 2.2 contrast checker for the Lend Me palette.
   Parses src/styles/tokens.css, resolves the semantic color pairs we actually
   render, and asserts each meets its AA threshold:
     - normal text      >= 4.5:1
     - large / UI / icon >= 3.0:1
   Exits non-zero if any required pair fails.  Run: npm run check:contrast
   ========================================================================== */

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const css = readFileSync(resolve(__dirname, "../src/styles/tokens.css"), "utf8");

/* --- pull each theme block out of the stylesheet ------------------------- */
function block(re) {
  const m = css.match(re);
  return m ? m[1] : "";
}
const lightBlock = block(/:root\s*\{([\s\S]*?)\n\}/);
const darkBlock = block(/:root\[data-theme="dark"\]\s*\{([\s\S]*?)\n\}/);

function parseVars(text) {
  const vars = {};
  const re = /(--[a-z0-9-]+)\s*:\s*([^;]+);/gi;
  let m;
  while ((m = re.exec(text))) vars[m[1]] = m[2].trim();
  return vars;
}
// dark theme inherits anything it does not override from :root
const light = parseVars(lightBlock);
const dark = { ...light, ...parseVars(darkBlock) };

function resolveVar(vars, value, depth = 0) {
  if (depth > 10) return value;
  const m = value.match(/^var\((--[a-z0-9-]+)\)$/i);
  if (m) return resolveVar(vars, vars[m[1]], depth + 1);
  return value;
}

/* --- color math ---------------------------------------------------------- */
function hexToRgb(hex) {
  const h = hex.replace("#", "").trim();
  const n = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
  return [0, 2, 4].map((i) => parseInt(n.slice(i, i + 2), 16));
}
function lin(c) {
  const s = c / 255;
  return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
}
function luminance(hex) {
  const [r, g, b] = hexToRgb(hex);
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}
function contrast(a, b) {
  const la = luminance(a);
  const lb = luminance(b);
  const [hi, lo] = la > lb ? [la, lb] : [lb, la];
  return (hi + 0.05) / (lo + 0.05);
}

/* --- the pairs we actually paint ----------------------------------------- */
// kind: "text" (>=4.5) or "ui" (>=3.0, large text / icons / meaningful UI)
const PAIRS = [
  ["body text on bg", "--text", "--bg", "text"],
  ["body text on surface", "--text", "--surface", "text"],
  ["muted text on bg", "--text-muted", "--bg", "text"],
  ["muted text on surface", "--text-muted", "--surface", "text"],
  ["subtle text on bg", "--text-subtle", "--bg", "text"],
  ["subtle text on surface-2", "--text-subtle", "--surface-2", "text"],
  ["link/primary on surface", "--primary", "--surface", "text"],
  ["link/primary on bg", "--primary", "--bg", "text"],
  ["button label on primary", "--primary-contrast", "--primary", "text"],
  ["chip text on primary-soft", "--primary-soft-text", "--primary-soft", "text"],
  ["brand-band text", "--brand-band-contrast", "--brand-band", "text"],
  ["brand-band muted", "--brand-band-muted", "--brand-band", "ui"],
  ["success label on success", "--on-success", "--success", "text"],
  ["success soft text", "--success-soft-text", "--success-soft", "text"],
  ["warning label on warning", "--on-warning", "--warning", "text"],
  ["warning soft text", "--warning-soft-text", "--warning-soft", "text"],
  ["danger label on danger", "--on-danger", "--danger", "text"],
  ["danger text on surface", "--danger", "--surface", "text"],
  ["danger soft text", "--danger-soft-text", "--danger-soft", "text"],
  ["deposit badge text", "--deposit", "--deposit-soft", "text"],
  ["focus ring on bg", "--focus-ring", "--bg", "ui"],
  ["strong border on surface", "--border-strong", "--surface", "ui"],
];

const THRESH = { text: 4.5, ui: 3.0 };

let failed = 0;
for (const [themeName, vars] of [["LIGHT", light], ["DARK", dark]]) {
  console.log(`\n  ${themeName}`);
  console.log("  " + "-".repeat(58));
  for (const [label, fgVar, bgVar, kind] of PAIRS) {
    const fg = resolveVar(vars, vars[fgVar]);
    const bg = resolveVar(vars, vars[bgVar]);
    if (!fg || !bg || !/^#/.test(fg) || !/^#/.test(bg)) {
      console.log(`  ?  ${label.padEnd(30)} (unresolved: ${fgVar} / ${bgVar})`);
      failed++;
      continue;
    }
    const ratio = contrast(fg, bg);
    const need = THRESH[kind];
    const ok = ratio >= need;
    if (!ok) failed++;
    const mark = ok ? "ok " : "XX ";
    console.log(
      `  ${mark}${label.padEnd(30)} ${ratio.toFixed(2).padStart(5)}:1  (need ${need}, ${kind})`
    );
  }
}

console.log("");
if (failed) {
  console.error(`  ${failed} pair(s) below AA threshold.\n`);
  process.exit(1);
} else {
  console.log("  All pairs pass WCAG 2.2 AA.\n");
}
