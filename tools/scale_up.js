/**
 * Scale up all elements proportionally (~12-15%) to fill empty space:
 * - Font sizes: scaled up but KEEP original Stitch font weights (400 for display/headlines)
 * - Max-width: 1440px → 1600px for wider content spread
 * - Section padding: increase vertical padding
 * - Image containers: increase aspect ratios / sizes
 * - Grid gaps: increase slightly
 * 
 * KEY: Keep same font weights as original Stitch (the "vibe"), just make everything bigger
 */

const fs = require('fs');
const path = require('path');

const htmlDir = path.join(__dirname, '..');
const htmlFiles = fs.readdirSync(htmlDir).filter(f => f.endsWith('.html') && !f.startsWith('raw'));

console.log(`Processing ${htmlFiles.length} HTML files...\n`);

// Current (original Stitch) font sizes
const currentFontSizes = `"fontSize": { "headline-lg": [ "2.5rem", { "lineHeight": "1.2", "letterSpacing": "-0.015em", "fontWeight": "400" } ], "tabular-data": [ "0.875rem", { "lineHeight": "1.4", "fontWeight": "500" } ], "title": [ "1.125rem", { "lineHeight": "1.5", "letterSpacing": "-0.01em", "fontWeight": "600" } ], "headline-lg-mobile": [ "1.875rem", { "lineHeight": "1.25", "letterSpacing": "-0.01em", "fontWeight": "400" } ], "body-md": [ "0.9375rem", { "lineHeight": "1.6", "fontWeight": "400" } ], "headline-md": [ "1.75rem", { "lineHeight": "1.3", "fontWeight": "500" } ], "body-lg": [ "1.0625rem", { "lineHeight": "1.65", "fontWeight": "400" } ], "headline-sm": [ "1.25rem", { "lineHeight": "1.4", "fontWeight": "500" } ], "body-sm": [ "0.8125rem", { "lineHeight": "1.5", "fontWeight": "400" } ], "display": [ "3.5rem", { "lineHeight": "1.15", "letterSpacing": "-0.02em", "fontWeight": "400" } ], "label-caps": [ "0.6875rem", { "lineHeight": "1.4", "letterSpacing": "0.08em", "fontWeight": "600" } ] }`;

// Scaled up ~12-15% but SAME weights as original Stitch
const scaledFontSizes = `"fontSize": { "headline-lg": [ "2.875rem", { "lineHeight": "1.2", "letterSpacing": "-0.015em", "fontWeight": "400" } ], "tabular-data": [ "1rem", { "lineHeight": "1.4", "fontWeight": "500" } ], "title": [ "1.25rem", { "lineHeight": "1.5", "letterSpacing": "-0.01em", "fontWeight": "600" } ], "headline-lg-mobile": [ "2.125rem", { "lineHeight": "1.25", "letterSpacing": "-0.01em", "fontWeight": "400" } ], "body-md": [ "1.0625rem", { "lineHeight": "1.6", "fontWeight": "400" } ], "headline-md": [ "2rem", { "lineHeight": "1.3", "fontWeight": "500" } ], "body-lg": [ "1.1875rem", { "lineHeight": "1.65", "fontWeight": "400" } ], "headline-sm": [ "1.375rem", { "lineHeight": "1.4", "fontWeight": "500" } ], "body-sm": [ "0.9375rem", { "lineHeight": "1.5", "fontWeight": "400" } ], "display": [ "4rem", { "lineHeight": "1.15", "letterSpacing": "-0.02em", "fontWeight": "400" } ], "label-caps": [ "0.75rem", { "lineHeight": "1.4", "letterSpacing": "0.08em", "fontWeight": "600" } ] }`;

let totalChanges = 0;

