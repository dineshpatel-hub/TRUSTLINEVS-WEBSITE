const fs = require('fs');
const path = require('path');

const urlMap = JSON.parse(fs.readFileSync('url_mapping.json', 'utf8'));

// Screen mapping to destination HTML files
const pagesConfig = [
  {
    src: 'raw_screens/787dc63e65c84cdd86c318fa68b49a3b.html',
    dest: 'index.html',
    pageId: 'home',
    title: 'Trustline Verification Services | Corporate Risk & Evidential Investigation'
  },
  {
    src: 'raw_screens/8755e0375b344d71a761c8303f6e5851.html',
    dest: 'about-us.html',
    pageId: 'about-us',
    title: 'About Us | Trustline Verification Services'
  },
  {
    src: 'raw_screens/67bb61a9f2614ab298647039d7efdd5c.html',
    dest: 'insurance-claims-investigation.html',
    pageId: 'insurance-claims-investigation',
    title: 'Insurance Claims Investigation | Trustline Verification Services'
  },
  {
    src: 'raw_screens/a80ab767f8324552a0449fe18111dce8.html',
    dest: 'employee-background-verification.html',
    pageId: 'employee-background-verification',
    title: 'Employee Background Verification | Trustline Verification Services'
  },
  {
    src: 'raw_screens/c2bcce96bfae4552ae7756c6d3744c62.html',
    dest: 'our-approach.html',
    pageId: 'our-approach',
    title: 'Our Approach | Trustline Verification Services'
  },
  {
    src: 'raw_screens/d731564901604796ad8e6965928ce8d9.html',
    dest: 'technology-compliance.html',
    pageId: 'technology-compliance',
    title: 'Technology & Compliance | Trustline Verification Services'
  },
  {
    src: 'raw_screens/371469682d5e44e197524c1fded28625.html',
    dest: 'contact-us.html',
    pageId: 'contact-us',
    title: 'Contact Us | Trustline Verification Services'
  }
];

// Helper to replace remote image URLs with local paths
function replaceImages(html) {
  let result = html;
  for (const [remoteUrl, localPath] of Object.entries(urlMap)) {
    result = result.split(remoteUrl).join(localPath);
  }
  return result;
}

// Human-calibrated font size configuration for Tailwind
const humanFontSizeConfig = `"fontSize": {
  "headline-lg": [ "2.25rem", { "lineHeight": "1.25", "letterSpacing": "-0.015em", "fontWeight": "600" } ],
  "tabular-data": [ "0.875rem", { "lineHeight": "1.45", "fontWeight": "500" } ],
  "title": [ "1.125rem", { "lineHeight": "1.45", "letterSpacing": "-0.01em", "fontWeight": "600" } ],
  "headline-lg-mobile": [ "1.875rem", { "lineHeight": "1.25", "letterSpacing": "-0.01em", "fontWeight": "600" } ],
  "body-md": [ "1rem", { "lineHeight": "1.65", "fontWeight": "400" } ],
  "headline-md": [ "1.625rem", { "lineHeight": "1.35", "fontWeight": "600" } ],
  "body-lg": [ "1.125rem", { "lineHeight": "1.7", "fontWeight": "400" } ],
  "headline-sm": [ "1.25rem", { "lineHeight": "1.4", "fontWeight": "600" } ],
  "body-sm": [ "0.875rem", { "lineHeight": "1.55", "fontWeight": "400" } ],
  "display": [ "3.25rem", { "lineHeight": "1.18", "letterSpacing": "-0.02em", "fontWeight": "600" } ],
  "label-caps": [ "0.75rem", { "lineHeight": "1.4", "letterSpacing": "0.06em", "fontWeight": "600" } ]
}`;

