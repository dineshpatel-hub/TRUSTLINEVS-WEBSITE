const fs = require('fs');

const pages = [
  { file: 'about-us.html', active: 'about-us' },
  { file: 'insurance-claims-investigation.html', active: 'insurance-claims-investigation' },
  { file: 'employee-background-verification.html', active: 'employee-background-verification' },
  { file: 'our-approach.html', active: 'our-approach' },
  { file: 'technology-compliance.html', active: 'technology-compliance' },
  { file: 'contact-us.html', active: 'contact-us' },
  { file: 'privacy-policy.html', active: 'privacy-policy' },
  { file: 'terms-of-service.html', active: 'terms-of-service' },
  { file: '404.html', active: '404' }
];

function generateHeader(active) {
  const getActive = (id) => id === active 
    ? 'text-primary font-semibold border-b-2 border-primary' 
    : 'text-secondary hover:text-primary transition-colors';

  const isServicesActive = active === 'insurance-claims-investigation' || active === 'employee-background-verification';

  return `
  <!-- TOP STATUTORY & CONTACT STRIP -->
  <aside class="w-full bg-[#071322] text-[#9bb0c8] text-xs font-medium border-b border-[#16273e] relative z-50">
    <div class="max-w-[1500px] mx-auto px-4 sm:px-8 lg:px-12 h-9 flex items-center justify-between">
      <div class="flex items-center gap-4 sm:gap-6 text-[11px] tracking-wide">
        <a href="tel:+919925029005" class="hover:text-white transition-colors flex items-center gap-1.5 font-semibold text-white/90">
          <span class="material-symbols-outlined text-[15px] text-gold">call</span>
          <span>+91 99250 29005</span>
        </a>
        <span class="text-white/20 hidden sm:inline">|</span>
        <span class="hidden sm:flex items-center gap-1.5 text-white/80">
          <span class="material-symbols-outlined text-[14px] text-gold">location_on</span>
          <span>Ahmedabad, Gujarat</span>
        </span>
        <span class="text-white/20 hidden md:inline">|</span>
        <span class="hidden md:inline text-white/60">Estd. June 2023</span>
      </div>

      <div class="flex items-center gap-4 text-[11px]">
        <span class="copyable hover:text-white transition-colors cursor-pointer flex items-center gap-1 text-white/80" title="Click to copy GST">
          <span class="text-gold font-bold">GSTIN:</span> 24ASYPP8990J1ZJ
        </span>
        <span class="text-white/20 hidden lg:inline">|</span>
        <span class="copyable hover:text-white transition-colors cursor-pointer hidden lg:flex items-center gap-1 text-white/80" title="Click to copy UDYAM">
          <span class="text-gold font-bold">UDYAM:</span> UDYAM-GJ-01-0279959
        </span>
      </div>
    </div>
  </aside>

  <!-- MAIN NAVIGATION HEADER -->
  <header class="sticky top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-b border-border-light shadow-[0_2px_15px_rgba(0,0,0,0.03)]">
    <div class="max-w-[1500px] mx-auto px-4 sm:px-8 lg:px-12 h-20 flex items-center justify-between">
      
      <!-- Brand Logo Lockup -->
      <a href="index.html" class="flex items-center gap-3.5 group transition-transform">
        <img src="assets/images/logo-icon.svg" alt="Trustline Mark" class="h-10 w-10 shrink-0 shadow-sm rounded"/>
        <div class="flex flex-col">
          <span class="font-headline text-xl sm:text-2xl font-bold tracking-tight text-primary leading-none group-hover:text-primary-light transition-colors">
            Trustline
          </span>
          <span class="text-[9px] font-bold tracking-[0.22em] text-secondary uppercase leading-none mt-1">
            Verification Services
          </span>
        </div>
      </a>

      <!-- Desktop Navigation Menu -->
      <nav class="hidden lg:flex items-center gap-8 h-full text-sm font-medium">
        <a href="index.html" class="${getActive('home')} h-full flex items-center px-1">
          Home
        </a>
        <a href="about-us.html" class="${getActive('about-us')} h-full flex items-center px-1">
          About Us
        </a>
        
        <!-- Practice Areas Dropdown -->
        <div class="relative group h-full flex items-center">
          <button class="${isServicesActive ? 'text-primary font-semibold' : 'text-secondary'} group-hover:text-primary transition-colors flex items-center gap-1.5 h-full px-1 cursor-pointer">
            <span>Practice Areas</span>
            <span class="material-symbols-outlined text-[16px] transition-transform group-hover:rotate-180">expand_more</span>
          </button>
          
          <div class="absolute top-[100%] left-0 w-80 bg-white border border-border-light shadow-[0_12px_30px_rgba(0,0,0,0.08)] rounded-b-md p-2 hidden group-hover:block animate-in fade-in slide-in-from-top-1 duration-150 z-50">
            <a href="insurance-claims-investigation.html" class="flex flex-col p-3 rounded hover:bg-surface transition-colors ${active === 'insurance-claims-investigation' ? 'bg-surface font-semibold text-primary' : ''}">
              <span class="font-semibold text-primary text-sm flex items-center gap-2">
                <span class="w-1.5 h-1.5 rounded-full bg-gold"></span>
                Insurance Claims Investigation
              </span>
              <span class="text-xs text-secondary mt-1 pl-3.5">
                Health, life, motor &amp; hospital fraud forensic audits
              </span>
            </a>
            <div class="h-px bg-border-light/60 my-1"></div>
            <a href="employee-background-verification.html" class="flex flex-col p-3 rounded hover:bg-surface transition-colors ${active === 'employee-background-verification' ? 'bg-surface font-semibold text-primary' : ''}">
              <span class="font-semibold text-primary text-sm flex items-center gap-2">
                <span class="w-1.5 h-1.5 rounded-full bg-gold"></span>
                Employee Background Screening
              </span>
              <span class="text-xs text-secondary mt-1 pl-3.5">
                Address geo-visits, education &amp; employment vetting
              </span>
            </a>
          </div>
        </div>

        <a href="our-approach.html" class="${getActive('our-approach')} h-full flex items-center px-1">
          Our Approach
        </a>
        <a href="technology-compliance.html" class="${getActive('technology-compliance')} h-full flex items-center px-1">
          Compliance &amp; Tech
        </a>
        <a href="contact-us.html" class="${getActive('contact-us')} h-full flex items-center px-1">
          Contact
        </a>
      </nav>

      <!-- Right Header CTA & Mobile Button -->
      <div class="flex items-center gap-4">
        <button data-action="consultation-modal" class="hidden sm:inline-flex items-center gap-2 bg-primary hover:bg-primary-light text-white text-xs sm:text-sm font-semibold px-5 py-2.5 rounded shadow-sm border border-gold/40 transition-all hover:shadow-md cursor-pointer">
          <span class="material-symbols-outlined text-[18px] text-gold">verified_user</span>
          <span>Request a Consultation</span>
        </button>
        <button id="mobile-menu-btn" class="lg:hidden p-2 text-primary hover:bg-surface rounded transition-colors" aria-label="Open navigation menu">
          <span class="material-symbols-outlined text-2xl">menu</span>
        </button>
      </div>
    </div>
  </header>

  <!-- MOBILE NAVIGATION DRAWER -->
  <div id="mobile-drawer-backdrop" class="fixed inset-0 bg-primary/40 backdrop-blur-sm z-[99] hidden"></div>
  <div id="mobile-drawer" class="mobile-drawer closed fixed top-0 right-0 w-80 max-w-[85vw] h-full bg-white z-[100] shadow-2xl flex flex-col justify-between border-l border-border-light">
    <div class="p-6 border-b border-border-light flex items-center justify-between">
      <div class="flex items-center gap-3">
        <img src="assets/images/logo-icon.svg" alt="Trustline Logo" class="h-8 w-8"/>
        <span class="font-headline font-bold text-lg text-primary">Trustline</span>
      </div>
      <button id="mobile-drawer-close" class="p-2 text-secondary hover:text-primary hover:bg-surface rounded transition-colors" aria-label="Close menu">
        <span class="material-symbols-outlined text-xl">close</span>
      </button>
    </div>
    
    <div class="flex-1 overflow-y-auto p-6 space-y-2 text-sm font-medium">
      <a href="index.html" class="block py-2.5 px-3 rounded hover:bg-surface ${active === 'home' ? 'bg-surface text-primary font-semibold' : 'text-secondary'}">Home</a>
      <a href="about-us.html" class="block py-2.5 px-3 rounded hover:bg-surface ${active === 'about-us' ? 'bg-surface text-primary font-semibold' : 'text-secondary'}">About Us</a>
      
      <div class="pt-3 pb-2 border-t border-border-light/60 my-2">
        <span class="block px-3 text-[10px] font-bold text-secondary tracking-widest uppercase mb-1">Practice Areas</span>
        <a href="insurance-claims-investigation.html" class="block py-2 px-3 pl-5 rounded hover:bg-surface ${active === 'insurance-claims-investigation' ? 'bg-surface text-primary font-semibold' : 'text-secondary'}">Insurance Claims Investigation</a>
        <a href="employee-background-verification.html" class="block py-2 px-3 pl-5 rounded hover:bg-surface ${active === 'employee-background-verification' ? 'bg-surface text-primary font-semibold' : 'text-secondary'}">Employee Background Screening</a>
      </div>

      <a href="our-approach.html" class="block py-2.5 px-3 rounded hover:bg-surface ${active === 'our-approach' ? 'bg-surface text-primary font-semibold' : 'text-secondary'} border-t border-border-light/60">Our Approach</a>
      <a href="technology-compliance.html" class="block py-2.5 px-3 rounded hover:bg-surface ${active === 'technology-compliance' ? 'bg-surface text-primary font-semibold' : 'text-secondary'}">Technology &amp; Compliance</a>
      <a href="contact-us.html" class="block py-2.5 px-3 rounded hover:bg-surface ${active === 'contact-us' ? 'bg-surface text-primary font-semibold' : 'text-secondary'}">Contact Us</a>
    </div>
    
    <div class="p-6 bg-surface border-t border-border-light space-y-3">
      <button data-action="consultation-modal" class="w-full bg-primary hover:bg-primary-light text-white py-3 px-4 rounded text-sm font-semibold transition-colors flex items-center justify-center gap-2 shadow-sm">
        <span class="material-symbols-outlined text-[18px] text-gold">verified_user</span>
        <span>Request a Consultation</span>
      </button>
      <div class="text-center pt-2">
        <p class="font-bold text-xs text-primary">HOTLINE: +91 99250 29005</p>
        <p class="text-[11px] text-secondary mt-0.5">Ahmedabad, Gujarat</p>
      </div>
    </div>
  </div>
`;
}

