const fs = require('fs');

const files = [
  'index.html',
  'about-us.html',
  'insurance-claims-investigation.html',
  'employee-background-verification.html',
  'our-approach.html',
  'technology-compliance.html',
  'contact-us.html',
  'privacy-policy.html',
  'terms-of-service.html',
  '404.html'
];

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  
  // Replace max-w-7xl mx-auto with w-full
  content = content.replace(/max-w-7xl mx-auto/g, 'w-full');
  
  // Also on privacy, terms, 404 replace max-w-4xl mx-auto with w-full
  content = content.replace(/max-w-4xl mx-auto/g, 'w-full');

  // Replace max-w-7xl without mx-auto if any
  content = content.replace(/max-w-7xl/g, 'w-full');

  fs.writeFileSync(file, content, 'utf8');
  console.log(`Updated ${file}`);
}

console.log('All files updated to full width (no huge side margins)!');