// Global Consultation Modal
const modalHtml = `
<!-- Global Consultation Modal Dialog -->
<div id="consultation-modal" class="modal-backdrop hidden-modal fixed inset-0 z-[110] bg-[#001121]/75 backdrop-blur-sm flex items-center justify-center p-4">
  <div class="modal-card bg-pure-white w-full max-w-xl max-h-[90vh] overflow-y-auto border border-border-light shadow-2xl rounded-[2px] p-6 lg:p-8 relative">
    <button data-action="close-modal" class="absolute top-4 right-4 p-2 text-secondary hover:text-primary hover:bg-surface-container-low transition-colors cursor-pointer" aria-label="Close modal">
      <span class="material-symbols-outlined text-2xl">close</span>
    </button>
    
    <!-- Form State -->
    <div id="modal-form-state">
      <div class="flex items-center gap-2 mb-2 text-secondary font-label-caps text-label-caps">
        <span class="w-2 h-2 rounded-full bg-on-tertiary-container"></span>
        <span>CONFIDENTIAL ADVISORY DESK</span>
      </div>
      <h3 class="font-headline-sm text-headline-sm text-primary mb-2">Request an Evidential Consultation</h3>
      <p class="font-body-sm text-body-sm text-secondary mb-6 leading-relaxed">
        Initiate confidential inquiries with Trustline's senior investigative board in Ahmedabad. Strict NDA and chain of custody apply immediately upon receipt.
      </p>
      
      <form id="global-consultation-form" class="space-y-4">
        <div>
          <label class="block font-label-caps text-[11px] text-secondary uppercase mb-1">Corporate Entity / Insurer / Law Firm *</label>
          <input name="entity" required type="text" placeholder="e.g. HDFC Ergo / Bajaj Allianz / Corporate Legal" class="w-full bg-surface-container-low border border-border-muted px-3.5 py-2.5 font-body-sm text-primary focus:outline-none focus:border-primary"/>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block font-label-caps text-[11px] text-secondary uppercase mb-1">Officer Name & Designation *</label>
            <input name="officer" required type="text" placeholder="e.g. Ramesh Shah, VP Risk" class="w-full bg-surface-container-low border border-border-muted px-3.5 py-2.5 font-body-sm text-primary focus:outline-none focus:border-primary"/>
          </div>
          <div>
            <label class="block font-label-caps text-[11px] text-secondary uppercase mb-1">Direct Telephone *</label>
            <input name="phone" required type="tel" placeholder="+91 99250..." class="w-full bg-surface-container-low border border-border-muted px-3.5 py-2.5 font-body-sm text-primary focus:outline-none focus:border-primary"/>
          </div>
        </div>
        <div>
          <label class="block font-label-caps text-[11px] text-secondary uppercase mb-1">Official Corporate Email *</label>
          <input name="email" required type="email" placeholder="officer@corporate.com" class="w-full bg-surface-container-low border border-border-muted px-3.5 py-2.5 font-body-sm text-primary focus:outline-none focus:border-primary"/>
        </div>
        <div>
          <label class="block font-label-caps text-[11px] text-secondary uppercase mb-1">Scope of Inquiry *</label>
          <select name="scope" class="w-full bg-surface-container-low border border-border-muted px-3.5 py-2.5 font-body-sm text-primary focus:outline-none focus:border-primary">
            <option value="insurance-claim">Insurance Claims Investigation (Health / Life / Motor)</option>
            <option value="bgv-corporate">Corporate Employee Background Verification Program</option>
            <option value="c-suite-screening">Executive & Leadership Due Diligence</option>
            <option value="ground-recon">Field Reconnaissance & Hospital Fraud Audit</option>
            <option value="general-audit">Technology & Compliance Governance Audit</option>
          </select>
        </div>
        <div>
          <label class="block font-label-caps text-[11px] text-secondary uppercase mb-1">Case Parameters & Confidential Brief</label>
          <textarea name="notes" rows="3" placeholder="Outline geography (district/city), mandate timeline, or specific suspect flags..." class="w-full bg-surface-container-low border border-border-muted px-3.5 py-2.5 font-body-sm text-primary focus:outline-none focus:border-primary"></textarea>
        </div>
        <div class="flex items-start gap-2 pt-1">
          <input id="modal-nda" required type="checkbox" class="mt-1 accent-primary"/>
          <label for="modal-nda" class="text-xs text-secondary leading-normal">
            I confirm authority to commission risk advisory inquiries and acknowledge that information transmitted is held under privileged statutory non-disclosure.
          </label>
        </div>
        <div class="pt-2 flex items-center justify-end gap-3">
          <button type="button" data-action="close-modal" class="px-5 py-2.5 font-tabular-data text-body-sm text-secondary hover:text-primary transition-colors cursor-pointer">
            Cancel
          </button>
          <button type="submit" class="bg-primary-container text-pure-white hover:bg-primary font-tabular-data text-body-sm px-6 py-2.5 border border-primary-container transition-colors shadow-sm cursor-pointer font-medium">
            Transmit Mandate Brief
          </button>
        </div>
      </form>
    </div>
    
    <!-- Success State -->
    <div id="modal-success-state" class="hidden text-center py-8">
      <div class="w-16 h-16 bg-[#e0c38b]/20 border border-[#a28856] rounded-full flex items-center justify-center mx-auto mb-4">
        <span class="material-symbols-outlined text-3xl text-primary">verified</span>
      </div>
      <h3 class="font-headline-sm text-headline-sm text-primary mb-2">Mandate Docket Transmitted</h3>
      <p class="font-body-sm text-body-sm text-secondary max-w-md mx-auto mb-6 leading-relaxed">
        Your parameters have been logged directly into our central docket register. A senior operations analyst will establish confidential communications within 2 business hours.
      </p>
      <div class="bg-surface-container-low border border-border-muted p-4 max-w-xs mx-auto mb-6">
        <span class="block font-label-caps text-[11px] text-secondary mb-1">DOCKET REFERENCE NUMBER</span>
        <span id="modal-ref-code" class="font-tabular-data text-lg font-bold text-primary tracking-wider">TVS-4819-GJ</span>
      </div>
      <button data-action="close-modal" class="bg-primary-container text-pure-white font-tabular-data text-body-sm px-8 py-2.5 hover:bg-primary transition-colors cursor-pointer font-medium">
        Acknowledge & Close
      </button>
    </div>
  </div>
</div>
`;

