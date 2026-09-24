/**
 * Aggressively increase ALL font sizes ~30-40% from original Stitch.
 * Also catch hardcoded small pixel sizes in inline classes.
 * Keep same weights to preserve the vibe.
 */

const fs = require('fs');
const path = require('path');

const htmlDir = path.join(__dirname, '..');
const htmlFiles = fs.readdirSync(htmlDir).filter(f => f.endsWith('.html') && !f.startsWith('raw'));

console.log(`Processing ${htmlFiles.length} HTML files...\n`);

// Current scaled font sizes (from last run)
const currentFontSizes = `"fontSize": { "headline-lg": [ "2.875rem", { "lineHeight": "1.2", "letterSpacing": "-0.015em", "fontWeight": "400" } ], "tabular-data": [ "1rem", { "lineHeight": "1.4", "fontWeight": "500" } ], "title": [ "1.25rem", { "lineHeight": "1.5", "letterSpacing": "-0.01em", "fontWeight": "600" } ], "headline-lg-mobile": [ "2.125rem", { "lineHeight": "1.25", "letterSpacing": "-0.01em", "fontWeight": "400" } ], "body-md": [ "1.0625rem", { "lineHeight": "1.6", "fontWeight": "400" } ], "headline-md": [ "2rem", { "lineHeight": "1.3", "fontWeight": "500" } ], "body-lg": [ "1.1875rem", { "lineHeight": "1.65", "fontWeight": "400" } ], "headline-sm": [ "1.375rem", { "lineHeight": "1.4", "fontWeight": "500" } ], "body-sm": [ "0.9375rem", { "lineHeight": "1.5", "fontWeight": "400" } ], "display": [ "4rem", { "lineHeight": "1.15", "letterSpacing": "-0.02em", "fontWeight": "400" } ], "label-caps": [ "0.75rem", { "lineHeight": "1.4", "letterSpacing": "0.08em", "fontWeight": "600" } ] }`;

// Much bigger sizes (~35% up from original Stitch), same weights
const bigFontSizes = `"fontSize": { "headline-lg": [ "3.5rem", { "lineHeight": "1.15", "letterSpacing": "-0.02em", "fontWeight": "400" } ], "tabular-data": [ "1.125rem", { "lineHeight": "1.4", "fontWeight": "500" } ], "title": [ "1.5rem", { "lineHeight": "1.45", "letterSpacing": "-0.01em", "fontWeight": "600" } ], "headline-lg-mobile": [ "2.75rem", { "lineHeight": "1.2", "letterSpacing": "-0.015em", "fontWeight": "400" } ], "body-md": [ "1.1875rem", { "lineHeight": "1.65", "fontWeight": "400" } ], "headline-md": [ "2.5rem", { "lineHeight": "1.25", "fontWeight": "500" } ], "body-lg": [ "1.375rem", { "lineHeight": "1.6", "fontWeight": "400" } ], "headline-sm": [ "1.75rem", { "lineHeight": "1.35", "fontWeight": "500" } ], "body-sm": [ "1.0625rem", { "lineHeight": "1.55", "fontWeight": "400" } ], "display": [ "5rem", { "lineHeight": "1.1", "letterSpacing": "-0.025em", "fontWeight": "400" } ], "label-caps": [ "0.875rem", { "lineHeight": "1.4", "letterSpacing": "0.07em", "fontWeight": "600" } ] }`;

let totalChanges = 0;

