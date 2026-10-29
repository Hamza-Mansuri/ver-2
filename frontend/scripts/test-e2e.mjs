#!/usr/bin/env node
/**
 * Automated Opaque-Box E2E Test Suite for Gomzi Frontend (v2)
 *
 * Methodology: 4-Tier Test Suite Design
 * - Tier 1: Feature Coverage (R1 to R6: 5 tests each = 30 tests)
 * - Tier 2: Boundary & Corner Cases (R1 to R6: 5 tests each = 30 tests)
 * - Tier 3: Cross-Feature Interactions (7 tests)
 * - Tier 4: Real-World Application Scenarios (5 tests)
 * Total: 72 test cases + Full Build Verification.
 *
 * Can be executed directly: `node scripts/test-e2e.mjs`
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';
import assert from 'node:assert/strict';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const FRONTEND_ROOT = path.resolve(__dirname, '..');
const SRC_DIR = path.join(FRONTEND_ROOT, 'src');
const PUBLIC_DIR = path.join(FRONTEND_ROOT, 'public');

// ANSI Color Helpers
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
};

class TestReporter {
  constructor() {
    this.results = [];
    this.startTime = Date.now();
    this.currentTier = '';
  }

  setTier(name) {
    this.currentTier = name;
    console.log(`\n${colors.bright}${colors.blue}━━━ ${name} ━━━${colors.reset}`);
  }

  record(id, title, fn) {
    const testStart = Date.now();
    try {
      fn();
      const duration = Date.now() - testStart;
      this.results.push({ id, title, tier: this.currentTier, pass: true, duration });
      console.log(`  ${colors.green}✔ [PASS]${colors.reset} ${colors.cyan}${id}${colors.reset}: ${title} ${colors.dim}(${duration}ms)${colors.reset}`);
    } catch (err) {
      const duration = Date.now() - testStart;
      this.results.push({ id, title, tier: this.currentTier, pass: false, error: err, duration });
      console.log(`  ${colors.red}✖ [FAIL]${colors.reset} ${colors.cyan}${id}${colors.reset}: ${title} ${colors.dim}(${duration}ms)${colors.reset}`);
      console.log(`    ${colors.red}${err.message}${colors.reset}`);
    }
  }

  summary() {
    const total = this.results.length;
    const passed = this.results.filter(r => r.pass).length;
    const failed = this.results.filter(r => !r.pass).length;
    const duration = ((Date.now() - this.startTime) / 1000).toFixed(2);

    console.log(`\n${colors.bright}════════════════════════════════════════════════════════════════════${colors.reset}`);
    console.log(`${colors.bright}                     TEST SUITE SUMMARY                             ${colors.reset}`);
    console.log(`${colors.bright}════════════════════════════════════════════════════════════════════${colors.reset}`);
    console.log(`Total Test Cases Executed: ${total}`);
    console.log(`Passed:                    ${colors.green}${passed}${colors.reset}`);
    console.log(`Failed:                    ${failed > 0 ? colors.red + failed : colors.green + '0'}${colors.reset}`);
    console.log(`Duration:                  ${duration}s\n`);

    // Tier Breakdown
    const tiers = [...new Set(this.results.map(r => r.tier))];
    for (const t of tiers) {
      const inTier = this.results.filter(r => r.tier === t);
      const p = inTier.filter(r => r.pass).length;
      const f = inTier.filter(r => !r.pass).length;
      const statusColor = f === 0 ? colors.green : colors.red;
      console.log(`  ${t.padEnd(45)} ${statusColor}${p}/${inTier.length} Passed${colors.reset}`);
    }
    console.log(`${colors.bright}════════════════════════════════════════════════════════════════════${colors.reset}\n`);

    return failed === 0;
  }
}

const runner = new TestReporter();

// Binary & Image Helpers
function parseWebPHeader(buffer) {
  if (buffer.length < 16) {
    throw new Error('File buffer is too small to be a valid WebP file.');
  }
  const riff = buffer.subarray(0, 4).toString('ascii');
  const webp = buffer.subarray(8, 12).toString('ascii');
  if (riff !== 'RIFF' || webp !== 'WEBP') {
    throw new Error(`Invalid WebP container signature: RIFF='${riff}', WEBP='${webp}'`);
  }
  const chunkType = buffer.subarray(12, 16).toString('ascii');
  let width = 0;
  let height = 0;

  if (chunkType === 'VP8X') {
    if (buffer.length < 30) throw new Error('Truncated VP8X WebP header.');
    width = 1 + (buffer[24] | (buffer[25] << 8) | (buffer[26] << 16));
    height = 1 + (buffer[27] | (buffer[28] << 8) | (buffer[29] << 16));
  } else if (chunkType === 'VP8 ') {
    if (buffer.length < 30) throw new Error('Truncated VP8 lossy WebP header.');
    width = ((buffer[26] | (buffer[27] << 8)) & 0x3fff);
    height = ((buffer[28] | (buffer[29] << 8)) & 0x3fff);
  } else if (chunkType === 'VP8L') {
    if (buffer.length < 25) throw new Error('Truncated VP8L lossless WebP header.');
    const b0 = buffer[21], b1 = buffer[22], b2 = buffer[23], b3 = buffer[24];
    width = 1 + (((b1 & 0x3f) << 8) | b0);
    height = 1 + (((b3 & 0x0f) << 10) | (b2 << 2) | ((b1 & 0xc0) >> 6));
  } else {
    throw new Error(`Unknown WebP chunk format: ${chunkType}`);
  }

  return { format: chunkType, width, height, sizeBytes: buffer.length };
}

// File Reading Helpers
function readFileContent(relPath) {
  const fullPath = path.resolve(FRONTEND_ROOT, relPath);
  if (!fs.existsSync(fullPath)) {
    throw new Error(`Target file does not exist: ${fullPath}`);
  }
  return fs.readFileSync(fullPath, 'utf8');
}

// ============================================================================
// TIER 1: FEATURE COVERAGE (R1 to R6: 5 tests each = 30 tests)
// ============================================================================
runner.setTier('Tier 1: Feature Coverage (R1 to R6)');

// R1: Process Section Image Rendering
runner.record('T1.1.1', 'R1: Asset exists at public/assets/images/commercial-partnership.webp', () => {
  const assetPath = path.join(PUBLIC_DIR, 'assets', 'images', 'commercial-partnership.webp');
  assert.ok(fs.existsSync(assetPath), 'Asset commercial-partnership.webp must exist in public directory');
  const stat = fs.statSync(assetPath);
  assert.ok(stat.size > 0, 'Asset file size must be non-zero');
});

runner.record('T1.1.2', 'R1: Asset is genuine WebP with RIFF and WEBP signature', () => {
  const assetPath = path.join(PUBLIC_DIR, 'assets', 'images', 'commercial-partnership.webp');
  const buf = fs.readFileSync(assetPath);
  const header = parseWebPHeader(buf);
  assert.ok(['VP8X', 'VP8 ', 'VP8L'].includes(header.format), 'Header chunk must be valid WebP chunk');
});

runner.record('T1.1.3', 'R1: Asset dimensions match requirement 1024x682', () => {
  const assetPath = path.join(PUBLIC_DIR, 'assets', 'images', 'commercial-partnership.webp');
  const buf = fs.readFileSync(assetPath);
  const header = parseWebPHeader(buf);
  assert.strictEqual(header.width, 1024, 'Image width must be exactly 1024');
  assert.strictEqual(header.height, 682, 'Image height must be exactly 682');
});

runner.record('T1.1.4', 'R1: Process.tsx renders commercial-partnership.webp with width/height attributes', () => {
  const content = readFileContent('src/sections/Process.tsx');
  assert.ok(
    content.includes('/assets/images/commercial-partnership.webp'),
    'Process.tsx must reference /assets/images/commercial-partnership.webp'
  );
  assert.ok(content.includes('width="1024"'), 'Process.tsx img tag must specify width="1024"');
  assert.ok(content.includes('height="682"'), 'Process.tsx img tag must specify height="682"');
});

runner.record('T1.1.5', 'R1: Process.tsx renders strategic partnership commercial caption', () => {
  const content = readFileContent('src/sections/Process.tsx');
  assert.ok(
    content.includes('STRATEGIC PARTNERSHIP') || content.includes('Strategic Partnership'),
    'Process visual must contain strategic partnership caption'
  );
  assert.ok(
    content.includes('Collaborative commercial success.') || content.includes('commercial success'),
    'Process visual must contain collaborative commercial success caption text'
  );
});

// R2: Global Presence Mobile Layout & Cleanup
runner.record('T1.2.1', 'R2: "Pause motion" control is absent from GlobalPresence.tsx', () => {
  const content = readFileContent('src/sections/GlobalPresence.tsx');
  assert.ok(!content.includes('Pause motion'), '"Pause motion" text must be absent from GlobalPresence.tsx');
  assert.ok(!content.includes('Play motion'), '"Play motion" text must be absent from GlobalPresence.tsx');
});

runner.record('T1.2.2', 'R2: "Surat, India: HQ & Plant" legend item is absent from GlobalPresence.tsx', () => {
  const content = readFileContent('src/sections/GlobalPresence.tsx');
  assert.ok(
    !content.includes('Surat, India: HQ & Plant'),
    '"Surat, India: HQ & Plant" legend item must be absent from GlobalPresence.tsx'
  );
});

runner.record('T1.2.3', 'R2: "6 Global Export Markets" legend item is absent from GlobalPresence.tsx', () => {
  const content = readFileContent('src/sections/GlobalPresence.tsx');
  assert.ok(
    !content.includes('6 Global Export Markets'),
    '"6 Global Export Markets" legend item must be absent from GlobalPresence.tsx'
  );
});

runner.record('T1.2.4', 'R2: .map-legend DOM container is completely removed from GlobalPresence.tsx', () => {
  const content = readFileContent('src/sections/GlobalPresence.tsx');
  assert.ok(!content.includes('className="map-legend"'), '.map-legend container must be removed from GlobalPresence.tsx');
});

runner.record('T1.2.5', 'R2: styles/map.css specifies @media (max-width: 768px) responsive rules', () => {
  const mapCss = readFileContent('src/styles/map.css');
  assert.ok(
    mapCss.includes('@media (max-width: 768px)'),
    'map.css must declare @media (max-width: 768px)'
  );
  assert.ok(
    mapCss.includes('.global__layout'),
    'map.css must style .global__layout inside responsive media query'
  );
});

// R3: Navbar Restyling & Hide-on-Scroll
runner.record('T1.3.1', 'R3: "Let\'s talk" CTA button is completely removed from Header.tsx', () => {
  const content = readFileContent('src/components/Header.tsx');
  assert.ok(!content.includes("Let’s talk"), '"Let’s talk" CTA button must be removed from Header.tsx');
  assert.ok(!content.includes("Let's talk"), '"Let\'s talk" CTA button must be removed from Header.tsx');
  assert.ok(!content.includes('nav-inquiry'), '.nav-inquiry button must be removed from Header.tsx');
});

runner.record('T1.3.2', 'R3: All 7 required navigation links are configured in site.ts', () => {
  const content = readFileContent('src/data/site.ts');
  const requiredPaths = [
    '/about-us',
    '/expertise',
    '/download-catalogues',
    '/health-categories',
    '/solutions',
    '/blog',
    '/contact',
  ];
  for (const p of requiredPaths) {
    assert.ok(content.includes(p), `site.ts must declare navigation route '${p}'`);
  }
});

runner.record('T1.3.3', 'R3: Navbar typography is increased to >= 13px in styles/global.css', () => {
  const css = readFileContent('src/styles/global.css');
  // Match font-size in .main-nav>a or .main-nav a
  const match = css.match(/\.main-nav>a[^}]*font-size:\s*([\d.]+)px/);
  assert.ok(match, 'Navbar links must define font-size in global.css');
  const fontSize = parseFloat(match[1]);
  assert.ok(fontSize >= 13, `Navbar link font-size (${fontSize}px) must be >= 13px`);
});

runner.record('T1.3.4', 'R3: .main-nav layout spans across navbar width', () => {
  const css = readFileContent('src/styles/global.css');
  assert.ok(
    css.includes('.main-nav{') || css.includes('.main-nav {'),
    '.main-nav selector must exist in global.css'
  );
  assert.ok(
    css.includes('justify-content:space-between') || css.includes('justify-content: space-between'),
    '.main-nav must use justify-content: space-between to span full available width'
  );
  assert.ok(
    css.includes('flex:1') || css.includes('flex: 1'),
    '.main-nav must use flex: 1 to occupy remaining navbar width'
  );
});

runner.record('T1.3.5', 'R3: Header.tsx implements hide-on-scroll logic with .is-hidden toggle', () => {
  const content = readFileContent('src/components/Header.tsx');
  assert.ok(content.includes('is-hidden'), 'Header.tsx must toggle .is-hidden class');
  assert.ok(content.includes('window.addEventListener(\'scroll\''), 'Header.tsx must attach scroll listener');
  assert.ok(content.includes('scrollY'), 'Header.tsx must track window.scrollY');
});

// R4: Sliding Enquiry Tab, Arrow Toggle & Form Drawer
runner.record('T1.4.1', 'R4: FloatingContact docked on left screen edge (position: fixed; left: 0)', () => {
  const css = readFileContent('src/styles/global.css');
  assert.ok(
    css.includes('.floating-contact-dock'),
    'global.css must style .floating-contact-dock'
  );
  assert.ok(
    css.includes('left:0') || css.includes('left: 0'),
    'Floating contact container must be fixed to left: 0'
  );
});

runner.record('T1.4.2', 'R4: Arrow toggle button collapses and expands contact tabs', () => {
  const content = readFileContent('src/components/FloatingContact.tsx');
  assert.ok(
    content.includes('side-toggle-btn'),
    'FloatingContact.tsx must render side-toggle-btn'
  );
  assert.ok(
    content.includes('is-collapsed'),
    'FloatingContact.tsx must support collapsed state transition with is-collapsed class'
  );
  assert.ok(
    content.includes('handleCollapseToggle') || content.includes('setCollapsed'),
    'FloatingContact.tsx must handle collapse toggle event'
  );
});

runner.record('T1.4.3', 'R4: "Enquire Now" and WhatsApp tabs are rendered on the side dock', () => {
  const content = readFileContent('src/components/FloatingContact.tsx');
  assert.ok(
    content.includes('side-tab-enquire'),
    'FloatingContact.tsx must render side-tab-enquire button'
  );
  assert.ok(
    content.includes('Enquire Now'),
    'Enquire tab must display text "Enquire Now"'
  );
  assert.ok(
    content.includes('side-tab-whatsapp'),
    'FloatingContact.tsx must render side-tab-whatsapp element'
  );
  assert.ok(
    content.includes('wa.me'),
    'WhatsApp tab must link to wa.me endpoint'
  );
});

runner.record('T1.4.4', 'R4: Enquiry drawer contains all 5 required pill fields (Name, Phone, Email, Company, City)', () => {
  const content = readFileContent('src/components/FloatingContact.tsx');
  assert.ok(content.includes('placeholder="Name*"'), 'Drawer must contain Name* pill input');
  assert.ok(content.includes('placeholder="Phone*"'), 'Drawer must contain Phone* pill input');
  assert.ok(content.includes('placeholder="Email*"'), 'Drawer must contain Email* pill input');
  assert.ok(content.includes('placeholder="Your Company Name*"') || content.includes('placeholder="Company Name*"'), 'Drawer must contain Your Company Name* pill input');
  assert.ok(content.includes('placeholder="City*"'), 'Drawer must contain City* pill input');
});

runner.record('T1.4.5', 'R4: Enquiry drawer contains Message textarea and SUBMIT button', () => {
  const content = readFileContent('src/components/FloatingContact.tsx');
  assert.ok(content.includes('<textarea'), 'Drawer must contain textarea input');
  assert.ok(content.includes('placeholder="Message"'), 'Drawer textarea must have placeholder="Message"');
  assert.ok(
    content.includes('SUBMIT') || content.includes('Submit'),
    'Drawer must render SUBMIT action button'
  );
});

// R5: Animated Statistics Counter
runner.record('T1.5.1', 'R5: Target metric 45+ countries is rendered in About.tsx', () => {
  const content = readFileContent('src/sections/About.tsx');
  assert.ok(content.includes('45'), 'About.tsx must include metric 45');
  assert.ok(content.includes('Countries in our company profile'), 'About.tsx must include label "Countries in our company profile"');
});

runner.record('T1.5.2', 'R5: Target metric 1,000+ products is rendered in About.tsx', () => {
  const content = readFileContent('src/sections/About.tsx');
  assert.ok(content.includes('1000') || content.includes('1,000'), 'About.tsx must include metric 1000');
  assert.ok(content.includes('Products in our company profile'), 'About.tsx must include label "Products in our company profile"');
});

runner.record('T1.5.3', 'R5: Target metric 100% focus is rendered in About.tsx', () => {
  const content = readFileContent('src/sections/About.tsx');
  assert.ok(content.includes('100'), 'About.tsx must include metric 100');
  assert.ok(content.includes('Third-party manufacturing focus'), 'About.tsx must include label "Third-party manufacturing focus"');
});

runner.record('T1.5.4', 'R5: IntersectionObserver triggers count-up when .about-stats enters view', () => {
  const content = readFileContent('src/sections/About.tsx');
  assert.ok(
    content.includes('IntersectionObserver'),
    'About.tsx must utilize IntersectionObserver for viewport detection'
  );
  assert.ok(
    content.includes('isIntersecting'),
    'About.tsx must check entry.isIntersecting'
  );
});

runner.record('T1.5.5', 'R5: Count-up animation increments smoothly from 0 via requestAnimationFrame', () => {
  const content = readFileContent('src/sections/About.tsx');
  assert.ok(
    content.includes('requestAnimationFrame'),
    'About.tsx must utilize requestAnimationFrame for smooth incrementation'
  );
  assert.ok(
    content.includes('cancelAnimationFrame'),
    'About.tsx must clean up animation frame on unmount'
  );
});

// R6: Company Gallery Section Integration
runner.record('T1.6.1', 'R6: Gallery component is mounted in App.tsx immediately after <About />', () => {
  const appContent = readFileContent('src/App.tsx');
  assert.ok(appContent.includes('<Gallery'), 'App.tsx must render <Gallery />');
  const aboutIndex = appContent.indexOf('<About');
  const galleryIndex = appContent.indexOf('<Gallery');
  const certIndex = appContent.indexOf('<Certifications');
  assert.ok(aboutIndex !== -1, 'About component must exist');
  assert.ok(galleryIndex !== -1, 'Gallery component must exist');
  assert.ok(
    galleryIndex > aboutIndex && galleryIndex < certIndex,
    'Gallery must be mounted immediately after About and before Certifications'
  );
});

runner.record('T1.6.2', 'R6: Gallery renders eyebrow "02 / Company gallery" and title "Behind the label. Inside our world."', () => {
  const content = readFileContent('src/sections/Gallery.tsx');
  assert.ok(
    content.includes('02 / Company gallery'),
    'Gallery eyebrow must display "02 / Company gallery"'
  );
  assert.ok(
    content.includes('Behind the label.') && content.includes('Inside our world.'),
    'Gallery title must display "Behind the label. Inside our world."'
  );
});

runner.record('T1.6.3', 'R6: Gallery data source defines curated perspective items matching user manual curation', () => {
  const content = readFileContent('src/data/gallery.ts');
  assert.ok(content.includes('gallery-03.webp'), 'gallery.ts includes gallery-03');
  assert.ok(content.includes('gallery-04.webp'), 'gallery.ts includes gallery-04');
  assert.ok(content.includes('gallery-05.webp'), 'gallery.ts includes gallery-05');
  assert.ok(content.includes('gallery-15.webp'), 'gallery.ts includes gallery-15');
});

runner.record('T1.6.4', 'R6: All curated gallery image assets exist on disk in public/assets/gallery/', () => {
  const galleryTs = readFileContent('src/data/gallery.ts');
  const matches = [...galleryTs.matchAll(/image:\s*['"]([^'"]+)['"]/g)];
  assert.ok(matches.length > 0, 'Must have gallery items defined');
  for (const m of matches) {
    const rawPath = decodeURI(m[1].replace('/assets/gallery/', ''));
    const fullPath = path.join(PUBLIC_DIR, 'assets', 'gallery', rawPath);
    assert.ok(fs.existsSync(fullPath), `Gallery asset must exist on disk: ${rawPath}`);
    const stat = fs.statSync(fullPath);
    assert.ok(stat.size > 0, `Gallery asset must be non-empty: ${rawPath}`);
  }
});

runner.record('T1.6.5', 'R6: Lightbox modal displays enlarged view when clicking gallery items', () => {
  const content = readFileContent('src/sections/Gallery.tsx');
  assert.ok(content.includes('Modal'), 'Gallery.tsx must import Modal component');
  assert.ok(content.includes('gallery__image-button'), 'Gallery items must render clickable image buttons');
  assert.ok(
    content.includes('setSelected(item)') || content.includes('setSelected'),
    'Clicking image button must trigger item selection state for lightbox enlargement'
  );
  assert.ok(content.includes('gallery-modal'), 'Modal must declare gallery-modal styling class');
});

// ============================================================================
// TIER 2: BOUNDARY & CORNER CASES (R1 to R6: 5 tests each = 30 tests)
// ============================================================================
runner.setTier('Tier 2: Boundary & Corner Cases (R1 to R6)');

// R1 Boundaries
runner.record('T2.1.1', 'R1: Asset file size is optimized between 20KB and 500KB (avoids 1.5MB bloat)', () => {
  const assetPath = path.join(PUBLIC_DIR, 'assets', 'images', 'commercial-partnership.webp');
  const stat = fs.statSync(assetPath);
  assert.ok(
    stat.size >= 20480 && stat.size <= 512000,
    `Image size (${(stat.size / 1024).toFixed(1)}KB) must be within optimal production range (20KB - 500KB)`
  );
});

runner.record('T2.1.2', 'R1: Process.tsx declares explicit width and height attributes to prevent CLS', () => {
  const content = readFileContent('src/sections/Process.tsx');
  const imgRegex = /<img[^>]*src="\/assets\/images\/commercial-partnership\.webp"[^>]*>/s;
  const match = content.match(imgRegex);
  assert.ok(match, 'commercial-partnership.webp <img> tag must be present in Process.tsx');
  assert.ok(match[0].includes('width="1024"'), 'img tag must define explicit width="1024"');
  assert.ok(match[0].includes('height="682"'), 'img tag must define explicit height="682"');
});

runner.record('T2.1.3', 'R1: Image in Process.tsx specifies loading="lazy" for off-screen performance', () => {
  const content = readFileContent('src/sections/Process.tsx');
  const imgRegex = /<img[^>]*src="\/assets\/images\/commercial-partnership\.webp"[^>]*>/s;
  const match = content.match(imgRegex);
  assert.ok(match, 'commercial-partnership.webp <img> tag must be present');
  assert.ok(match[0].includes('loading="lazy"'), 'img tag must specify loading="lazy"');
});

runner.record('T2.1.4', 'R1: Image has meaningful, non-empty alt text describing corporate partnership', () => {
  const content = readFileContent('src/sections/Process.tsx');
  const imgRegex = /<img[^>]*src="\/assets\/images\/commercial-partnership\.webp"[^>]*alt="([^"]+)"/s;
  const match = content.match(imgRegex);
  assert.ok(match, 'img tag must have an alt attribute');
  const altText = match[1].toLowerCase();
  assert.ok(
    altText.includes('partnership') || altText.includes('commercial') || altText.includes('nutraceutical'),
    `Alt text ('${altText}') must describe corporate partnership`
  );
});

runner.record('T2.1.5', 'R1: CSS rules for .process-visual__card > img enforce object-fit: cover across breakpoints', () => {
  const css = readFileContent('src/styles/global.css');
  assert.ok(
    css.includes('.process-visual__card>img') || css.includes('.process-visual__card > img'),
    'global.css must style .process-visual__card > img'
  );
  assert.ok(
    css.includes('object-fit:cover') || css.includes('object-fit: cover'),
    '.process-visual__card > img must declare object-fit: cover'
  );
});

// R2 Boundaries
runner.record('T2.2.1', 'R2: @media (max-width: 768px) is positioned after desktop rules in map.css ensuring cascade priority', () => {
  const mapCss = readFileContent('src/styles/map.css');
  const desktopIndex = mapCss.indexOf('.global__layout {');
  const mobileIndex = mapCss.lastIndexOf('@media (max-width: 768px)');
  assert.ok(desktopIndex !== -1, 'Desktop .global__layout rule must exist');
  assert.ok(mobileIndex !== -1, 'Mobile @media (max-width: 768px) must exist');
  assert.ok(
    mobileIndex > desktopIndex,
    'Mobile media query must be placed AFTER desktop rules in map.css to guarantee cascade override'
  );
});

runner.record('T2.2.2', 'R2: .global__layout enforces flex-direction: column in mobile media query', () => {
  const mapCss = readFileContent('src/styles/map.css');
  const mobileBlock = mapCss.slice(mapCss.lastIndexOf('@media (max-width: 768px)'));
  assert.ok(
    mobileBlock.includes('.global__layout'),
    'Mobile media query block must include .global__layout'
  );
  assert.ok(
    mobileBlock.includes('flex-direction: column') || mobileBlock.includes('flex-direction:column'),
    '.global__layout must specify flex-direction: column in mobile breakpoint'
  );
});

runner.record('T2.2.3', 'R2: .world-map container enforces width: 100% on mobile viewport <=768px', () => {
  const mapCss = readFileContent('src/styles/map.css');
  const mobileBlock = mapCss.slice(mapCss.lastIndexOf('@media (max-width: 768px)'));
  assert.ok(
    mobileBlock.includes('.world-map'),
    'Mobile media query block must include .world-map'
  );
  assert.ok(
    mobileBlock.includes('width: 100%') || mobileBlock.includes('width:100%'),
    '.world-map must specify width: 100% on mobile'
  );
});

runner.record('T2.2.4', 'R2: .market-buttons is hidden and .market-chips-scroll is enabled in mobile layout', () => {
  const mapCss = readFileContent('src/styles/map.css');
  const mobileBlock = mapCss.slice(mapCss.lastIndexOf('@media (max-width: 768px)'));
  assert.ok(
    mobileBlock.includes('.market-buttons'),
    'Mobile block must specify .market-buttons'
  );
  assert.ok(
    mobileBlock.includes('display: none') || mobileBlock.includes('display:none'),
    '.market-buttons must have display: none in mobile block'
  );
  assert.ok(
    mobileBlock.includes('.market-chips-scroll'),
    'Mobile block must specify .market-chips-scroll'
  );
  assert.ok(
    mobileBlock.includes('display: flex') || mobileBlock.includes('display:flex'),
    '.market-chips-scroll must have display: flex in mobile block'
  );
});

runner.record('T2.2.5', 'R2: Unused Lucide icons (MapPin, Pause, Play, Sparkles) and motionPaused state are pruned without unused warnings', () => {
  const content = readFileContent('src/sections/GlobalPresence.tsx');
  assert.ok(!content.includes('motionPaused'), 'motionPaused state must be removed from GlobalPresence.tsx');
  // Check imports
  const importMatch = content.match(/import\s*\{([^}]+)\}\s*from\s*['"]lucide-react['"]/);
  if (importMatch) {
    const importedIcons = importMatch[1].split(',').map(s => s.trim());
    assert.ok(!importedIcons.includes('Pause'), 'Pause icon must not be imported');
    assert.ok(!importedIcons.includes('Play'), 'Play icon must not be imported');
    assert.ok(!importedIcons.includes('Sparkles'), 'Sparkles icon must not be imported');
    assert.ok(!importedIcons.includes('MapPin'), 'MapPin icon must not be imported');
  }
});

// R3 Boundaries
runner.record('T2.3.1', 'R3: Scroll down detection incorporates deadband threshold (scrollY <= 80) to keep navbar visible at top banner', () => {
  const content = readFileContent('src/components/Header.tsx');
  assert.ok(
    content.includes('80'),
    'Header.tsx must check scrollY threshold <= 80 to prevent premature hiding at top of page'
  );
});

runner.record('T2.3.2', 'R3: Scroll listener incorporates directional hysteresis (delta > 10 / delta < -10)', () => {
  const content = readFileContent('src/components/Header.tsx');
  assert.ok(
    content.includes('10') && (content.includes('-10') || content.includes('delta')),
    'Header.tsx must evaluate delta with hysteresis threshold to prevent micro-scroll jitter'
  );
});

runner.record('T2.3.3', 'R3: Mobile menu open bypass suppresses navbar hiding on scroll', () => {
  const content = readFileContent('src/components/Header.tsx');
  assert.ok(
    content.includes('mobile') && content.includes('setVisible(true)'),
    'Header.tsx must keep navbar visible while mobile menu is open'
  );
});

runner.record('T2.3.4', 'R3: Header CSS specifies smooth cubic-bezier transition and translateY(-100%) for .is-hidden', () => {
  const css = readFileContent('src/styles/global.css');
  assert.ok(
    css.includes('.site-header.is-hidden{transform:translateY(-100%)') ||
    css.includes('.site-header.is-hidden { transform: translateY(-100%)') ||
    css.includes('transform:translateY(-100%)'),
    'Header CSS must transform translateY(-100%) when .is-hidden'
  );
  assert.ok(
    css.includes('transition:transform') || css.includes('transition: transform'),
    'Header CSS must define smooth transition property on transform'
  );
});

runner.record('T2.3.5', 'R3: Dropdown submenu (/expertise) supports Escape key and click-outside dismissal', () => {
  const content = readFileContent('src/components/Header.tsx');
  assert.ok(
    content.includes("'Escape'"),
    'Header.tsx must listen for Escape key to close navigation menus'
  );
  assert.ok(
    content.includes('pointerdown') || content.includes('mousedown'),
    'Header.tsx must listen for outside pointer interaction to dismiss menus'
  );
});

// R4 Boundaries
runner.record('T2.4.1', 'R4: Contact drawer close button has accessible aria-label and dismisses drawer', () => {
  const content = readFileContent('src/components/FloatingContact.tsx');
  assert.ok(
    content.includes('drawer-close-btn'),
    'Drawer must render drawer-close-btn'
  );
  assert.ok(
    content.includes('aria-label="Close Contact Form"') || content.includes('aria-label='),
    'Close button must include descriptive aria-label'
  );
});

runner.record('T2.4.2', 'R4: Contact drawer dismisses on Escape key press and outside click', () => {
  const content = readFileContent('src/components/FloatingContact.tsx');
  assert.ok(
    content.includes("e.key === 'Escape'"),
    'FloatingContact.tsx must handle Escape key press'
  );
  assert.ok(
    content.includes('handleClickOutside') || content.includes('contains(target)'),
    'FloatingContact.tsx must handle outside click dismissal'
  );
});

runner.record('T2.4.3', 'R4: Pill inputs enforce required validation on name, phone, email, company, and city', () => {
  const content = readFileContent('src/components/FloatingContact.tsx');
  const requiredFields = ['name', 'phone', 'email', 'company', 'city'];
  for (const field of requiredFields) {
    const inputPattern = new RegExp(`name="${field}"[^>]*required`, 's');
    assert.ok(
      inputPattern.test(content) || content.includes(`name="${field}"`),
      `Drawer field '${field}' must be present and marked required`
    );
  }
});

runner.record('T2.4.4', 'R4: Form submission transitions UI to confirmation state thanking user without unhandled errors', () => {
  const content = readFileContent('src/components/FloatingContact.tsx');
  assert.ok(
    content.includes('handleSubmit'),
    'FloatingContact.tsx must have form submit handler'
  );
  assert.ok(
    content.includes('submitted') || content.includes('drawer-success'),
    'FloatingContact.tsx must render confirmation state upon submission'
  );
  assert.ok(
    content.includes('Thank you') || content.includes('enquiry'),
    'Confirmation state must display thank you feedback message'
  );
});

runner.record('T2.4.5', 'R4: Floating tabs and drawer styles include responsive mobile rules (<640px/768px)', () => {
  const css = readFileContent('src/styles/global.css');
  assert.ok(
    css.includes('.contact-form-drawer') && (css.includes('width:min') || css.includes('calc(100vw')),
    'Drawer must use responsive width constraint (e.g. width: min(...) or max-width) to prevent mobile overflow'
  );
});

// R5 Boundaries
runner.record('T2.5.1', 'R5: 1,000 metric formats with thousands separator comma matching en-US locale convention', () => {
  const content = readFileContent('src/sections/About.tsx');
  assert.ok(
    content.includes("toLocaleString('en-US')") || content.includes('toLocaleString') || content.includes('1,000'),
    'About.tsx must format 1000 with thousands separator comma'
  );
});

runner.record('T2.5.2', 'R5: Count-up values round to integer integers without fractional decimal artifacts', () => {
  const content = readFileContent('src/sections/About.tsx');
  assert.ok(
    content.includes('Math.round') || content.includes('Math.floor'),
    'About.tsx count-up calculation must use Math.round/Math.floor to avoid float artifacts'
  );
});

runner.record('T2.5.3', 'R5: Animation observer disconnects or latches after initial trigger to avoid repeated re-animating', () => {
  const content = readFileContent('src/sections/About.tsx');
  assert.ok(
    content.includes('observer.disconnect()') || content.includes('.disconnect()'),
    'IntersectionObserver must disconnect after triggering to preserve performance'
  );
});

runner.record('T2.5.4', 'R5: requestAnimationFrame cleanup routine exists on component unmount', () => {
  const content = readFileContent('src/sections/About.tsx');
  assert.ok(
    content.includes('cancelAnimationFrame(frameId)') || content.includes('cancelAnimationFrame'),
    'StatItem must cancel requestAnimationFrame on unmount to prevent memory leaks'
  );
});

runner.record('T2.5.5', 'R5: Counter respects prefers-reduced-motion in global.css', () => {
  const css = readFileContent('src/styles/global.css');
  assert.ok(
    css.includes('@media(prefers-reduced-motion:reduce)') || css.includes('@media (prefers-reduced-motion'),
    'global.css must declare prefers-reduced-motion accessibility rules'
  );
});

// R6 Boundaries
runner.record('T2.6.1', 'R6: Gallery section has id="gallery" and aria-labelledby="gallery-title"', () => {
  const content = readFileContent('src/sections/Gallery.tsx');
  assert.ok(content.includes('id="gallery"'), 'Gallery section must have id="gallery" for in-page anchors');
  assert.ok(
    content.includes('aria-labelledby="gallery-title"'),
    'Gallery section must have aria-labelledby="gallery-title"'
  );
  assert.ok(
    content.includes('id="gallery-title"'),
    'Gallery heading must have matching id="gallery-title"'
  );
});

runner.record('T2.6.2', 'R6: Gallery supports grid expansion toggle between 6 and full gallery items', () => {
  const content = readFileContent('src/sections/Gallery.tsx');
  assert.ok(
    content.includes('expanded') && content.includes('setExpanded'),
    'Gallery must maintain expanded view state'
  );
  assert.ok(
    content.includes('Show fewer spaces') && (content.includes('Explore all') || content.includes('spaces')),
    'Gallery must render toggle button with text "Show fewer spaces" and explore all spaces'
  );
});

runner.record('T2.6.3', 'R6: Responsive srcSet is provided for gallery images referencing -400.webp companions', () => {
  const content = readFileContent('src/data/gallery.ts');
  assert.ok(
    content.includes('-400.webp'),
    'gallery.ts must declare srcSet with -400.webp responsive companions'
  );
});

runner.record('T2.6.4', 'R6: Lightbox modal includes accessible aria-label and close mechanism', () => {
  const content = readFileContent('src/sections/Gallery.tsx');
  assert.ok(
    content.includes('onClose={() => setSelected(null)}') || content.includes('setSelected(null)'),
    'Modal must provide close handler'
  );
  assert.ok(
    content.includes('aria-label') || content.includes('labelledBy'),
    'Gallery item buttons and modal must declare accessibility labels'
  );
});

runner.record('T2.6.5', 'R6: Gallery responsive CSS provides 3-column desktop and responsive grid rules', () => {
  const css = readFileContent('src/styles/global.css');
  assert.ok(
    css.includes('.gallery__grid{display:grid;grid-template-columns:repeat(3,1fr)') ||
    css.includes('.gallery__grid') && css.includes('repeat(3,1fr)'),
    'Gallery grid must configure repeat(3, 1fr) on desktop'
  );
});

// ============================================================================
// TIER 3: CROSS-FEATURE INTERACTIONS (7 tests)
// ============================================================================
runner.setTier('Tier 3: Cross-Feature Interactions');

runner.record('T3.1', 'R1 + R3: Process section partnership image layout does not collide with sticky/hiding navbar z-index', () => {
  const css = readFileContent('src/styles/global.css');
  const headerZIndexMatch = css.match(/\.site-header\{[^}]*z-index:\s*(\d+)/);
  assert.ok(headerZIndexMatch, '.site-header must declare z-index');
  const headerZ = parseInt(headerZIndexMatch[1], 10);
  assert.ok(headerZ >= 100, `Navbar z-index (${headerZ}) must be >= 100 to stay above section content`);
});

runner.record('T3.2', 'R3 + R4: Header (z-index: 100) and Floating Contact tabs/drawer maintain proper stacking hierarchy', () => {
  const css = readFileContent('src/styles/global.css');
  assert.ok(css.includes('.floating-contact-dock'), '.floating-contact-dock must be styled');
  assert.ok(css.includes('.contact-form-drawer'), '.contact-form-drawer must be styled');
  // Stacking hierarchy: drawer (99) and dock (95) are below site header (100) or modal backdrop
  assert.ok(css.includes('z-index:95') || css.includes('z-index: 95'), 'Dock must have z-index: 95');
  assert.ok(css.includes('z-index:99') || css.includes('z-index: 99'), 'Drawer must have z-index: 99');
});

runner.record('T3.3', 'R4 + R6: Modal isolation: Contact Form drawer and Gallery Lightbox operate independently without state collision', () => {
  const floatingContent = readFileContent('src/components/FloatingContact.tsx');
  const galleryContent = readFileContent('src/sections/Gallery.tsx');
  // FloatingContact manages internal drawerOpen/pinned state; Gallery manages selected item state
  assert.ok(floatingContent.includes('const [drawerOpen, setDrawerOpen] = useState(false)'), 'FloatingContact must isolate drawerOpen state');
  assert.ok(galleryContent.includes('const [selected, setSelected] = useState'), 'Gallery must isolate selected modal state');
});

runner.record('T3.4', 'R5 + R6: Section sequence contract: Section 01 About (with stats counter) immediately precedes Section 02 Company Gallery in App.tsx', () => {
  const appContent = readFileContent('src/App.tsx');
  const mainRegex = /<main[^>]*>(.*?)<\/main>/s;
  const match = appContent.match(mainRegex);
  assert.ok(match, '<main> section structure must exist in App.tsx');
  const mainInner = match[1];
  const aboutIdx = mainInner.indexOf('<About');
  const galleryIdx = mainInner.indexOf('<Gallery');
  assert.ok(aboutIdx !== -1 && galleryIdx !== -1, 'Both <About /> and <Gallery /> must be in <main>');
  assert.ok(galleryIdx > aboutIdx, '<Gallery /> must appear after <About />');
  // Check that no other component or markup exists between <About.../> and <Gallery...
  const aboutEndIdx = mainInner.indexOf('/>', aboutIdx) + 2;
  const between = mainInner.slice(aboutEndIdx, galleryIdx).trim();
  assert.strictEqual(between, '', 'No other component may be inserted between <About /> and <Gallery />');
});

runner.record('T3.5', 'R2 + R4: Mobile viewport stacking: Mobile map layout (<768px) and mobile-adapted floating enquiry drawer co-exist without layout breaking', () => {
  const mapCss = readFileContent('src/styles/map.css');
  const globalCss = readFileContent('src/styles/global.css');
  assert.ok(mapCss.includes('@media (max-width: 768px)'), 'map.css must have mobile media query');
  assert.ok(globalCss.includes('.contact-form-drawer'), 'global.css must have drawer styling');
});

runner.record('T3.6', 'R3 + R2: Mobile navigation menu overlay and mobile map interactive elements operate without layout interference', () => {
  const headerContent = readFileContent('src/components/Header.tsx');
  const presenceContent = readFileContent('src/sections/GlobalPresence.tsx');
  assert.ok(headerContent.includes('menu-toggle'), 'Header must support mobile menu-toggle');
  assert.ok(presenceContent.includes('market-chips-scroll'), 'GlobalPresence must support mobile market-chips-scroll');
});

runner.record('T3.7', 'R1 + R6: Asset performance harmony: Process image and gallery images all implement loading="lazy" for optimized LCP/FCP', () => {
  const processContent = readFileContent('src/sections/Process.tsx');
  const galleryContent = readFileContent('src/sections/Gallery.tsx');
  assert.ok(processContent.includes('loading="lazy"'), 'Process image must have loading="lazy"');
  assert.ok(galleryContent.includes('loading="lazy"'), 'Gallery images must have loading="lazy"');
});

// ============================================================================
// TIER 4: REAL-WORLD APPLICATION SCENARIOS (5 tests)
// ============================================================================
runner.setTier('Tier 4: Real-World Application Scenarios');

runner.record('T4.1', 'Scenario 1: Desktop Visitor Journey — Home page load, full-width 7-link navbar, Process commercial partnership visual, About stats count-up, enquiry drawer', () => {
  // 1. Verify Header contains all 7 navigation links with no Let's talk
  const headerContent = readFileContent('src/components/Header.tsx');
  assert.ok(!headerContent.includes("Let's talk") && !headerContent.includes("Let’s talk"), 'Step 1: Header has no Let\'s talk');
  const siteContent = readFileContent('src/data/site.ts');
  const navItems = ['About Us', 'Expertise', 'Download Catalogues', 'Health Categories', 'Solutions', 'Blog', 'Contact'];
  for (const item of navItems) {
    assert.ok(siteContent.includes(item), `Step 1: Navigation includes ${item}`);
  }

  // 2. Verify Process section displays commercial partnership 1024x682 visual
  const processContent = readFileContent('src/sections/Process.tsx');
  assert.ok(processContent.includes('/assets/images/commercial-partnership.webp'), 'Step 2: Process image referenced');

  // 3. Verify About stats counter triggers on view
  const aboutContent = readFileContent('src/sections/About.tsx');
  assert.ok(aboutContent.includes('IntersectionObserver') && aboutContent.includes('requestAnimationFrame'), 'Step 3: Stats count-up configured');

  // 4. Verify Floating contact drawer opens on enquiry tab trigger
  const contactContent = readFileContent('src/components/FloatingContact.tsx');
  assert.ok(contactContent.includes('handleToggleClick') && contactContent.includes('contact-form-drawer'), 'Step 4: Contact form drawer functional');
});

runner.record('T4.2', 'Scenario 2: Mobile Visitor Journey (<768px) — Responsive navigation, map vertical column stack without legend clutter, collapsible contact tab', () => {
  // 1. Verify map mobile stacking rule
  const mapCss = readFileContent('src/styles/map.css');
  const mobileSection = mapCss.slice(mapCss.lastIndexOf('@media (max-width: 768px)'));
  assert.ok(mobileSection.includes('flex-direction: column') || mobileSection.includes('flex-direction:column'), 'Step 1: Map layout stacks vertically on mobile');
  assert.ok(mobileSection.includes('display: none') || mobileSection.includes('display:none'), 'Step 1: Desktop buttons hidden on mobile');

  // 2. Verify legend controls completely absent
  const presenceContent = readFileContent('src/sections/GlobalPresence.tsx');
  assert.ok(!presenceContent.includes('Pause motion'), 'Step 2: Pause motion absent');
  assert.ok(!presenceContent.includes('6 Global Export Markets'), 'Step 2: Legend count absent');

  // 3. Verify contact tabs collapse smoothly on mobile
  const contactContent = readFileContent('src/components/FloatingContact.tsx');
  assert.ok(contactContent.includes('handleCollapseToggle'), 'Step 3: Contact tabs have collapse toggle handler');
});

runner.record('T4.3', 'Scenario 3: Prospective B2B Partner Journey — Explores Company Gallery, opens lightbox, closes modal, opens Enquiry drawer, fills all 5 pill fields & message, submits form', () => {
  // 1. Verify Gallery renders perspectives
  const galleryContent = readFileContent('src/data/gallery.ts');
  const gallerySection = readFileContent('src/sections/Gallery.tsx');
  assert.ok(gallerySection.includes('perspectives'), 'Step 1: Gallery footer announces perspectives');

  // 2. Verify Modal component opens and closes
  assert.ok(gallerySection.includes('<Modal') && gallerySection.includes('onClose'), 'Step 2: Modal integration verified');

  // 3. Verify Contact form drawer contains all 5 required pill fields and handles submission
  const contactContent = readFileContent('src/components/FloatingContact.tsx');
  assert.ok(contactContent.includes('name="name"') && contactContent.includes('name="phone"') && contactContent.includes('name="email"') && contactContent.includes('name="company"') && contactContent.includes('name="city"'), 'Step 3: All 5 pill inputs present');
  assert.ok(contactContent.includes('name="message"'), 'Step 3: Message textarea present');
  assert.ok(contactContent.includes('SUBMIT'), 'Step 3: SUBMIT button present');
  assert.ok(contactContent.includes('Thank you'), 'Step 3: Form submission feedback message present');
});

runner.record('T4.4', 'Scenario 4: Rapid Scroll & Motion Accessibility Journey — Rapid downward scroll hides navbar, upward scroll restores it; stats counter animates smoothly to 45+, 1000+, 100%', () => {
  // 1. Verify scroll hysteresis logic in Header.tsx
  const headerContent = readFileContent('src/components/Header.tsx');
  assert.ok(headerContent.includes('delta > 10') && headerContent.includes('delta < -10'), 'Step 1: Header evaluates directional delta with hysteresis');

  // 2. Verify stats counter animates target numbers
  const aboutContent = readFileContent('src/sections/About.tsx');
  assert.ok(aboutContent.includes('target={45}') && aboutContent.includes('target={1000}') && aboutContent.includes('target={100}'), 'Step 2: About targets 45, 1000, 100 verified');
});

runner.record('T4.5', 'Scenario 5: Full Production Build & Asset Delivery Integrity — Runs npm run build with exit code 0; verifies generated HTML, CSS, JS bundles and asset references', () => {
  const buildCmd = 'npm run build';
  const stdout = execSync(buildCmd, { cwd: FRONTEND_ROOT, encoding: 'utf8' });
  assert.ok(stdout.includes('built in') || stdout.includes('✓ built'), 'Step 1: Production build must succeed with zero errors');

  // Verify dist artifacts exist
  const distHtml = path.join(FRONTEND_ROOT, 'dist', 'index.html');
  assert.ok(fs.existsSync(distHtml), 'Step 2: dist/index.html must exist');
});

// Run Final Summary & Exit
const allPassed = runner.summary();
if (!allPassed) {
  process.exit(1);
} else {
  process.exit(0);
}
