const fs = require('fs');

const pages = [
  'index.html',
  'about-us.html',
  'insurance-claims-investigation.html',
  'employee-background-verification.html',
  'our-approach.html',
  'technology-compliance.html',
  'contact-us.html'
];

// Bigger font sizes for the exact Stitch Tailwind config
const oldFontSize = `"fontSize": { "headline-lg": [ "2.5rem", { "lineHeight": "1.2", "letterSpacing": "-0.015em", "fontWeight": "400" } ], "tabular-data": [ "0.875rem", { "lineHeight": "1.4", "fontWeight": "500" } ], "title": [ "1.125rem", { "lineHeight": "1.5", "letterSpacing": "-0.01em", "fontWeight": "600" } ], "headline-lg-mobile": [ "1.875rem", { "lineHeight": "1.25", "letterSpacing": "-0.01em", "fontWeight": "400" } ], "body-md": [ "0.9375rem", { "lineHeight": "1.6", "fontWeight": "400" } ], "headline-md": [ "1.75rem", { "lineHeight": "1.3", "fontWeight": "500" } ], "body-lg": [ "1.0625rem", { "lineHeight": "1.65", "fontWeight": "400" } ], "headline-sm": [ "1.25rem", { "lineHeight": "1.4", "fontWeight": "500" } ], "body-sm": [ "0.8125rem", { "lineHeight": "1.5", "fontWeight": "400" } ], "display": [ "3.5rem", { "lineHeight": "1.15", "letterSpacing": "-0.02em", "fontWeight": "400" } ], "label-caps": [ "0.6875rem", { "lineHeight": "1.4", "letterSpacing": "0.08em", "fontWeight": "600" } ] }`;

const newFontSize = `"fontSize": { "headline-lg": [ "2.75rem", { "lineHeight": "1.2", "letterSpacing": "-0.015em", "fontWeight": "500" } ], "tabular-data": [ "0.95rem", { "lineHeight": "1.45", "fontWeight": "500" } ], "title": [ "1.25rem", { "lineHeight": "1.45", "letterSpacing": "-0.01em", "fontWeight": "600" } ], "headline-lg-mobile": [ "2rem", { "lineHeight": "1.25", "letterSpacing": "-0.01em", "fontWeight": "500" } ], "body-md": [ "1.0625rem", { "lineHeight": "1.65", "fontWeight": "400" } ], "headline-md": [ "2rem", { "lineHeight": "1.3", "fontWeight": "500" } ], "body-lg": [ "1.1875rem", { "lineHeight": "1.65", "fontWeight": "400" } ], "headline-sm": [ "1.375rem", { "lineHeight": "1.4", "fontWeight": "600" } ], "body-sm": [ "0.9375rem", { "lineHeight": "1.5", "fontWeight": "400" } ], "display": [ "3.75rem", { "lineHeight": "1.15", "letterSpacing": "-0.02em", "fontWeight": "500" } ], "label-caps": [ "0.8125rem", { "lineHeight": "1.4", "letterSpacing": "0.08em", "fontWeight": "600" } ] }`;

for (const file of pages) {
  let content = fs.readFileSync(file, 'utf8');

  // 1. Replace with bigger font sizes in Tailwind config
  content = content.replace(oldFontSize, newFontSize);

  // 2. Remove side margins without changing anything else
  // Inject style rule for .max-w-7xl to be full width inside <style>
  if (!content.includes('.max-w-7xl{max-width:100%!important;width:100%!important;}')) {
    content = content.replace(
      '::-webkit-scrollbar{display:none;}',
      '::-webkit-scrollbar{display:none;}.max-w-7xl{max-width:100%!important;width:100%!important;}'
    );
  }

  // 3. Fix the header logo image so it uses logo-icon.svg instead of logo.png (preventing duplicate text)
  content = content.replace(
    'src="assets/images/logo.png"/><div class="flex flex-col"><span class="font-title text-title tracking-tight text-primary leading-none">Trustline</span>',
    'src="assets/images/logo-icon.svg"/><div class="flex flex-col"><span class="font-title text-title tracking-tight text-primary leading-none">Trustline</span>'
  );

  fs.writeFileSync(file, content, 'utf8');
  console.log(`Updated ${file}: bigger fonts + removed big side margins`);
}

console.log('Done!');
