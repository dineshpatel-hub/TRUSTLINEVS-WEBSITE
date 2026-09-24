const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const htmlFiles = fs.readdirSync(rootDir).filter(f => f.endsWith('.html') && !f.startsWith('raw'));

console.log(`Adding chatbot.js to ${htmlFiles.length} HTML files...\n`);

for (const file of htmlFiles) {
  const filePath = path.join(rootDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  if (!content.includes('assets/js/chatbot.js')) {
    content = content.replace('</body>', '<script src="assets/js/chatbot.js"></script>\n</body>');
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`[${file}] Added chatbot.js`);
  } else {
    console.log(`[${file}] Already has chatbot.js`);
  }
}

console.log('\nFinished updating all pages.');
