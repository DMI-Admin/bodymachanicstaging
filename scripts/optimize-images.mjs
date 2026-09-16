#!/usr/bin/env node
/**
 * Converts the original artwork in team-bodymechanik-step6/assets into the
 * web-sized WebP files served from public/images.
 *
 * The originals are 1–2 MB PNGs each (11 MB total); the output is ~0.5 MB.
 * Re-run after replacing or adding a photo:  node scripts/optimize-images.mjs
 */
import sharp from "sharp";

const SRC = "team-bodymechanik-step6/assets";
const OUT = "public/images";

await sharp(`${SRC}/tbm-logo.png`).resize(640).webp({ quality: 88, alphaQuality: 90 }).toFile(`${OUT}/tbm-logo.webp`);
await sharp(`${SRC}/tbm-logo.png`).resize(256).webp({ quality: 85 }).toFile(`${OUT}/tbm-logo-sm.webp`);
await sharp(`${SRC}/coach-krish-nicky.jpg`).rotate().resize(880).webp({ quality: 80 }).toFile(`${OUT}/coach-krish-nicky.webp`);

for (let i = 1; i <= 6; i++) {
  await sharp(`${SRC}/transformation-${i}.png`)
    .flatten({ background: "#0b0b0b" })
    .resize(900)
    .webp({ quality: 80 })
    .toFile(`${OUT}/transformation-${i}.webp`);
}

// 1200×630 social preview: the logo centred on black.
await sharp(`${SRC}/tbm-logo.png`)
  .resize({ height: 520 })
  .flatten({ background: "#050505" })
  .resize(1200, 630, { fit: "contain", background: "#050505" })
  .jpeg({ quality: 85 })
  .toFile("public/og.jpg");

console.log(`✓ wrote optimised images to ${OUT}/`);