for (const file of htmlFiles) {
  const filePath = path.join(htmlDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  const original = content;
  let changes = [];

  // 1. Scale font sizes (keep original weights!)
  if (content.includes(currentFontSizes)) {
    content = content.replace(currentFontSizes, scaledFontSizes);
    changes.push('Scaled font sizes up ~12-15% (kept original weights)');
  }

  // 2. Widen max-width: 1440px → 1600px
  if (content.includes('max-w-7xl{max-width:1440px!important;}')) {
    content = content.replace(
      'max-w-7xl{max-width:1440px!important;}',
      'max-w-7xl{max-width:1600px!important;}'
    );
    changes.push('Widened max-width 1440→1600px');
  }

  // 3. Increase section vertical padding: py-space-xl → py-14 on desktop sections
  //    py-space-xl is 2.5rem (40px). Let's make it py-16 (4rem = 64px) on lg
  //    Replace: py-space-xl → py-space-xl lg:py-16
  const pyCount = (content.match(/py-space-xl(?!\s+lg:py)/g) || []).length;
  if (pyCount > 0) {
    content = content.replace(/py-space-xl(?!\s+lg:py)/g, 'py-space-xl lg:py-16');
    changes.push(`Boosted ${pyCount} section paddings (added lg:py-16)`);
  }

  // 4. Increase hero vertical padding: lg:py-24 → lg:py-28
  if (content.includes('lg:py-24')) {
    content = content.replace(/lg:py-24/g, 'lg:py-28');
    changes.push('Increased hero padding lg:py-24 → lg:py-28');
  }

  // 5. Increase grid gaps: gap-12 → gap-14, gap-16 → gap-20
  const gap12Count = (content.match(/\bgap-12\b/g) || []).length;
  if (gap12Count > 0) {
    content = content.replace(/\bgap-12\b/g, 'gap-14');
    changes.push(`Increased ${gap12Count} gap-12 → gap-14`);
  }
  const lgGap16Count = (content.match(/lg:gap-16/g) || []).length;
  if (lgGap16Count > 0) {
    content = content.replace(/lg:gap-16/g, 'lg:gap-20');
    changes.push(`Increased ${lgGap16Count} lg:gap-16 → lg:gap-20`);
  }

  // 6. Make hero images taller: aspect-[4/5] → aspect-[3/4], aspect-[3/4] → aspect-[2/3]
  if (content.includes('aspect-[4/5]')) {
    content = content.replace(/aspect-\[4\/5\]/g, 'aspect-[3/4]');
    changes.push('Made hero images taller (4/5 → 3/4 aspect)');
  }

  // 7. Increase spacing tokens in tailwind config
  //    space-xl: 2.5rem → 3rem, space-lg: 1.5rem → 2rem, margin: 3rem → 3.5rem
  if (content.includes('"space-xl": "2.5rem"')) {
    content = content.replace('"space-xl": "2.5rem"', '"space-xl": "3rem"');
    content = content.replace('"space-lg": "1.5rem"', '"space-lg": "1.75rem"');
    content = content.replace('"margin": "3rem"', '"margin": "3.5rem"');
    content = content.replace('"space-md": "1rem"', '"space-md": "1.125rem"');
    changes.push('Increased spacing tokens (space-xl: 3rem, space-lg: 1.75rem)');
  }

  // 8. Make logo slightly bigger: h-8 → h-10 (in header logo only)
  if (content.includes('class="h-8 w-auto object-contain" src="assets/images/logo-icon.svg"')) {
    content = content.replace(
      'class="h-8 w-auto object-contain" src="assets/images/logo-icon.svg"',
      'class="h-10 w-auto object-contain" src="assets/images/logo-icon.svg"'
    );
    changes.push('Increased header logo size h-8 → h-10');
  }

  // 9. Increase metric card numbers: text-headline-lg → text-display for stat numbers
  // Make stat numbers pop more
  if (content.includes('text-headline-lg text-primary font-semibold block leading-none mb-2')) {
    content = content.replace(
      /text-headline-lg text-primary font-semibold block leading-none mb-2/g,
      'text-display text-primary font-semibold block leading-none mb-2'
    );
    changes.push('Made stat numbers bigger (headline-lg → display)');
  }

  // 10. Increase button padding: px-7 py-3.5 → px-8 py-4
  if (content.includes('px-7 py-3.5')) {
    content = content.replace(/px-7 py-3\.5/g, 'px-8 py-4');
    changes.push('Increased button padding px-7 py-3.5 → px-8 py-4');
  }

  // 11. Increase table cell padding: p-4 → p-5
  const p4InTable = (content.match(/class="p-4 font-/g) || []).length;
  if (p4InTable > 0) {
    content = content.replace(/class="p-4 font-title/g, 'class="p-5 font-title');
    content = content.replace(/class="p-4 font-label/g, 'class="p-5 font-label');
    changes.push('Increased table cell padding p-4 → p-5');
  }

  // 12. Make header taller: h-20 → h-[5.5rem]
  if (content.includes('"h-20 border-b border-border-light"')) {
    content = content.replace('"h-20 border-b border-border-light"', '"h-[5.5rem] border-b border-border-light"');
    changes.push('Made header taller h-20 → h-[5.5rem]');
  }

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    totalChanges += changes.length;
    console.log(`[${file}]`);
    changes.forEach(c => console.log(`  ✓ ${c}`));
    console.log('');
  } else {
    console.log(`[${file}] No changes\n`);
  }
}

console.log(`Done! ${totalChanges} total changes applied.`);
