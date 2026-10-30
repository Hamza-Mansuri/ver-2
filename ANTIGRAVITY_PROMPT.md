# Antigravity Prompt: Gomzi Life Science Export & CDMO Portal

Use the prompt below when starting a new session or repository with Antigravity:

```markdown
You are pairing on the official Gomzi Life Science LLP Export & CDMO Portal (V2).

### Project Overview
Gomzi Life Science LLP is a premier nutraceutical Contract Development & Manufacturing Organisation (CDMO) and international exporter based in Surat, Gujarat, India. The company manufactures and exports premium dietary supplements across 45+ global markets (US, GCC, Southeast Asia, UK/Europe, Africa).

### Core Product Capabilities & Formats
- **Sports Nutrition & Whey**: Cross-Flow Microfiltered Whey Protein Isolate (WPI 90%), WPC 80%, Micronized Creatine, Fermented BCAAs, Pre-Workouts.
- **Novel Gummy Formats**: 100% Citrus Pectin chewable supplements with 45°C thermal stability (melts-resistant in tropical climates), 100% Vegan, Halal & Kosher.
- **Effervescent & Single-Serve Sachets**: Low-humidity (<20% RH) cleanroom effervescent tablets and multi-lane powder stick packs for on-the-go hydration.
- **Custom Premixes & Microencapsulation**: Lipid/polymer shielded vitamins (A, D3, K2-MK7), botanical actives, and bioavailable mineral complexes.
- **Finished Dosage Forms**: HPMC vegetarian & gelatin capsules, film-coated caplets, chewables, and functional liquid elixirs.

### Tech Stack & Architecture
- **Frontend**: React 19, TypeScript, Vite, React Router v7, Lucide React icons.
- **Styling**: Semantic, responsive CSS design system rooted in earthy olive (`#20382b`), vibrant lime (`#99c229`), and warm off-white tones (`#fcfcf9`). Zero bloated CSS frameworks.
- **Static Assets**: Located in `frontend/public/assets/` (`video/`, `logos/`, `solutions/`, `gomzi-pages/`, `gallery/`, `certifications/`).
- **Tests & Verification**: High-rigor test suites in `frontend/scripts/test-e2e.mjs` (72 tests) and `frontend/scripts/test-adversarial.mjs` (22 tests).

### Key Pages & Routing Structure
1. **Home (`/`)**: Hero with self-hosted background video (`/assets/video/export-video.mp4`), interactive stats counter, 15-perspective company facility gallery, certifications grid, services, client logo infinite marquee (left-to-right), process workflow, and interactive global export map.
2. **Solutions (`/solutions`)**: Banner headline *"Your next market. Our shared ambition."* with 8 clickable solution cards linking to dedicated deep-dive pages (`/solutions/:slug`).
3. **Health Categories (`/health-categories`)**: Banner headline *"Nutrition for life. Ideas with purpose."* with 16 clickable health indication cards linking to dedicated formulation specification pages (`/health-categories/:slug`).
4. **Knowledge Hub & Blog (`/blog` and `/blog/:slug`)**: Full-featured industry blog hub covering whey protein, gummies, export dossiers, effervescents, and packaging. Supports category filtering, live keyword search, an interactive "Publish Article" modal with `localStorage` persistence, and reader views.
5. **Direct Inquiries**: Floating left-docked enquiry drawer, WhatsApp integration, and global modal with email/phone triggers.

### Development Guidelines
- Always ensure `npm run build --prefix frontend` completes with zero errors before finalizing work.
- Maintain responsive breakpoints: Desktop (>1050px), Tablet (768px-1050px), and Mobile (<768px).
- Respect accessibility: `aria-labelledby`, accessible labels on buttons, and `prefers-reduced-motion` compliance.
```

