/**
 * Fix all HTML pages:
 * 1. Restore EXACT original Stitch font sizes and weights
 * 2. Remove the max-w-7xl 100% override - use a wider max-width instead
 * 3. Reduce side padding from lg:px-12 to lg:px-8 for tighter layout
 * 4. Keep the Stitch theme colors intact
 */

const fs = require('fs');
const path = require('path');

const htmlDir = path.join(__dirname, '..');
const htmlFiles = fs.readdirSync(htmlDir)
  .filter(f => f.endsWith('.html'));

console.log(`Found ${htmlFiles.length} HTML files to process.`);

// The ORIGINAL Stitch font sizes (from raw_screens/787dc63e65c84cdd86c318fa68b49a3b.html)
const originalFontSizes = `"fontSize": { "headline-lg": [ "2.5rem", { "lineHeight": "1.2", "letterSpacing": "-0.015em", "fontWeight": "400" } ], "tabular-data": [ "0.875rem", { "lineHeight": "1.4", "fontWeight": "500" } ], "title": [ "1.125rem", { "lineHeight": "1.5", "letterSpacing": "-0.01em", "fontWeight": "600" } ], "headline-lg-mobile": [ "1.875rem", { "lineHeight": "1.25", "letterSpacing": "-0.01em", "fontWeight": "400" } ], "body-md": [ "0.9375rem", { "lineHeight": "1.6", "fontWeight": "400" } ], "headline-md": [ "1.75rem", { "lineHeight": "1.3", "fontWeight": "500" } ], "body-lg": [ "1.0625rem", { "lineHeight": "1.65", "fontWeight": "400" } ], "headline-sm": [ "1.25rem", { "lineHeight": "1.4", "fontWeight": "500" } ], "body-sm": [ "0.8125rem", { "lineHeight": "1.5", "fontWeight": "400" } ], "display": [ "3.5rem", { "lineHeight": "1.15", "letterSpacing": "-0.02em", "fontWeight": "400" } ], "label-caps": [ "0.6875rem", { "lineHeight": "1.4", "letterSpacing": "0.08em", "fontWeight": "600" } ] }`;

// The INFLATED font sizes currently in the file
const inflatedFontSizes = `"fontSize": { "headline-lg": [ "2.75rem", { "lineHeight": "1.2", "letterSpacing": "-0.015em", "fontWeight": "500" } ], "tabular-data": [ "0.95rem", { "lineHeight": "1.45", "fontWeight": "500" } ], "title": [ "1.25rem", { "lineHeight": "1.45", "letterSpacing": "-0.01em", "fontWeight": "600" } ], "headline-lg-mobile": [ "2rem", { "lineHeight": "1.25", "letterSpacing": "-0.01em", "fontWeight": "500" } ], "body-md": [ "1.0625rem", { "lineHeight": "1.65", "fontWeight": "400" } ], "headline-md": [ "2rem", { "lineHeight": "1.3", "fontWeight": "500" } ], "body-lg": [ "1.1875rem", { "lineHeight": "1.65", "fontWeight": "400" } ], "headline-sm": [ "1.375rem", { "lineHeight": "1.4", "fontWeight": "600" } ], "body-sm": [ "0.9375rem", { "lineHeight": "1.5", "fontWeight": "400" } ], "display": [ "3.75rem", { "lineHeight": "1.15", "letterSpacing": "-0.02em", "fontWeight": "500" } ], "label-caps": [ "0.8125rem", { "lineHeight": "1.4", "letterSpacing": "0.08em", "fontWeight": "600" } ] }`;

let totalChanges = 0;

for (const file of htmlFiles) {
  const filePath = path.join(htmlDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  const originalContent = content;
  let changes = 0;

  // 1. Restore original Stitch font sizes
  if (content.includes(inflatedFontSizes)) {
    content = content.replace(inflatedFontSizes, originalFontSizes);
    changes++;
    console.log(`  [${file}] Restored original Stitch font sizes`);
  }

  // 2. Fix the max-w-7xl override - use max-w-[1440px] for wider content
  // Replace: .max-w-7xl{max-width:100%!important;width:100%!important;}
  // With: .max-w-7xl{max-width:1440px!important;}
  const oldMaxW = '.max-w-7xl{max-width:100%!important;width:100%!important;}';
  const newMaxW = '.max-w-7xl{max-width:1440px!important;}';
  if (content.includes(oldMaxW)) {
    content = content.replace(oldMaxW, newMaxW);
    changes++;
    console.log(`  [${file}] Fixed max-w-7xl to 1440px`);
  }

  // 3. Reduce side padding: lg:px-12 → lg:px-8
  const px12Count = (content.match(/lg:px-12/g) || []).length;
  if (px12Count > 0) {
    content = content.replace(/lg:px-12/g, 'lg:px-8');
    changes += px12Count;
    console.log(`  [${file}] Reduced ${px12Count} instances of lg:px-12 → lg:px-8`);
  }

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    totalChanges += changes;
    console.log(`  [${file}] ✓ Saved (${changes} changes)\n`);
  } else {
    console.log(`  [${file}] No changes needed\n`);
  }
}

console.log(`\nDone! Total changes across all files: ${totalChanges}`);