// Helper to generate the exact Stitch Header with working links and no duplicate logo text
function generateStitchHeader(activePageId) {
  const isHome = activePageId === 'home';
  const isAbout = activePageId === 'about-us';
  const isClaims = activePageId === 'insurance-claims-investigation';
  const isBGV = activePageId === 'employee-background-verification';
  const isServices = isClaims || isBGV;
  const isApproach = activePageId === 'our-approach';
  const isTech = activePageId === 'technology-compliance';
  const isContact = activePageId === 'contact-us';

  const linkClass = (active) => active
    ? 'text-primary font-semibold border-b-2 border-primary tracking-wide h-full flex items-center transition-colors'
    : 'text-on-surface-variant hover:text-on-surface font-tabular-data text-tabular-data tracking-wide h-full flex items-center transition-colors';

  return `
<header class="fixed top-0 left-0 right-0 z-50 bg-pure-white/95 backdrop-blur-md shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
  <div class="bg-surface-container-low border-b border-border-light text-on-surface-variant font-label-caps text-label-caps">
    <div class="max-w-7xl mx-auto px-6 lg:px-12 h-9 flex items-center justify-between">
      <div class="flex items-center gap-space-lg">
        <a class="hover:text-primary transition-colors flex items-center gap-1.5" href="tel:+919925029005">
          <span>T: +91 99250 29005</span>
        </a>
        <span class="text-border-muted">|</span>
        <span>AHMEDABAD, GUJARAT</span>
        <span class="text-border-muted">|</span>
        <span class="hidden sm:inline">ESTD. JUNE 2023</span>
      </div>
      <div class="flex items-center gap-space-md">
        <span class="text-charcoal copyable cursor-pointer" title="Click to copy GST">GST: 24ASYPP8990J1ZJ</span>
        <span class="text-border-muted">|</span>
        <span class="text-charcoal hidden md:inline copyable cursor-pointer" title="Click to copy UDYAM">UDYAM-GJ-01-0279959</span>
      </div>
    </div>
  </div>
  
  <div class="h-20 border-b border-border-light">
    <div class="max-w-7xl mx-auto px-6 lg:px-12 h-full flex items-center justify-between gap-space-md">
      <!-- Logo Lockup: Vector emblem + clean typography (no duplicate text) -->
      <a href="index.html" class="flex items-center gap-space-md shrink-0 hover:opacity-95 transition-opacity">
        <img alt="Trustline Verification Services Official Logomark" class="h-9 w-auto object-contain" src="assets/images/logo-icon.svg"/>
        <div class="flex flex-col">
          <span class="font-title text-title tracking-tight text-primary leading-none">Trustline</span>
          <span class="font-label-caps text-label-caps text-secondary tracking-widest leading-none mt-1">VERIFICATION SERVICES</span>
        </div>
      </a>
      
      <!-- Desktop Nav -->
      <nav class="hidden lg:flex items-center gap-space-lg h-full">
        <a class="${linkClass(isHome)}" data-path="home" href="index.html">Home</a>
        <a class="${linkClass(isAbout)}" data-path="about-us" href="about-us.html">About Us</a>
        
        <div class="relative group h-full flex items-center">
          <a class="${isServices ? 'text-primary font-semibold' : 'text-on-surface-variant hover:text-on-surface'} font-tabular-data text-tabular-data tracking-wide flex items-center gap-1 transition-colors" data-path="services" href="#">
            Services<span class="text-[10px] opacity-70">▼</span>
          </a>
          <div class="absolute top-[100%] left-0 w-80 bg-pure-white border border-border-light shadow-[0_4px_12px_rgba(12,24,36,0.06)] hidden group-hover:block py-2 z-50">
            <a class="block px-space-md py-2.5 font-body-sm text-body-sm ${isClaims ? 'bg-surface-container-low text-primary font-semibold' : 'text-on-surface-variant hover:bg-surface-container-low hover:text-primary'} transition-colors" data-path="insurance-claims-investigation" href="insurance-claims-investigation.html">Insurance Claims Investigation</a>
            <a class="block px-space-md py-2.5 font-body-sm text-body-sm ${isBGV ? 'bg-surface-container-low text-primary font-semibold' : 'text-on-surface-variant hover:bg-surface-container-low hover:text-primary'} transition-colors border-t border-border-light/60" data-path="employee-background-verification" href="employee-background-verification.html">Employee Background Verification</a>
          </div>
        </div>

        <a class="${linkClass(isApproach)}" data-path="our-approach" href="our-approach.html">Our Approach</a>
        <a class="${linkClass(isTech)}" data-path="technology-compliance" href="technology-compliance.html">Technology &amp; Compliance</a>
        <a class="${linkClass(isContact)}" data-path="contact-us" href="contact-us.html">Contact Us</a>
      </nav>

      <!-- Right CTAs -->
      <div class="flex items-center gap-space-md">
        <button class="bg-primary-container text-pure-white hover:bg-primary font-tabular-data text-tabular-data px-5 py-2.5 rounded-[2px] transition-colors border border-primary-container shrink-0 text-center cursor-pointer shadow-sm" data-action="consultation-modal">
          Request a Consultation
        </button>
        <button id="mobile-menu-btn" class="lg:hidden p-2 text-primary hover:bg-surface-container-low rounded transition-colors cursor-pointer" aria-label="Open mobile menu">
          <span class="material-symbols-outlined text-2xl">menu</span>
        </button>
      </div>
    </div>
  </div>
</header>

<!-- Mobile Navigation Drawer -->
<div id="mobile-drawer-backdrop" class="fixed inset-0 bg-primary/40 backdrop-blur-sm z-[99] hidden"></div>
<div id="mobile-drawer" class="mobile-drawer closed fixed top-0 right-0 w-80 max-w-[85vw] h-full bg-pure-white z-[100] shadow-2xl flex flex-col justify-between border-l border-border-light">
  <div class="p-6 border-b border-border-light flex items-center justify-between">
    <div class="flex items-center gap-3">
      <img alt="Trustline Verification Services" class="h-8 w-auto" src="assets/images/logo-icon.svg"/>
      <span class="font-title text-primary font-bold tracking-tight">Trustline</span>
    </div>
    <button id="mobile-drawer-close" class="p-1.5 text-secondary hover:text-primary hover:bg-surface-container-low rounded transition-colors cursor-pointer" aria-label="Close menu">
      <span class="material-symbols-outlined text-2xl">close</span>
    </button>
  </div>
  
  <div class="flex-1 overflow-y-auto p-6 space-y-2 font-tabular-data text-body-sm">
    <a href="index.html" class="block py-2.5 px-3 rounded hover:bg-surface-container-low ${isHome ? 'text-primary font-semibold bg-surface-container-low' : 'text-on-surface-variant'} transition-colors">Home</a>
    <a href="about-us.html" class="block py-2.5 px-3 rounded hover:bg-surface-container-low ${isAbout ? 'text-primary font-semibold bg-surface-container-low' : 'text-on-surface-variant'} transition-colors">About Us</a>
    
    <div class="pt-3 pb-2 border-t border-border-light/60 my-2">
      <span class="block px-3 font-label-caps text-label-caps text-secondary tracking-widest uppercase mb-1">Core Practice Areas</span>
      <a href="insurance-claims-investigation.html" class="block py-2 px-3 pl-4 rounded hover:bg-surface-container-low ${isClaims ? 'text-primary font-semibold bg-surface-container-low' : 'text-on-surface-variant'} transition-colors">Insurance Claims Investigation</a>
      <a href="employee-background-verification.html" class="block py-2 px-3 pl-4 rounded hover:bg-surface-container-low ${isBGV ? 'text-primary font-semibold bg-surface-container-low' : 'text-on-surface-variant'} transition-colors">Employee Background Verification</a>
    </div>

    <a href="our-approach.html" class="block py-2.5 px-3 rounded hover:bg-surface-container-low ${isApproach ? 'text-primary font-semibold bg-surface-container-low' : 'text-on-surface-variant'} transition-colors border-t border-border-light/60">Our Approach</a>
    <a href="technology-compliance.html" class="block py-2.5 px-3 rounded hover:bg-surface-container-low ${isTech ? 'text-primary font-semibold bg-surface-container-low' : 'text-on-surface-variant'} transition-colors">Technology &amp; Compliance</a>
    <a href="contact-us.html" class="block py-2.5 px-3 rounded hover:bg-surface-container-low ${isContact ? 'text-primary font-semibold bg-surface-container-low' : 'text-on-surface-variant'} transition-colors">Contact Us</a>
  </div>
  
  <div class="p-6 bg-surface-container-low border-t border-border-light space-y-3 font-label-caps text-label-caps">
    <button class="w-full bg-primary-container text-pure-white hover:bg-primary py-3 px-4 font-tabular-data text-body-sm transition-colors text-center cursor-pointer font-medium" data-action="consultation-modal">
      Request a Consultation
    </button>
    <div class="text-secondary text-center pt-2">
      <p class="font-bold text-primary text-xs">HOTLINE: +91 99250 29005</p>
      <p class="text-[11px] mt-0.5 text-secondary">AHMEDABAD, GUJARAT</p>
    </div>
  </div>
</div>
`;
}

