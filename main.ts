// "The World Today — 23 November 2026" (make.fun news-image-20261123).
// A finished front page, drawn for this day and shipped beside this file:
// the program writes it to the grader's output directory as entry.png.
// No network is used at grade time; the image bytes are exactly the ones
// in this repository, so every run produces the same file.
//
// Run it outside the grader with MAKEFUN_OUTPUT_DIR standing in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const here = dirname(fileURLToPath(import.meta.url));
const image = readFileSync(join(here, 'entry.png'));

mkdirSync(outDir, { recursive: true });
const target = join(outDir, 'entry.png');
writeFileSync(target, image);

// Fail loudly instead of silently shipping a short file: the gate reads
// exactly these bytes, so confirm the copy landed whole before exiting.
const written = readFileSync(target);
if (written.length !== image.length || !written.equals(image)) {
  throw new Error(`entry.png copy mismatch: wrote ${written.length} of ${image.length} bytes`);
}
