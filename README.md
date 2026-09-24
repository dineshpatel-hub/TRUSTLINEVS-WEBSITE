# Trustline Verification Services

> **Mitigating Risk, Building Trust.**  
> Professional Insurance Claims Investigation & Employee Background Verification Services engineered for corporate counsel, underwriting directors, and governance bodies across Gujarat.

---

## 🏛️ Overview

This multipage web application is crafted from the official Stitch project design for **Trustline Verification Services** (Estd. June 2023, Ahmedabad, Gujarat).

- **Entity**: Trustline Verification Services
- **Statutory Accreditations**:
  - **GSTIN**: `24ASYPP8990J1ZJ`
  - **UDYAM**: `UDYAM-GJ-01-0279959`
- **Headquarters**: 17, Hare Krishna Complex off. Ashram Road, Behind City Gold Cinema, Ahmedabad, Gujarat 380006
- **Registered Office**: A1-FF1-First Floor, Gopal Surya Complex, Sola Road, Ghatlodiya, Ahmedabad, Gujarat 380061
- **Hotline**: `+91 99250 29005` | `+91 83479 91295`
- **Email**: `trustline@trustlinevs.com`

---

## 📑 Pages Included

1. **[Home (`index.html`)](index.html)**: Hero editorial showcase, core risk advisory metrics, services overview, leadership background, and direct consultation briefing desk.
2. **[About Us (`about-us.html`)](about-us.html)**: Institutional pedigree, founder Mr. Dinesh Patel (30+ years corporate operations), 25+ field operatives network across Gujarat, and evidentiary standards.
3. **[Insurance Claims Investigation (`insurance-claims-investigation.html`)](insurance-claims-investigation.html)**: Health, life, motor, and commercial claims fraud audits, cashless verification, forensic evidentiary dossiers, and interactive Mandate Initiation form.
4. **[Employee Background Verification (`employee-background-verification.html`)](employee-background-verification.html)**: Address verification, education checks, employment verification, supervisor reference checks, court records, DPDP Act consent workflows, and an interactive **Turnaround Time & Tier Matrix Calculator**.
5. **[Our Approach (`our-approach.html`)](our-approach.html)**: 4-Stage Evidential Methodology (Intake & Docket Assembly, On-Ground Tactical Field Deployment, Cross-Verification Triangulation, Legally Admissible Dossier).
6. **[Technology & Compliance (`technology-compliance.html`)](technology-compliance.html)**: ISO-aligned data protection, role-based encryption, automated discrepancy indexing, and Compliance Audit inquiry form.
7. **[Contact Us (`contact-us.html`)](contact-us.html)**: Full office addresses, hotlines, department dispatch routing, interactive consultation form, and location coordinates.
8. **[Privacy Policy (`privacy-policy.html`)](privacy-policy.html)**: Comprehensive Digital Personal Data Protection (DPDP) Act 2023 compliance, candidate consent policies, zero secondary data sharing, and Data Protection Officer contacts.
9. **[Terms of Engagement (`terms-of-service.html`)](terms-of-service.html)**: Corporate mandate parameters, evidentiary admissibility standards, non-entrapment doctrine, and Ahmedabad jurisdiction.
10. **[404 Page (`404.html`)](404.html)**: Editorial custom not-found page with quick recovery routes to all practice areas.

---

## ⚡ Features & Interactivity

- **100% Standalone (No Backend Required)**: Pure static HTML5, Tailwind CSS, Google Fonts (`Domine`, `Inter`), Material Symbols, and Vanilla JavaScript.
- **Local Asset Hosting**: All corporate photography, bespoke case dossier plates, and official SVG logos are stored locally in `assets/images/` for zero external dependencies and fast load times.
- **Responsive Mobile Navigation Drawer**: Hamburger toggle on mobile/tablet viewports with animated slide drawer and smooth backdrop.
- **Global Consultation Modal**: Accessible from any page via the "Request a Consultation" button with validation, case reference generation (`TVS-XXXX-GJ`), local storage draft persistence, and instant feedback.
- **Interactive BGV Calculator**: Reactive candidate volume slider and module checkboxes dynamically calculating SLA turnaround times, field operative dispatches, and governance tiers.
- **Click-to-Copy Statutory Credentials**: Instant clipboard copying for GSTIN, UDYAM, phone numbers, and emails with toast feedback.
- **Vercel Ready**: Preconfigured with `vercel.json` providing clean URLs (`/about-us`), security headers, and asset caching rules.

---

## 🚀 How to Run Locally

You can preview the website immediately using any local server:

```bash
# Using npx serve
npx serve -p 3000 .
```

Or with Python:

```bash
# Python 3
python -m http.server 3000
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## ☁️ How to Deploy to Vercel

### Option 1: Deploy with Vercel CLI (Fastest)

1. Install the Vercel CLI (if not already installed):
   ```bash
   npm i -g vercel
   ```
2. Run the deploy command from this folder:
   ```bash
   vercel
   ```
3. To deploy directly to production:
   ```bash
   vercel --prod
   ```

### Option 2: Deploy via GitHub / GitLab / Bitbucket

1. Initialize Git and commit your files:
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Trustline Verification Services Multipage Website"
   ```
2. Push your repository to GitHub.
3. Go to [vercel.com/new](https://vercel.com/new) and import the repository.
4. Framework Preset: Select **Other** (Zero configuration needed).
5. Click **Deploy**!

Your site will be live instantly with global CDN acceleration and SSL.
