const fs = require('fs');

const urlMap = JSON.parse(fs.readFileSync('url_mapping.json', 'utf8'));

const pages = [
  { src: 'raw_screens/787dc63e65c84cdd86c318fa68b49a3b.html', dest: 'index.html' },
  { src: 'raw_screens/8755e0375b344d71a761c8303f6e5851.html', dest: 'about-us.html' },
  { src: 'raw_screens/67bb61a9f2614ab298647039d7efdd5c.html', dest: 'insurance-claims-investigation.html' },
  { src: 'raw_screens/a80ab767f8324552a0449fe18111dce8.html', dest: 'employee-background-verification.html' },
  { src: 'raw_screens/c2bcce96bfae4552ae7756c6d3744c62.html', dest: 'our-approach.html' },
  { src: 'raw_screens/d731564901604796ad8e6965928ce8d9.html', dest: 'technology-compliance.html' },
  { src: 'raw_screens/371469682d5e44e197524c1fded28625.html', dest: 'contact-us.html' }
];

for (const p of pages) {
  let content = fs.readFileSync(p.src, 'utf8');

  // 1. Replace remote Google usercontent image URLs with local downloaded files
  for (const [remoteUrl, localPath] of Object.entries(urlMap)) {
    content = content.split(remoteUrl).join(localPath);
  }

  // 2. Wire navigation links so clicking them works across pages
  content = content
    .replace(/data-path="home"\s+href="#"/g, 'data-path="home" href="index.html"')
    .replace(/data-path="about-us"\s+href="#"/g, 'data-path="about-us" href="about-us.html"')
    .replace(/data-path="insurance-claims-investigation"\s+href="#"/g, 'data-path="insurance-claims-investigation" href="insurance-claims-investigation.html"')
    .replace(/data-path="employee-background-verification"\s+href="#"/g, 'data-path="employee-background-verification" href="employee-background-verification.html"')
    .replace(/data-path="our-approach"\s+href="#"/g, 'data-path="our-approach" href="our-approach.html"')
    .replace(/data-path="technology-compliance"\s+href="#"/g, 'data-path="technology-compliance" href="technology-compliance.html"')
    .replace(/data-path="contact-us"\s+href="#"/g, 'data-path="contact-us" href="contact-us.html"')
    .replace(/data-path="request-consultation"\s+href="#"/g, 'data-path="request-consultation" href="contact-us.html"');

  // Also replace any other href="#" on data-path
  content = content
    .replace(/href="#"(\s+data-path="home")/g, 'href="index.html"$1')
    .replace(/href="#"(\s+data-path="about-us")/g, 'href="about-us.html"$1')
    .replace(/href="#"(\s+data-path="insurance-claims-investigation")/g, 'href="insurance-claims-investigation.html"$1')
    .replace(/href="#"(\s+data-path="employee-background-verification")/g, 'href="employee-background-verification.html"$1')
    .replace(/href="#"(\s+data-path="our-approach")/g, 'href="our-approach.html"$1')
    .replace(/href="#"(\s+data-path="technology-compliance")/g, 'href="technology-compliance.html"$1')
    .replace(/href="#"(\s+data-path="contact-us")/g, 'href="contact-us.html"$1')
    .replace(/href="#"(\s+data-path="request-consultation")/g, 'href="contact-us.html"$1');

  // In index.html, hero buttons
  content = content
    .replace(/href="#core-services"/g, 'href="index.html#core-services"')
    .replace(/href="#leadership-consult"/g, 'href="index.html#leadership-consult"');

  // Write exact file
  fs.writeFileSync(p.dest, content, 'utf8');
  console.log(`Restored exact Stitch screen: ${p.dest}`);
}

console.log('All 7 pages are now same-to-same like Stitch!');
