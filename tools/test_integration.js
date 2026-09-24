const http = require('http');
const fs = require('fs');

const pages = [
  '/',
  '/index.html',
  '/about-us.html',
  '/insurance-claims-investigation.html',
  '/employee-background-verification.html',
  '/our-approach.html',
  '/technology-compliance.html',
  '/contact-us.html',
  '/privacy-policy.html',
  '/terms-of-service.html',
  '/404.html',
  '/assets/css/custom.css',
  '/assets/js/main.js',
  '/assets/images/logo.png',
  '/favicon.svg'
];

function checkUrl(path) {
  return new Promise((resolve) => {
    http.get('http://localhost:3000' + path, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        resolve({
          path,
          statusCode: res.statusCode,
          contentType: res.headers['content-type'],
          length: body.length
        });
      });
    }).on('error', (err) => {
      resolve({ path, error: err.message });
    });
  });
}

async function runTests() {
  console.log('Testing local server endpoints...');
  let hasErrors = false;
  for (const p of pages) {
    const res = await checkUrl(p);
    if (res.error || res.statusCode !== 200) {
      console.error(`FAIL: ${p} ->`, res);
      hasErrors = true;
    } else {
      console.log(`PASS: ${p} [${res.statusCode}] - Size: ${res.length} bytes`);
    }
  }

  // Also check all images referenced in index.html
  const indexContent = fs.readFileSync('index.html', 'utf8');
  const imgMatches = indexContent.matchAll(/src=["'](assets\/images\/[^"']+)["']/g);
  for (const m of imgMatches) {
    const imgPath = '/' + m[1];
    const res = await checkUrl(imgPath);
    if (res.error || res.statusCode !== 200) {
      console.error(`FAIL img: ${imgPath} ->`, res);
      hasErrors = true;
    } else {
      console.log(`PASS img: ${imgPath} [${res.statusCode}]`);
    }
  }

  if (!hasErrors) {
    console.log('\nALL 100% OF ENDPOINTS & ASSETS PASSED INTEGRATION VALIDATION!');
  }
}

runTests();
