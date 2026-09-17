import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const svgIcon = `
<svg width="512" height="512" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Background Gradient: Deep Clinical Navy with Ambient Depth -->
    <radialGradient id="bgGrad" cx="50%" cy="36%" r="68%">
      <stop offset="0%" stop-color="#182E4D" />
      <stop offset="55%" stop-color="#0D1B2E" />
      <stop offset="100%" stop-color="#060C16" />
    </radialGradient>

    <!-- Subtle Ambient Glow Behind Cross -->
    <radialGradient id="glowGrad" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#00E5B9" stop-opacity="0.22" />
      <stop offset="65%" stop-color="#00A887" stop-opacity="0.06" />
      <stop offset="100%" stop-color="#00E5B9" stop-opacity="0" />
    </radialGradient>

    <!-- Cross Gradient -->
    <linearGradient id="crossGrad" x1="150" y1="80" x2="362" y2="432" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#00F5C4" />
      <stop offset="45%" stop-color="#00CFA2" />
      <stop offset="100%" stop-color="#009675" />
    </linearGradient>

    <!-- Cross Inner Bevel / Highlight -->
    <linearGradient id="crossBevel" x1="256" y1="96" x2="256" y2="416" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.35" />
      <stop offset="15%" stop-color="#FFFFFF" stop-opacity="0.05" />
      <stop offset="85%" stop-color="#000000" stop-opacity="0" />
      <stop offset="100%" stop-color="#000000" stop-opacity="0.25" />
    </linearGradient>

    <!-- Document Shadow -->
    <filter id="docShadow" x="-15%" y="-15%" width="130%" height="135%" filterUnits="userSpaceOnUse">
      <feDropShadow dx="0" dy="10" stdDeviation="12" flood-color="#040912" flood-opacity="0.45" />
      <feDropShadow dx="0" dy="3" stdDeviation="4" flood-color="#040912" flood-opacity="0.25" />
    </filter>

    <!-- Cross Elevation Shadow -->
    <filter id="crossShadow" x="-15%" y="-15%" width="130%" height="135%" filterUnits="userSpaceOnUse">
      <feDropShadow dx="0" dy="16" stdDeviation="20" flood-color="#02050B" flood-opacity="0.55" />
      <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#02050B" flood-opacity="0.3" />
    </filter>

    <!-- Capsule Shadow -->
    <filter id="capsuleShadow" x="-20%" y="-20%" width="140%" height="150%" filterUnits="userSpaceOnUse">
      <feDropShadow dx="2" dy="8" stdDeviation="8" flood-color="#02050B" flood-opacity="0.5" />
    </filter>

    <!-- Capsule Left (Teal) Gradient -->
    <linearGradient id="capTeal" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#00F5C4" />
      <stop offset="100%" stop-color="#009F7C" />
    </linearGradient>

    <!-- Capsule Right (Coral Red) Gradient -->
    <linearGradient id="capCoral" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#FB7185" />
      <stop offset="50%" stop-color="#F43F5E" />
      <stop offset="100%" stop-color="#BE123C" />
    </linearGradient>

    <!-- Dogear Fold Gradient -->
    <linearGradient id="foldGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#CBD5E1" />
      <stop offset="100%" stop-color="#94A3B8" />
    </linearGradient>
  </defs>

  <!-- 1. Background (Covers entire 512x512 canvas) -->
  <rect width="512" height="512" fill="url(#bgGrad)" />

  <!-- 2. Ambient Glow within Safe Area (Safe zone is circle r=205 centered at 256,256) -->
  <circle cx="256" cy="256" r="185" fill="url(#glowGrad)" />

  <!-- Subtle Decorative Outer Ring inside safe zone -->
  <circle cx="256" cy="256" r="190" stroke="#00E5B9" stroke-width="1.5" stroke-opacity="0.12" stroke-dasharray="8 6" />

  <!-- 3. Medical Cross (Centered at 256, 256. Span: 106 to 406. Total width: 300, arm width: 104) -->
  <!-- Cross Path with perfectly rounded organic corners -->
  <g filter="url(#crossShadow)">
    <path
      d="
        M 204 104
        C 204 90.7, 214.7 80, 228 80
        L 284 80
        C 297.3 80, 308 90.7, 308 104
        L 308 204
        L 408 204
        C 421.3 204, 432 214.7, 432 228
        L 432 284
        C 432 297.3, 421.3 308, 408 308
        L 308 308
        L 308 408
        C 308 421.3, 297.3 432, 284 432
        L 228 432
        C 214.7 432, 204 421.3, 204 408
        L 204 308
        L 104 308
        C 90.7 308, 80 297.3, 80 284
        L 80 228
        C 80 214.7, 90.7 204, 104 204
        L 204 204
        Z
      "
      fill="url(#crossGrad)"
    />

    <!-- Bevel highlight over cross -->
    <path
      d="
        M 204 104
        C 204 90.7, 214.7 80, 228 80
        L 284 80
        C 297.3 80, 308 90.7, 308 104
        L 308 204
        L 408 204
        C 421.3 204, 432 214.7, 432 228
        L 432 284
        C 432 297.3, 421.3 308, 408 308
        L 308 308
        L 308 408
        C 308 421.3, 297.3 432, 284 432
        L 228 432
        C 214.7 432, 204 421.3, 204 408
        L 204 308
        L 104 308
        C 90.7 308, 80 297.3, 80 284
        L 80 228
        C 80 214.7, 90.7 204, 104 204
        L 204 204
        Z
      "
      fill="url(#crossBevel)"
    />

    <!-- Elegant subtle border line -->
    <path
      d="
        M 204 104
        C 204 90.7, 214.7 80, 228 80
        L 284 80
        C 297.3 80, 308 90.7, 308 104
        L 308 204
        L 408 204
        C 421.3 204, 432 214.7, 432 228
        L 432 284
        C 432 297.3, 421.3 308, 408 308
        L 308 308
        L 308 408
        C 308 421.3, 297.3 432, 284 432
        L 228 432
        C 214.7 432, 204 421.3, 204 408
        L 204 308
        L 104 308
        C 90.7 308, 80 297.3, 80 284
        L 80 228
        C 80 214.7, 90.7 204, 104 204
        L 204 204
        Z
      "
      fill="none"
      stroke="#FFFFFF"
      stroke-width="3"
      stroke-opacity="0.3"
    />
  </g>

  <!-- 4. Prescription Document Card (Centered inside the cross) -->
  <g filter="url(#docShadow)">
    <!-- Main Sheet (Width: 154, Height: 194. X: 179, Y: 159) with folded top-right corner -->
    <path
      d="
        M 195 159
        L 297 159
        L 333 195
        L 333 337
        C 333 345.8, 325.8 353, 317 353
        L 195 353
        C 186.2 353, 179 345.8, 179 337
        L 179 175
        C 179 166.2, 186.2 159, 195 159
        Z
      "
      fill="#FFFFFF"
    />

    <!-- Dogear folded triangle with shadow -->
    <path
      d="M 297 159 L 297 195 L 333 195 Z"
      fill="url(#foldGrad)"
    />
    <path
      d="M 297 159 L 297 195 L 333 195"
      fill="none"
      stroke="#64748B"
      stroke-width="2"
      stroke-linejoin="round"
    />

    <!-- Document Header Rx / Clinical Accent Bar -->
    <rect x="203" y="185" width="46" height="8" rx="4" fill="#00CFA2" />

    <!-- Document Prescription Text Lines -->
    <rect x="203" y="211" width="94" height="9" rx="4.5" fill="#1E293B" />
    <rect x="203" y="235" width="108" height="9" rx="4.5" fill="#334155" />
    <rect x="203" y="259" width="76" height="9" rx="4.5" fill="#64748B" />
    <rect x="203" y="283" width="98" height="7" rx="3.5" fill="#94A3B8" />

    <!-- Document Checkmark badge icon -->
    <circle cx="295" cy="305" r="16" fill="#0D9488" />
    <path d="M 288 305 L 293 310 L 302 300" fill="none" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
  </g>

  <!-- 5. 3D Pharmaceutical Capsule Pill (Overlapping lower right) -->
  <g transform="translate(290, 316) rotate(-28)" filter="url(#capsuleShadow)">
    <!-- Pill Base Container: Width 110, Height 46, rx 23 -->
    <g>
      <!-- Left Half (Teal) -->
      <path
        d="
          M 23 0
          L 55 0
          L 55 46
          L 23 46
          C 10.3 46, 0 35.7, 0 23
          C 0 10.3, 10.3 0, 23 0
          Z
        "
        fill="url(#capTeal)"
      />

      <!-- Right Half (Coral Red) -->
      <path
        d="
          M 55 0
          L 87 0
          C 99.7 0, 110 10.3, 110 23
          C 110 35.7, 99.7 46, 87 46
          L 55 46
          Z
        "
        fill="url(#capCoral)"
      />

      <!-- Center Joint Ring -->
      <line x1="55" y1="0" x2="55" y2="46" stroke="#040912" stroke-width="3" stroke-opacity="0.35" />
      <line x1="54" y1="0" x2="54" y2="46" stroke="#FFFFFF" stroke-width="1.5" stroke-opacity="0.4" />

      <!-- Outer Pill Contour -->
      <rect x="0" y="0" width="110" height="46" rx="23" fill="none" stroke="#FFFFFF" stroke-width="2.5" stroke-opacity="0.4" />

      <!-- Top Gloss / Specular Sheen (Curved highlight) -->
      <path
        d="
          M 22 7
          L 88 7
          C 96 7, 100 12, 97 15
          C 94 18, 86 15, 80 15
          L 30 15
          C 24 15, 16 18, 13 15
          C 10 12, 14 7, 22 7
          Z
        "
        fill="#FFFFFF"
        fill-opacity="0.65"
      />
    </g>
  </g>
</svg>
`;

