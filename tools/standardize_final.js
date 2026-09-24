/**
 * Final Standardization Script for Trustline Website
 * 
 * 1. Fix broken header tags ("></div><div class="h-24" -> "><div class="h-24")
 * 2. Use transparent handshake logo (assets/images/logo-handshake.png) in header & footer
 * 3. Wrap header logo in <a href="index.html"> on all pages
 * 4. Ensure no extra clutter: no top utility bar, no credential ticker strip, no user avatar
 * 5. Update footer logo to transparent handshake logo across all pages
 * 6. Align tailwind typography & max-width across all pages
 */

const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const htmlFiles = fs.readdirSync(rootDir).filter(f => f.endsWith('.html') && !f.startsWith('raw'));

console.log(`Processing ${htmlFiles.length} HTML files...\n`);

const standardBigFontConfig = `"fontSize": { "headline-lg": [ "3.5rem", { "lineHeight": "1.15", "letterSpacing": "-0.02em", "fontWeight": "400" } ], "tabular-data": [ "1.125rem", { "lineHeight": "1.4", "fontWeight": "500" } ], "title": [ "1.5rem", { "lineHeight": "1.45", "letterSpacing": "-0.01em", "fontWeight": "600" } ], "headline-lg-mobile": [ "2.75rem", { "lineHeight": "1.2", "letterSpacing": "-0.015em", "fontWeight": "400" } ], "body-md": [ "1.1875rem", { "lineHeight": "1.65", "fontWeight": "400" } ], "headline-md": [ "2.5rem", { "lineHeight": "1.25", "fontWeight": "500" } ], "body-lg": [ "1.375rem", { "lineHeight": "1.6", "fontWeight": "400" } ], "headline-sm": [ "1.75rem", { "lineHeight": "1.35", "fontWeight": "500" } ], "body-sm": [ "1.0625rem", { "lineHeight": "1.55", "fontWeight": "400" } ], "display": [ "5rem", { "lineHeight": "1.1", "letterSpacing": "-0.025em", "fontWeight": "400" } ], "label-caps": [ "0.875rem", { "lineHeight": "1.4", "letterSpacing": "0.07em", "fontWeight": "600" } ] }`;

for (const file of htmlFiles) {
  const filePath = path.join(rootDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let changes = [];

  // 1. Fix broken header tag
  if (content.includes('"></div><div class="h-24')) {
    content = content.replace('"></div><div class="h-24', '"><div class="h-24');
    changes.push('Fixed broken header tag (removed stray </div>)');
  }

  // 2. Remove duplicate mobile drawer backdrops if present
  if (content.includes('<div id="mobile-drawer-backdrop" class="fixed inset-0 bg-primary/40 backdrop-blur-sm z-[99] hidden"></div>\n<!-- Mobile Navigation Drawer -->\n<div id="mobile-drawer-backdrop"')) {
    content = content.replace('<div id="mobile-drawer-backdrop" class="fixed inset-0 bg-primary/40 backdrop-blur-sm z-[99] hidden"></div>\n<!-- Mobile Navigation Drawer -->\n<div id="mobile-drawer-backdrop"', '<!-- Mobile Navigation Drawer -->\n<div id="mobile-drawer-backdrop"');
    changes.push('Removed duplicate mobile-drawer-backdrop');
  }

  // 3. Switch logo in header to transparent PNG and wrap in link if not already
  content = content.replace(/src="assets\/images\/logo-handshake\.jpg"/g, 'src="assets/images/logo-handshake.png"');
  content = content.replace(/src="assets\/images\/logo-icon\.svg"/g, 'src="assets/images/logo-handshake.png"');

  // If header logo is a plain div instead of an anchor, convert to anchor
  const headerDivLogo = /<div class="flex items-center gap-space-md shrink-0"><img alt="Trustline Verification Services Official Logomark" class="h-14 w-auto object-contain" src="assets\/images\/logo-handshake\.png"\/><div class="flex flex-col"><span class="font-title text-title tracking-tight text-primary leading-none">Trustline<\/span><span class="font-label-caps text-label-caps text-secondary tracking-widest leading-none mt-1">VERIFICATION SERVICES<\/span><\/div><\/div>/;
  if (headerDivLogo.test(content)) {
    content = content.replace(
      headerDivLogo,
      '<a href="index.html" class="flex items-center gap-space-md shrink-0 hover:opacity-95 transition-opacity"><img alt="Trustline Verification Services Official Logomark" class="h-14 w-auto object-contain" src="assets/images/logo-handshake.png"/><div class="flex flex-col"><span class="font-title text-title tracking-tight text-primary leading-none">Trustline</span><span class="font-label-caps text-label-caps text-secondary tracking-widest leading-none mt-1">VERIFICATION SERVICES</span></div></a>'
    );
    changes.push('Wrapped header logo lockup in <a href="index.html">');
  }

  // 4. Update footer logo to transparent handshake logo
  if (content.includes('src="assets/images/logo.png"')) {
    content = content.replace(/src="assets\/images\/logo\.png"/g, 'src="assets/images/logo-handshake.png"');
    changes.push('Updated footer logo to transparent handshake logo');
  }

  // 5. Ensure max-w-7xl 1600px rule is present in all files
  if (!content.includes('max-width:1600px!important') && !content.includes('max-width: 1600px !important')) {
    if (content.includes('</style>')) {
      content = content.replace('</style>', '.max-w-7xl{max-width:1600px!important;}</style>');
      changes.push('Added max-width:1600px rule to <style>');
    }
  }

  // 6. Ensure fontSize is scaled up in privacy-policy, terms-of-service, 404
  const oldSmallFontRegex = /"fontSize":\s*\{\s*"headline-lg":\s*\[\s*"2\.25rem"[\s\S]*?"label-caps":\s*\[\s*"0\.75rem"[^\]]*\]\s*\}/;
  if (oldSmallFontRegex.test(content)) {
    content = content.replace(oldSmallFontRegex, standardBigFontConfig);
    changes.push('Scaled up typography in tailwind config');
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`[${file}]`);
  if (changes.length > 0) {
    changes.forEach(c => console.log(`  ✓ ${c}`));
  } else {
    console.log(`  (no changes needed)`);
  }
  console.log('');
}

console.log('All files standardized successfully.');
