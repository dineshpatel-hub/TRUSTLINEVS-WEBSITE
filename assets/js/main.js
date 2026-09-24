/**
 * Trustline Verification Services - Main Interactive Script
 * Multipage Navigation, Mobile Drawer, Consultation Modal,
 * Form Handling, BGV Matrix Calculator & Micro-Interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileDrawer();
  initConsultationModal();
  initForms();
  initMatrixCalculator();
  initClipboardCopy();
  initBackToTop();
  initCopyrightYear();
});

// Toast notification helper
function showToast(message, type = 'info') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast-msg';
  
  const icon = type === 'success' ? 'check_circle' : 'info';
  toast.innerHTML = `
    <div class="flex items-center gap-2">
      <span class="material-symbols-outlined text-[18px] text-[#fedfa5]">${icon}</span>
      <span>${message}</span>
    </div>
    <button class="text-white/60 hover:text-white text-xs font-bold px-1" onclick="this.parentElement.remove()">✕</button>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => toast.remove(), 250);
  }, 4000);
}

// Mobile Drawer Navigation
function initMobileDrawer() {
  const toggleBtn = document.getElementById('mobile-menu-btn');
  const drawer = document.getElementById('mobile-drawer');
  const closeBtn = document.getElementById('mobile-drawer-close');
  const backdrop = document.getElementById('mobile-drawer-backdrop');

  if (!drawer) return;

  function openDrawer() {
    drawer.classList.remove('closed');
    drawer.classList.add('open');
    if (backdrop) backdrop.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    drawer.classList.remove('open');
    drawer.classList.add('closed');
    if (backdrop) backdrop.classList.add('hidden');
    document.body.style.overflow = '';
  }

  if (toggleBtn) toggleBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  if (backdrop) backdrop.addEventListener('click', closeDrawer);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      closeDrawer();
    }
  });

  const links = drawer.querySelectorAll('a');
  links.forEach(link => {
    link.addEventListener('click', () => {
      closeDrawer();
    });
  });
}

// Global Consultation Modal
function initConsultationModal() {
  const modal = document.getElementById('consultation-modal');
  if (!modal) return;

  const openBtns = document.querySelectorAll('[data-action="consultation-modal"], [data-path="request-consultation"]');
  const closeBtns = modal.querySelectorAll('[data-action="close-modal"]');
  const form = document.getElementById('global-consultation-form');
  const successState = document.getElementById('modal-success-state');
  const formState = document.getElementById('modal-form-state');

  function openModal(e) {
    if (e) e.preventDefault();
    modal.classList.remove('hidden-modal');
    modal.classList.add('active-modal');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('active-modal');
    modal.classList.add('hidden-modal');
    document.body.style.overflow = '';
    // Reset state after transition
    setTimeout(() => {
      if (formState && successState) {
        formState.classList.remove('hidden');
        successState.classList.add('hidden');
      }
    }, 300);
  }

  openBtns.forEach(btn => btn.addEventListener('click', openModal));
  closeBtns.forEach(btn => btn.addEventListener('click', closeModal));

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active-modal')) {
      closeModal();
    }
  });

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const code = 'TVS-' + Math.floor(1000 + Math.random() * 9000) + '-GJ';
      const codeElem = document.getElementById('modal-ref-code');
      if (codeElem) codeElem.textContent = code;

      // Save to localStorage for demo persistence
      try {
        const inquiries = JSON.parse(localStorage.getItem('trustline_inquiries') || '[]');
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        data.refCode = code;
        data.timestamp = new Date().toISOString();
        inquiries.push(data);
        localStorage.setItem('trustline_inquiries', JSON.stringify(inquiries));
      } catch (err) {}

      if (formState && successState) {
        formState.classList.add('hidden');
        successState.classList.remove('hidden');
      }
      form.reset();
      showToast(`Mandate Brief ${code} received. An investigator will connect shortly.`, 'success');
    });
  }
}

// Forms Handling on All Pages
function initForms() {
  // Page: index.html - Leadership briefing form
  const indexBriefForm = document.querySelector('#leadership-consult form');
  if (indexBriefForm) {
    indexBriefForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const code = 'DIR-' + Math.floor(1000 + Math.random() * 9000);
      showToast(`Mandate docket ${code} registered. Directorial desk will establish contact.`, 'success');
      indexBriefForm.reset();
    });
  }

  // Page: insurance-claims-investigation.html
  const insForm = document.getElementById('mandateForm');
  if (insForm && window.location.pathname.includes('insurance-claims')) {
    insForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const successBanner = document.getElementById('form-success-banner');
      if (successBanner) {
        successBanner.classList.remove('hidden');
        successBanner.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
      const ref = 'CLM-' + Math.floor(1000 + Math.random() * 9000) + '-GJ';
      showToast(`Claim Mandate ${ref} submitted. Forensic desk activated.`, 'success');
      insForm.reset();
    });
  }

  // Page: employee-background-verification.html - consultation inquiry
  const bgvForm = document.querySelector('#consultation-inquiry form');
  if (bgvForm) {
    bgvForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const confirmElem = document.getElementById('submission-confirmation');
      if (confirmElem) {
        confirmElem.classList.remove('hidden');
        confirmElem.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
      const ref = 'BGV-' + Math.floor(1000 + Math.random() * 9000);
      showToast(`Screening protocol inquiry ${ref} registered.`, 'success');
      bgvForm.reset();
    });
  }

  // Page: technology-compliance.html - audit form
  const auditForm = document.getElementById('complianceAuditForm');
  if (auditForm) {
    auditForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const feedback = document.getElementById('auditFeedback');
      if (feedback) {
        feedback.classList.remove('hidden');
        feedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
      const ref = 'AUD-' + Math.floor(1000 + Math.random() * 9000);
      showToast(`Compliance dossier request ${ref} scheduled.`, 'success');
      auditForm.reset();
    });
  }

  // Page: contact-us.html - mandate form
  const contactForm = document.getElementById('mandateForm');
  if (contactForm && (window.location.pathname.includes('contact-us') || !window.location.pathname.includes('insurance-claims'))) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const formSuccess = document.getElementById('formSuccess');
      if (formSuccess) {
        formSuccess.classList.remove('hidden');
        formSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
      const ref = 'INQ-' + Math.floor(1000 + Math.random() * 9000);
      showToast(`Inquiry docket ${ref} logged. We will contact you shortly.`, 'success');
      contactForm.reset();
    });
  }
}

// BGV Turnaround Time & Tier Matrix Calculator
function initMatrixCalculator() {
  const volInput = document.getElementById('volume-input');
  if (!volInput) return;

  const volDisplay = document.getElementById('volume-val');
  const modAddress = document.getElementById('mod-address');
  const modEdu = document.getElementById('mod-edu');
  const modEmp = document.getElementById('mod-emp');
  const modRef = document.getElementById('mod-ref');

  const calcTat = document.getElementById('calc-tat');
  const calcDispatches = document.getElementById('calc-dispatches');
  const calcTier = document.getElementById('calc-tier');

  function calculate() {
    const vol = parseInt(volInput.value, 10);
    if (volDisplay) {
      volDisplay.textContent = vol >= 500 ? '500+ / mo' : `${vol} / mo`;
    }

    let checkedCount = 0;
    if (modAddress && modAddress.checked) checkedCount++;
    if (modEdu && modEdu.checked) checkedCount++;
    if (modEmp && modEmp.checked) checkedCount++;
    if (modRef && modRef.checked) checkedCount++;

    // Calculate TAT
    let baseTatDays = 2;
    if (checkedCount <= 1) baseTatDays = 2;
    else if (checkedCount === 2) baseTatDays = 3;
    else if (checkedCount === 3) baseTatDays = 4;
    else baseTatDays = 5;

    if (vol > 200) baseTatDays += 1;

    if (calcTat) {
      calcTat.textContent = `${baseTatDays}-${baseTatDays + 2} Business Days`;
    }

    // Calculate Operative Dispatches
    let dispatches = Math.max(1, Math.round(vol * (checkedCount * 0.4)));
    if (calcDispatches) {
      calcDispatches.textContent = `${dispatches} Field Dispatches / Mo`;
    }

    // Calculate Service Tier
    let tier = 'Standard Corporate';
    if (vol >= 300 || checkedCount >= 4) {
      tier = 'Enterprise High-Governance Tier';
    } else if (vol >= 100 || checkedCount >= 3) {
      tier = 'Accelerated Dedicated Desk';
    }

    if (calcTier) {
      calcTier.textContent = tier;
    }
  }

  volInput.addEventListener('input', calculate);
  [modAddress, modEdu, modEmp, modRef].forEach(el => {
    if (el) el.addEventListener('change', calculate);
  });

  // Run initial calculation
  calculate();
}

// Copy-to-Clipboard Functionality
function initClipboardCopy() {
  const copyTargets = [
    { selector: 'a[href^="tel:"]', label: 'Phone Number' },
    { selector: 'a[href^="mailto:"]', label: 'Email Address' },
  ];

  // GST & UDYAM spans
  document.querySelectorAll('span, p, div').forEach(el => {
    const text = el.textContent || '';
    if (text.includes('24ASYPP8990J1ZJ') || text.includes('UDYAM-GJ-01-0279959')) {
      el.classList.add('copyable');
      el.setAttribute('title', 'Click to copy statutory identifier');
      el.addEventListener('click', (e) => {
        let copyVal = '';
        if (text.includes('24ASYPP8990J1ZJ')) copyVal = '24ASYPP8990J1ZJ';
        else if (text.includes('UDYAM-GJ-01-0279959')) copyVal = 'UDYAM-GJ-01-0279959';
        if (copyVal) {
          navigator.clipboard.writeText(copyVal).then(() => {
            showToast(`Copied ${copyVal} to clipboard!`, 'info');
          });
        }
      });
    }
  });
}

// Back to Top Button
function initBackToTop() {
  let btn = document.getElementById('back-to-top');
  if (!btn) {
    btn = document.createElement('button');
    btn.id = 'back-to-top';
    btn.className = 'hidden-btn bg-[#142638] text-white p-3 rounded shadow-lg border border-[#a28856]/40 hover:bg-[#001121] transition-all flex items-center justify-center';
    btn.setAttribute('aria-label', 'Return to top of page');
    btn.innerHTML = '<span class="material-symbols-outlined text-[20px]">arrow_upward</span>';
    document.body.appendChild(btn);
  }

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btn.classList.remove('hidden-btn');
      btn.classList.add('visible-btn');
    } else {
      btn.classList.remove('visible-btn');
      btn.classList.add('hidden-btn');
    }
  });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// Current Year in Footers
function initCopyrightYear() {
  const currentYear = new Date().getFullYear();
  document.querySelectorAll('footer p').forEach(p => {
    if (p.textContent.includes('©')) {
      p.innerHTML = p.innerHTML.replace(/©\s*\d{4}/, `© ${currentYear}`);
    }
  });
}