// Function to standardize inter-page links
function standardizeStitchLinks(html) {
  return html
    .replace(/<a([^>]*?)data-path="home"([^>]*?)href=["'][^"']*["']/g, '<a$1data-path="home"$2href="index.html"')
    .replace(/<a([^>]*?)data-path="about-us"([^>]*?)href=["'][^"']*["']/g, '<a$1data-path="about-us"$2href="about-us.html"')
    .replace(/<a([^>]*?)data-path="insurance-claims-investigation"([^>]*?)href=["'][^"']*["']/g, '<a$1data-path="insurance-claims-investigation"$2href="insurance-claims-investigation.html"')
    .replace(/<a([^>]*?)data-path="employee-background-verification"([^>]*?)href=["'][^"']*["']/g, '<a$1data-path="employee-background-verification"$2href="employee-background-verification.html"')
    .replace(/<a([^>]*?)data-path="our-approach"([^>]*?)href=["'][^"']*["']/g, '<a$1data-path="our-approach"$2href="our-approach.html"')
    .replace(/<a([^>]*?)data-path="technology-compliance"([^>]*?)href=["'][^"']*["']/g, '<a$1data-path="technology-compliance"$2href="technology-compliance.html"')
    .replace(/<a([^>]*?)data-path="contact-us"([^>]*?)href=["'][^"']*["']/g, '<a$1data-path="contact-us"$2href="contact-us.html"')
    .replace(/<a([^>]*?)data-path="request-consultation"([^>]*?)href=["'][^"']*["']/g, '<a$1data-action="consultation-modal"$2href="#"')
    .replace(/<a([^>]*?)data-path="privacy-policy"([^>]*?)href=["'][^"']*["']/g, '<a$1data-path="privacy-policy"$2href="privacy-policy.html"')
    .replace(/<a([^>]*?)data-path="terms-of-service"([^>]*?)href=["'][^"']*["']/g, '<a$1data-path="terms-of-service"$2href="terms-of-service.html"')
    .replace(/<a([^>]*?)data-path="statutory-compliance"([^>]*?)href=["'][^"']*["']/g, '<a$1data-path="statutory-compliance"$2href="technology-compliance.html"')
    .replace(/href="#core-services"/g, 'href="index.html#core-services"')
    .replace(/href="#leadership-consult"/g, 'href="index.html#leadership-consult"');
}