function generateFooter() {
  return `
  <!-- FOOTER -->
  <footer class="w-full bg-[#071322] border-t border-[#13263b] text-slate-300 text-sm">
    <div class="max-w-[1500px] mx-auto px-4 sm:px-8 lg:px-12 pt-16 pb-12">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 mb-12">
        
        <!-- Col 1: Brand Info -->
        <div class="lg:col-span-4 space-y-4">
          <div class="flex items-center gap-3">
            <img src="assets/images/logo-icon.svg" alt="Trustline Mark" class="h-8 w-8"/>
            <span class="font-headline text-xl font-bold text-white tracking-tight">Trustline</span>
          </div>
          <p class="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-sm">
            Mitigating Risk, Building Trust. Professional Insurance Claims Investigation &amp; Employee Background Verification Services headquartered in Ahmedabad, Gujarat.
          </p>
          <div class="bg-white/5 border border-white/10 p-3 rounded text-xs space-y-1 w-fit">
            <p><strong class="text-gold">GSTIN:</strong> 24ASYPP8990J1ZJ</p>
            <p><strong class="text-gold">UDYAM:</strong> UDYAM-GJ-01-0279959</p>
          </div>
        </div>

        <!-- Col 2: Locations -->
        <div class="lg:col-span-4 space-y-4">
          <h4 class="font-headline text-base font-bold text-white">Offices &amp; Presence</h4>
          <div class="space-y-3 text-xs text-slate-400">
            <div class="border-l-2 border-gold pl-3">
              <p class="font-bold text-slate-200">Corporate Headquarters:</p>
              <p>17, Hare Krishna Complex off. Ashram Road, Behind City Gold Cinema, Ahmedabad, Gujarat 380006</p>
            </div>
            <div class="border-l-2 border-slate-600 pl-3">
              <p class="font-bold text-slate-200">Registered Office:</p>
              <p>A1-FF1-First Floor, Gopal Surya Complex, Sola Road, Ghatlodiya, Ahmedabad, Gujarat 380061</p>
            </div>
          </div>
        </div>

        <!-- Col 3: Practice Areas -->
        <div class="lg:col-span-2 space-y-3">
          <h4 class="font-headline text-base font-bold text-white">Practice Areas</h4>
          <ul class="space-y-2 text-xs text-slate-400">
            <li><a href="insurance-claims-investigation.html" class="hover:text-gold transition-colors">Claims Investigation</a></li>
            <li><a href="employee-background-verification.html" class="hover:text-gold transition-colors">Background Vetting</a></li>
            <li><a href="our-approach.html" class="hover:text-gold transition-colors">Evidential Rigor</a></li>
            <li><a href="technology-compliance.html" class="hover:text-gold transition-colors">Regulatory Compliance</a></li>
            <li><a href="about-us.html" class="hover:text-gold transition-colors">About Trustline</a></li>
          </ul>
        </div>

        <!-- Col 4: Direct Desk -->
        <div class="lg:col-span-2 space-y-3">
          <h4 class="font-headline text-base font-bold text-white">Direct Hotlines</h4>
          <p class="text-xs text-slate-400">Senior Operations Desk:</p>
          <p class="text-sm font-bold text-white">+91 99250 29005</p>
          <p class="text-sm font-bold text-white">+91 83479 91295</p>
          <p class="text-xs text-gold pt-2">trustline@trustlinevs.com</p>
        </div>

      </div>

      <div class="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        <p>&copy; 2024 Trustline Verification Services. All rights reserved.</p>
        <div class="flex items-center gap-4 text-slate-400">
          <a href="privacy-policy.html" class="hover:text-gold transition-colors">Privacy Policy</a>
          <span>&bull;</span>
          <a href="terms-of-service.html" class="hover:text-gold transition-colors">Terms of Service</a>
          <span>&bull;</span>
          <a href="technology-compliance.html" class="hover:text-gold transition-colors">DPDP Compliance</a>
        </div>
      </div>
    </div>
  </footer>
`;
}

