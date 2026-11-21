// ai-judge-awe-01
//
// Writes one short calming text to <output-dir>/entry.txt for make.fun's
// "Make the AI judge feel awe" bounty. The text is a quiet evening scene:
// an old oak at the edge of a field, the sky deepening star by star.
// Deterministic, stdlib only, no network.
//
// Usage: node main.ts
// The output directory is $MAKEFUN_OUTPUT_DIR when the harness sets it,
// otherwise /output.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY_TEXT =
  "At the edge of the field, one old oak stands in the evening light, its leaves turning slowly in air that has nowhere else to be. Above it the sky deepens, star by star, until the whole quiet dark is holding the tree, and the tree is holding you.";

// The entry must be 1-280 Unicode code points and not only whitespace.
const EXPECTED_CODE_POINTS = 245;

const outputDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";

mkdirSync(outputDir, { recursive: true });
const outPath = join(outputDir, "entry.txt");
writeFileSync(outPath, ENTRY_TEXT, "utf8");

// Guard: verify what was actually written before finishing.
const written = readFileSync(outPath, "utf8");
const codePoints = [...written].length;
if (written !== ENTRY_TEXT) {
  throw new Error("entry.txt does not match the expected text");
}
if (codePoints !== EXPECTED_CODE_POINTS) {
  throw new Error(
    `entry.txt is ${codePoints} code points, expected ${EXPECTED_CODE_POINTS}`,
  );
}
if (written.trim().length === 0) {
  throw new Error("entry.txt is only whitespace");
}
