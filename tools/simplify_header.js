/**
 * Simplify header across ALL pages:
 * 1. Remove top utility bar (phone, GST, UDYAM strip)
 * 2. Remove credential strip section (CONFIDENTIAL INQUIRY DESK)
 * 3. Use new handshake logo
 * 4. Remove profile circle icon
 * 5. Fix top padding offset for shorter header
 */

const fs = require('fs');
const path = require('path');

const htmlDir = path.join(__dirname, '..');
const htmlFiles = fs.readdirSync(htmlDir).filter(f => f.endsWith('.html') && !f.startsWith('raw'));

console.log(`Processing ${htmlFiles.length} HTML files...\n`);

let totalChanges = 0;

for (const file of htmlFiles) {
  const filePath = path.join(htmlDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  const original = content;
  let changes = [];

  // 1. Remove the top utility bar: the entire div with phone/GST/UDYAM
  // Pattern: <div class="bg-surface-container-low border-b border-border-light text-on-surface-variant font-label-caps text-label-caps">.....</div>
  // This is the first child div inside <header>
  const topBarRegex = /<div class="bg-surface-container-low border-b border-border-light text-on-surface-variant font-label-caps text-label-caps"><div class="max-w-7xl mx-auto px-6 lg:px-8 h-10 flex items-center justify-between">.*?<\/div><\/div>/;
  if (topBarRegex.test(content)) {
    content = content.replace(topBarRegex, '');
    changes.push('Removed top utility bar (phone/GST/UDYAM)');
  }

  // 2. Remove the credential strip section (CONFIDENTIAL INQUIRY DESK)
  // This is the first <section> inside <main> with text like "CONFIDENTIAL INQUIRY DESK"
  const credStripRegex = /<!-- Top Statutory & Credential Strip -->\s*<section class="w-full bg-surface-container-low border-b border-border-light py-2 px-6 lg:px-8">[\s\S]*?<\/section>/;
  if (credStripRegex.test(content)) {
    content = content.replace(credStripRegex, '');
    changes.push('Removed credential strip section');
  }

  // 3. Replace old logo with new handshake logo
  // Old: <img ... src="assets/images/logo-icon.svg"/>
  // New: <img ... src="assets/images/logo-handshake.jpg"/>
  if (content.includes('src="assets/images/logo-icon.svg"')) {
    content = content.replace(
      /class="h-12 w-auto object-contain" src="assets\/images\/logo-icon\.svg"/g,
      'class="h-14 w-auto object-contain" src="assets/images/logo-handshake.jpg"'
    );
    changes.push('Swapped to new handshake logo (h-14)');
  }

  // 4. Remove profile circle icon (the person avatar next to CTA button)
  // Pattern: <div class="w-10 h-10 rounded-full bg-primary ...">..person..</div>
  const profileIconRegex = /<div class="w-10 h-10 rounded-full bg-primary flex items-center justify-center"><span class="material-symbols-outlined text-on-primary text-\[22px\]">person<\/span><\/div>/g;
  if (profileIconRegex.test(content)) {
    content = content.replace(profileIconRegex, '');
    changes.push('Removed profile circle icon');
  }

  // 5. Fix top padding: header is now just h-24 (96px) without the top bar (h-10 = 40px gone)
  // So pt-[140px] → pt-[96px] and min-h calc adjusts too
  if (content.includes('pt-[140px]')) {
    content = content.replace(/pt-\[140px\]/g, 'pt-[96px]');
    changes.push('Adjusted top padding 140px → 96px');
  }
  if (content.includes('min-h-[calc(100vh-140px)]')) {
    content = content.replace(/min-h-\[calc\(100vh-140px\)\]/g, 'min-h-[calc(100vh-96px)]');
    changes.push('Adjusted min-height calc');
  }

  // 6. Clean up: remove the border-b from header navbar div since top bar is gone
  // The header nav div had "h-24 border-b border-border-light" — keep border-b for subtle shadow

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