for (const p of pages) {
  let content = fs.readFileSync(p.file, 'utf8');

  // Replace header & drawer
  // Strip out old header and drawer
  const headerDrawerRegex = /<header[\s\S]*?<\/div>\s*<\/div>\s*(?=<main)/;
  if (headerDrawerRegex.test(content)) {
    content = content.replace(headerDrawerRegex, generateHeader(p.active) + '\n');
  } else {
    // If not matched, try matching header
    content = content.replace(/<header[\s\S]*?<\/header>/, generateHeader(p.active));
  }

  // Replace footer
  content = content.replace(/<footer[\s\S]*?<\/footer>/, generateFooter());

  // Clean data-alt prompts
  content = content.replace(/data-alt="[^"]*"/g, '');

  // Clean Project Janus references
  content = content.replace(/PROJECT JANUS \/\/ EVIDENCE BIND/g, 'EVIDENTIAL CASE FILE // VERIFIED');
  content = content.replace(/CASE FILE PROJECT JANUS/g, 'VERIFIED INVESTIGATION DOSSIER');
  content = content.replace(/PROJECT JANUS/g, 'VERIFIED MANDATE');

  // Fix Ashram Road map in contact-us.html to a real interactive Google Maps iframe
  if (p.file === 'contact-us.html') {
    content = content.replace(
      /<div class="w-full h-52 bg-surface-container-high[\s\S]*?<\/div>/,
      `<div class="w-full h-64 rounded-sm overflow-hidden border border-border-light shadow-sm">
        <iframe 
          title="Trustline Verification Services Ashram Road Office"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14686.368739947844!2d72.56581977755737!3d23.03875323910609!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e84f526315555%3A0xa1969a6572e811bc!2sAshram%20Rd%2C%20Ahmedabad%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
          width="100%" 
          height="100%" 
          style="border:0;" 
          allowfullscreen="" 
          loading="lazy">
        </iframe>
      </div>`
    );
  }

  fs.writeFileSync(p.file, content, 'utf8');
  console.log(`Polished ${p.file}`);
}

console.log('All pages polished to enterprise grade!');
