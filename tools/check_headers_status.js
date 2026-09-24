const fs = require('fs');
const path = require('path');

const htmlDir = path.join(__dirname, '..');
const htmlFiles = fs.readdirSync(htmlDir).filter(f => f.endsWith('.html') && !f.startsWith('raw'));

console.log('Inspecting header and footer across all HTML files:\n');

for (const file of htmlFiles) {
  const filePath = path.join(htmlDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  const hasBrokenDiv = content.includes('"></div><div class="h-24');
  const hasTopBar = content.includes('GST: 24ASYPP8990J1ZJ') && content.includes('bg-surface-container-low border-b');
  const hasCredStrip = content.includes('CONFIDENTIAL INQUIRY DESK') && content.includes('REGIONAL DOSSIER');
  const hasProfileIcon = content.includes('person</span></div>');
  const headerLogoHandshakePng = content.includes('src="assets/images/logo-handshake.png"');
  const footerLogoOld = content.includes('src="assets/images/logo.png"');
  const logoCount = (content.match(/logo-handshake\.png/g) || []).length;
  
  console.log(`[${file}]:`);
  console.log(`  Broken header div tag: ${hasBrokenDiv}`);
  console.log(`  Has top utility bar: ${hasTopBar}`);
  console.log(`  Has credential ticker strip: ${hasCredStrip}`);
  console.log(`  Has profile circle icon: ${hasProfileIcon}`);
  console.log(`  Handshake logo count (header/footer/mobile): ${logoCount}`);
  console.log(`  Footer has old logo.png: ${footerLogoOld}`);
}