for (const p of pagesConfig) {
  let content = fs.readFileSync(p.src, 'utf8');

  // 1. Replace all remote images with local assets
  content = replaceImages(content);

  // 2. Tune the Tailwind font sizes to human proportions
  const oldFontSizeRegex = /"fontSize":\s*\{[\s\S]*?\}\s*\}\s*\}\s*\}\s*;/;
  content = content.replace(oldFontSizeRegex, `${humanFontSizeConfig}\n } } } };`);

  // 3. Replace header with responsive, single-logo Stitch header
  content = content.replace(/<header[\s\S]*?<\/header>/, generateStitchHeader(p.pageId));

  // 4. Update Title & Meta
  content = content.replace(/<title>.*?<\/title>/, `<title>${p.title}</title>`);
  
  // Inject favicon & custom CSS
  const headInject = `
  <link rel="icon" type="image/svg+xml" href="favicon.svg"/>
  <link rel="stylesheet" href="assets/css/custom.css"/>
`;
  content = content.replace('</head>', headInject + '\n</head>');

  // 5. Standardize all internal links
  content = standardizeStitchLinks(content);

  // 6. Inject modal & JS before </body>
  const bodyInject = `
${modalHtml}
<script src="assets/js/main.js"></script>
`;
  content = content.replace('</body>', bodyInject + '\n</body>');

  fs.writeFileSync(p.dest, content, 'utf8');
  console.log(`Rebuilt Stitch theme page: ${p.dest}`);
}

console.log('All Stitch theme pages successfully rebuilt!');