async function generate() {
  const publicDir = path.join(__dirname, '..', 'public');

  console.log('Rendering high-res icons from vector design...');

  // 1. icon-512.png
  await sharp(Buffer.from(svgIcon))
    .resize(512, 512)
    .png({ quality: 100, compressionLevel: 9 })
    .toFile(path.join(publicDir, 'icon-512.png'));
  console.log('✓ Generated icon-512.png');

  // 2. icon-192.png
  await sharp(Buffer.from(svgIcon))
    .resize(192, 192)
    .png({ quality: 100, compressionLevel: 9 })
    .toFile(path.join(publicDir, 'icon-192.png'));
  console.log('✓ Generated icon-192.png');

  // 3. apple-touch-icon.png (180x180)
  await sharp(Buffer.from(svgIcon))
    .resize(180, 180)
    .png({ quality: 100, compressionLevel: 9 })
    .toFile(path.join(publicDir, 'apple-touch-icon.png'));
  console.log('✓ Generated apple-touch-icon.png');

  // 4. favicon-32x32.png (32x32)
  await sharp(Buffer.from(svgIcon))
    .resize(32, 32)
    .png({ quality: 100 })
    .toFile(path.join(publicDir, 'favicon-32x32.png'));
  console.log('✓ Generated favicon-32x32.png');

  // 5. favicon.ico / public/favicon.svg
  fs.writeFileSync(path.join(publicDir, 'favicon.svg'), svgIcon.trim());
  console.log('✓ Generated favicon.svg');

  console.log('All icons generated successfully!');
}

generate().catch(err => {
  console.error('Error generating icons:', err);
  process.exit(1);
});