for (const file of htmlFiles) {
  const filePath = path.join(htmlDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  const original = content;
  let changes = [];

  // 1. Replace tailwind config font sizes
  if (content.includes(currentFontSizes)) {
    content = content.replace(currentFontSizes, bigFontSizes);
    changes.push('Font sizes scaled up ~35% (display: 5rem, body-md: 1.1875rem, etc.)');
  }

  // 2. Fix hardcoded tiny pixel sizes scattered in HTML classes
  // text-[9px] → text-[12px]
  const t9 = (content.match(/text-\[9px\]/g) || []).length;
  if (t9 > 0) {
    content = content.replace(/text-\[9px\]/g, 'text-[12px]');
    changes.push(`${t9}x text-[9px] → text-[12px]`);
  }

  // text-[10px] → text-[13px]
  const t10 = (content.match(/text-\[10px\]/g) || []).length;
  if (t10 > 0) {
    content = content.replace(/text-\[10px\]/g, 'text-[13px]');
    changes.push(`${t10}x text-[10px] → text-[13px]`);
  }

  // text-[12px] (that were originally 12px, not converted from 9px) → text-[14px]
  // Actually skip this - the 9px ones just became 12px. Let's leave those.

  // text-xs (12px) → text-sm (14px)  
  const txs = (content.match(/\btext-xs\b/g) || []).length;
  if (txs > 0) {
    content = content.replace(/\btext-xs\b/g, 'text-sm');
    changes.push(`${txs}x text-xs → text-sm`);
  }

  // text-sm (14px) → text-base (16px) — but be careful not to replace text-sm that's part of other things
  // Actually the site uses text-body-sm etc, text-sm is material icons size — leave those alone

  // 3. Increase material icon sizes: text-sm → text-base for icons, text-2xl → text-3xl
  // Material icons use text-[18px] — bump to text-[22px]
  const mi18 = (content.match(/text-\[18px\]/g) || []).length;
  if (mi18 > 0) {
    content = content.replace(/text-\[18px\]/g, 'text-[22px]');
    changes.push(`${mi18}x icon text-[18px] → text-[22px]`);
  }

  // Material icons text-2xl → text-3xl
  const i2xl = (content.match(/material-symbols-outlined text-primary mb-4 text-2xl/g) || []).length;
  if (i2xl > 0) {
    content = content.replace(/material-symbols-outlined text-primary mb-4 text-2xl/g, 
      'material-symbols-outlined text-primary mb-4 text-3xl');
    changes.push(`${i2xl}x section icons text-2xl → text-3xl`);
  }

  // 4. Increase card/panel padding: p-6 → p-8 (in feature cards)
  // Target cards with border-border-light
  const p6cards = (content.match(/p-6 bg-surface border border-border-light/g) || []).length;
  if (p6cards > 0) {
    content = content.replace(/p-6 bg-surface border border-border-light/g,
      'p-8 bg-surface border border-border-light');
    changes.push(`${p6cards}x card padding p-6 → p-8`);
  }

  // 5. Increase service panel padding: p-8 lg:p-10 → p-10 lg:p-12
  const spCount = (content.match(/p-8 lg:p-10/g) || []).length;
  if (spCount > 0) {
    content = content.replace(/p-8 lg:p-10/g, 'p-10 lg:p-14');
    changes.push(`${spCount}x service panel padding p-8/p-10 → p-10/p-14`);
  }

  // 6. Blockquote inner padding: p-8 lg:p-12 → p-10 lg:p-14
  const bqCount = (content.match(/p-8 lg:p-12/g) || []).length;
  if (bqCount > 0) {
    content = content.replace(/p-8 lg:p-12/g, 'p-10 lg:p-16');
    changes.push(`${bqCount}x quote block padding → p-10/p-16`);
  }

  // 7. Increase footer logo: h-8 in footer → h-10
  if (content.includes('class="h-8 w-auto object-contain" src="assets/images/logo.png"')) {
    content = content.replace(
      'class="h-8 w-auto object-contain" src="assets/images/logo.png"',
      'class="h-10 w-auto object-contain" src="assets/images/logo.png"'
    );
    changes.push('Footer logo h-8 → h-10');
  }

  // 8. Make the header logo even bigger: h-10 → h-12 
  if (content.includes('class="h-10 w-auto object-contain" src="assets/images/logo-icon.svg"')) {
    content = content.replace(
      'class="h-10 w-auto object-contain" src="assets/images/logo-icon.svg"',
      'class="h-12 w-auto object-contain" src="assets/images/logo-icon.svg"'
    );
    changes.push('Header logo h-10 → h-12');
  }

  // 9. Increase nav link gap: gap-space-lg → gap-8 for more breathing room
  if (content.includes('items-center gap-space-lg h-full" data-active')) {
    content = content.replace(
      'items-center gap-space-lg h-full" data-active',
      'items-center gap-8 h-full" data-active'
    );
    changes.push('Nav link gap increased');
  }

  // 10. Make the header even taller: h-[5.5rem] → h-24
  if (content.includes('"h-[5.5rem] border-b border-border-light"')) {
    content = content.replace('"h-[5.5rem] border-b border-border-light"', '"h-24 border-b border-border-light"');
    changes.push('Header height h-[5.5rem] → h-24');
  }

  // 11. Update pt offset for taller header: pt-[116px] → pt-[140px]
  if (content.includes('pt-[116px]')) {
    content = content.replace(/pt-\[116px\]/g, 'pt-[140px]');
    changes.push('Main content top padding adjusted for taller header');
  }
  if (content.includes('min-h-[calc(100vh-116px)]')) {
    content = content.replace(/min-h-\[calc\(100vh-116px\)\]/g, 'min-h-[calc(100vh-140px)]');
    changes.push('Min-height adjusted for taller header');
  }

  // 12. Person icon in header: w-8 h-8 → w-10 h-10
  if (content.includes('class="w-8 h-8 rounded-full bg-primary')) {
    content = content.replace('class="w-8 h-8 rounded-full bg-primary', 'class="w-10 h-10 rounded-full bg-primary');
    changes.push('Profile icon w-8/h-8 → w-10/h-10');
  }

  // 13. Increase the top bar height: h-9 → h-10
  if (content.includes('h-9 flex items-center justify-between')) {
    content = content.replace('h-9 flex items-center justify-between', 'h-10 flex items-center justify-between');
    changes.push('Top bar height h-9 → h-10');
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

console.log(`\nDone! ${totalChanges} total changes.`);
