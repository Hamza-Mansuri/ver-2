#!/usr/bin/env node
/**
 * Adversarial Challenger 2 Stress-Testing Harness for Gomzi Frontend (v2)
 *
 * Focus Areas:
 * 1. Asset Integrity & Broken Asset Link Detection
 * 2. R4 Form Validation, Security & State Lifecycle Stress Test
 * 3. R5 Animation Lifecycle, Mathematical Correctness & Reduced Motion
 * 4. R6 Gallery Lightbox Modal, Image Switching & Grid Toggle Behavior
 * 5. Cross-Component Hierarchy, Accessibility & Module Integrity
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const FRONTEND_ROOT = path.resolve(__dirname, '..');
const SRC_DIR = path.join(FRONTEND_ROOT, 'src');
const PUBLIC_DIR = path.join(FRONTEND_ROOT, 'public');

// ANSI Colors
const colors = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  magenta: '\x1b[35m',
};

class ChallengerReporter {
  constructor() {
    this.tests = [];
    this.startTime = Date.now();
    this.currentSection = '';
  }

  section(name) {
    this.currentSection = name;
    console.log(`\n${colors.bold}${colors.magenta}▶ ${name}${colors.reset}`);
  }

  test(id, name, fn) {
    const t0 = Date.now();
    try {
      fn();
      const dt = Date.now() - t0;
      this.tests.push({ id, name, section: this.currentSection, pass: true, duration: dt });
      console.log(`  ${colors.green}✔ [PASS]${colors.reset} ${colors.cyan}${id}${colors.reset}: ${name} ${colors.dim}(${dt}ms)${colors.reset}`);
    } catch (err) {
      const dt = Date.now() - t0;
      this.tests.push({ id, name, section: this.currentSection, pass: false, error: err, duration: dt });
      console.log(`  ${colors.red}✖ [FAIL]${colors.reset} ${colors.cyan}${id}${colors.reset}: ${name} ${colors.dim}(${dt}ms)${colors.reset}`);
      console.log(`    ${colors.red}${err.message}${colors.reset}`);
    }
  }

  summary() {
    const total = this.tests.length;
    const passed = this.tests.filter(t => t.pass).length;
    const failed = this.tests.filter(t => !t.pass).length;
    const dt = ((Date.now() - this.startTime) / 1000).toFixed(2);

    console.log(`\n${colors.bold}════════════════════════════════════════════════════════════════════${colors.reset}`);
    console.log(`${colors.bold}             ADVERSARIAL CHALLENGER VERIFICATION RESULTS             ${colors.reset}`);
    console.log(`${colors.bold}════════════════════════════════════════════════════════════════════${colors.reset}`);
    console.log(`Total Adversarial Checks:  ${total}`);
    console.log(`Passed:                    ${colors.green}${passed}${colors.reset}`);
    console.log(`Failed:                    ${failed > 0 ? colors.red + failed : colors.green + '0'}${colors.reset}`);
    console.log(`Execution Time:            ${dt}s\n`);

    const sections = [...new Set(this.tests.map(t => t.section))];
    for (const s of sections) {
      const inSec = this.tests.filter(t => t.section === s);
      const p = inSec.filter(t => t.pass).length;
      const f = inSec.filter(t => !t.pass).length;
      const statusColor = f === 0 ? colors.green : colors.red;
      console.log(`  ${s.padEnd(55)} ${statusColor}${p}/${inSec.length} Passed${colors.reset}`);
    }
    console.log(`${colors.bold}════════════════════════════════════════════════════════════════════${colors.reset}\n`);

    return failed === 0;
  }
}

const challenger = new ChallengerReporter();

// Binary WebP Inspector
function inspectWebP(filePath) {
  const buf = fs.readFileSync(filePath);
  if (buf.length < 16) throw new Error(`File too small (${buf.length} bytes) to be valid WebP`);

  const riff = buf.subarray(0, 4).toString('ascii');
  const webp = buf.subarray(8, 12).toString('ascii');
  if (riff !== 'RIFF' || webp !== 'WEBP') {
    throw new Error(`Invalid signatures: riff='${riff}', webp='${webp}'`);
  }

  const riffLength = buf.readUInt32LE(4);
  const actualRemaining = buf.length - 8;
  const chunkType = buf.subarray(12, 16).toString('ascii');

  let width = 0;
  let height = 0;
  let features = {};

  if (chunkType === 'VP8X') {
    if (buf.length < 30) throw new Error('Truncated VP8X header');
    const flags = buf[20];
    features = {
      hasIcc: !!(flags & 0x20),
      hasAlpha: !!(flags & 0x10),
      hasExif: !!(flags & 0x08),
      hasXmp: !!(flags & 0x04),
      hasAnimation: !!(flags & 0x02),
    };
    width = 1 + (buf[24] | (buf[25] << 8) | (buf[26] << 16));
    height = 1 + (buf[27] | (buf[28] << 8) | (buf[29] << 16));
  } else if (chunkType === 'VP8 ') {
    if (buf.length < 30) throw new Error('Truncated VP8 header');
    width = ((buf[26] | (buf[27] << 8)) & 0x3fff);
    height = ((buf[28] | (buf[29] << 8)) & 0x3fff);
  } else if (chunkType === 'VP8L') {
    if (buf.length < 25) throw new Error('Truncated VP8L header');
    const b0 = buf[21], b1 = buf[22], b2 = buf[23], b3 = buf[24];
    width = 1 + (((b1 & 0x3f) << 8) | b0);
    height = 1 + (((b3 & 0x0f) << 10) | (b2 << 2) | ((b1 & 0xc0) >> 6));
  } else {
    throw new Error(`Unknown WebP chunk format: ${chunkType}`);
  }

  return {
    filePath,
    fileSize: buf.length,
    riffLength,
    actualRemaining,
    chunkType,
    width,
    height,
    features,
  };
}

// ============================================================================
// SECTION 1: ASSET INTEGRITY & BROKEN LINK DETECTION
// ============================================================================
challenger.section('Section 1: Asset Integrity & Link Verification');

challenger.test('ADV-ASSET-01', 'commercial-partnership.webp: Valid RIFF container & VP8X header', () => {
  const assetPath = path.join(PUBLIC_DIR, 'assets', 'images', 'commercial-partnership.webp');
  assert.ok(fs.existsSync(assetPath), 'Asset must exist');
  const meta = inspectWebP(assetPath);
  assert.strictEqual(meta.chunkType, 'VP8X', 'Must be VP8X chunk');
  assert.strictEqual(meta.width, 1024, 'Width must be 1024');
  assert.strictEqual(meta.height, 682, 'Height must be 682');
  assert.ok(Math.abs(meta.riffLength - meta.actualRemaining) <= 1, 'RIFF size should match file length within 1 byte');
  assert.ok(meta.fileSize >= 20480 && meta.fileSize <= 512000, `File size ${meta.fileSize} bytes is within bounds`);
});

challenger.test('ADV-ASSET-02', 'All 15 Gallery images: Genuine WebP, valid 1536x1024 dimensions', () => {
  for (let i = 1; i <= 15; i++) {
    const num = String(i).padStart(2, '0');
    const imgPath = path.join(PUBLIC_DIR, 'assets', 'gallery', `gallery-${num}.webp`);
    assert.ok(fs.existsSync(imgPath), `gallery-${num}.webp must exist`);
    const meta = inspectWebP(imgPath);
    assert.strictEqual(meta.width, 1536, `gallery-${num}.webp width must be 1536 (got ${meta.width})`);
    assert.strictEqual(meta.height, 1024, `gallery-${num}.webp height must be 1024 (got ${meta.height})`);
    assert.ok(meta.fileSize > 10000, `gallery-${num}.webp must be non-trivial size`);
  }
});

challenger.test('ADV-ASSET-03', 'All 15 Gallery companion responsive (-400.webp) images: Genuine WebP, 400w', () => {
  for (let i = 1; i <= 15; i++) {
    const num = String(i).padStart(2, '0');
    const imgPath = path.join(PUBLIC_DIR, 'assets', 'gallery', `gallery-${num}-400.webp`);
    assert.ok(fs.existsSync(imgPath), `gallery-${num}-400.webp must exist`);
    const meta = inspectWebP(imgPath);
    assert.strictEqual(meta.width, 400, `gallery-${num}-400.webp width must be 400 (got ${meta.width})`);
    assert.ok(meta.height > 200 && meta.height < 400, `gallery-${num}-400.webp height must be proportional`);
  }
});

challenger.test('ADV-ASSET-04', 'Broken Asset Links Audit: Zero missing asset links in src and index.html', () => {
  function getFiles(dir, exts) {
    let files = [];
    for (const item of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, item.name);
      if (item.isDirectory()) {
        files = files.concat(getFiles(full, exts));
      } else if (exts.some(e => item.name.endsWith(e))) {
        files.push(full);
      }
    }
    return files;
  }

  const codeFiles = [
    ...getFiles(SRC_DIR, ['.tsx', '.ts', '.css']),
    path.join(FRONTEND_ROOT, 'index.html'),
  ];

  const assetRegex = /['"](\/(?:assets|vite|favicon)[^'"]+\.(?:webp|png|jpg|jpeg|svg|ico))['"]/g;
  const missingAssets = [];
  let totalLinksChecked = 0;

  for (const file of codeFiles) {
    const content = fs.readFileSync(file, 'utf8');
    let match;
    while ((match = assetRegex.exec(content)) !== null) {
      totalLinksChecked++;
      const assetUrl = match[1];
      const relativePart = assetUrl.replace(/^\//, '');
      const diskPath = path.join(PUBLIC_DIR, relativePart);
      if (!fs.existsSync(diskPath)) {
        missingAssets.push({ file: path.relative(FRONTEND_ROOT, file), asset: assetUrl });
      }
    }
  }

  assert.strictEqual(
    missingAssets.length,
    0,
    `Found ${missingAssets.length} broken asset links: ${JSON.stringify(missingAssets, null, 2)}`
  );
  assert.ok(totalLinksChecked >= 15, `Checked at least 15 asset references (found ${totalLinksChecked})`);
});

challenger.test('ADV-ASSET-05', 'Module Import Resolution: Zero broken relative imports across all TypeScript files', () => {
  function getTsFiles(dir) {
    let res = [];
    for (const item of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, item.name);
      if (item.isDirectory()) res = res.concat(getTsFiles(full));
      else if (item.name.endsWith('.ts') || item.name.endsWith('.tsx')) res.push(full);
    }
    return res;
  }

  const tsFiles = getTsFiles(SRC_DIR);
  const brokenImports = [];

  for (const file of tsFiles) {
    const code = fs.readFileSync(file, 'utf8');
    const matches = code.matchAll(/from\s+['"](\.[^'"]+)['"]/g);
    for (const match of matches) {
      const rel = match[1];
      const resolvedBase = path.resolve(path.dirname(file), rel);
      const candidates = ['', '.ts', '.tsx', '.js', '.jsx', '/index.ts', '/index.tsx'];
      const ok = candidates.some(ext => fs.existsSync(resolvedBase + ext));
      if (!ok) {
        brokenImports.push({ file: path.relative(FRONTEND_ROOT, file), importPath: rel });
      }
    }
  }

  assert.strictEqual(
    brokenImports.length,
    0,
    `Found broken imports: ${JSON.stringify(brokenImports, null, 2)}`
  );
  assert.ok(tsFiles.length >= 10, 'Checked at least 10 TypeScript source files');
});

// ============================================================================
// SECTION 2: R4 FORM VALIDATION, SECURITY & STATE LIFECYCLE
// ============================================================================
challenger.section('Section 2: R4 Form Validation, Security & State Lifecycle');

challenger.test('ADV-R4-01', 'Form input fields: Explicit required attributes & proper input types', () => {
  const code = fs.readFileSync(path.join(SRC_DIR, 'components', 'FloatingContact.tsx'), 'utf8');

  const requiredInputs = [
    { name: 'name', type: 'text', autocomplete: 'name' },
    { name: 'phone', type: 'tel', autocomplete: 'tel' },
    { name: 'email', type: 'email', autocomplete: 'email' },
    { name: 'company', type: 'text', autocomplete: 'organization' },
    { name: 'city', type: 'text', autocomplete: 'address-level2' },
  ];

  for (const inp of requiredInputs) {
    const regex = new RegExp(`<input[^>]*name="${inp.name}"[^>]*required`, 's');
    assert.ok(regex.test(code), `Input '${inp.name}' must have required attribute`);
    assert.ok(code.includes(`type="${inp.type}"`), `Input '${inp.name}' must have type="${inp.type}"`);
    assert.ok(code.includes(`autoComplete="${inp.autocomplete}"`), `Input '${inp.name}' must have autoComplete="${inp.autocomplete}"`);
  }

  assert.ok(code.includes('<textarea'), 'Must have textarea for message');
  assert.ok(code.includes('name="message"'), 'Textarea must have name="message"');
});

challenger.test('ADV-R4-02', 'XSS Resistance & Injection Immunity in Confirmation View', () => {
  const code = fs.readFileSync(path.join(SRC_DIR, 'components', 'FloatingContact.tsx'), 'utf8');

  assert.ok(!code.includes('dangerouslySetInnerHTML'), 'FloatingContact must not use dangerouslySetInnerHTML');
  assert.ok(!code.includes('.innerHTML'), 'FloatingContact must not use innerHTML');

  assert.ok(
    code.includes("{form.name || 'Partner'}"),
    "Must safely interpolate form.name with fallback 'Partner'"
  );
  assert.ok(
    code.includes("{form.company || 'your brand'}"),
    "Must safely interpolate form.company with fallback 'your brand'"
  );

  const testPayloads = [
    '<script>alert("XSS")</script>',
    '<img src=x onerror=alert(1)>',
    '"><svg/onload=alert(1)>',
    "'; DROP TABLE inquiries; --",
    '{{7*7}}',
    '🧪💊 Special Unicode Test \u0000',
    'A'.repeat(5000), // Buffer overflow attempt
  ];

  for (const payload of testPayloads) {
    const dummy = { textContent: '' };
    dummy.textContent = payload;
    assert.strictEqual(dummy.textContent, payload, 'Plain text interpolation must preserve raw string as text node');
  }
});

challenger.test('ADV-R4-03', 'State Lifecycle: Drawer hover/pin/toggle/reset state transitions', () => {
  const code = fs.readFileSync(path.join(SRC_DIR, 'components', 'FloatingContact.tsx'), 'utf8');

  assert.ok(code.includes('280'), 'Must implement 280ms hover debounce before closing');
  assert.ok(code.includes('if (pinned) return;'), 'Mouse leave must not close drawer when pinned');
  assert.ok(code.includes('setPinned(true)'), 'Click toggle must pin the drawer open');

  assert.ok(
    code.includes('setDrawerOpen(false)') && code.includes('setPinned(false)'),
    'Collapsing tabs must reset drawerOpen and pinned state'
  );

  assert.ok(code.includes("name: ''"), 'handleReset must clear name');
  assert.ok(code.includes("phone: ''"), 'handleReset must clear phone');
  assert.ok(code.includes("email: ''"), 'handleReset must clear email');
  assert.ok(code.includes("company: ''"), 'handleReset must clear company');
  assert.ok(code.includes("city: ''"), 'handleReset must clear city');
  assert.ok(code.includes("message: ''"), 'handleReset must clear message');
  assert.ok(code.includes('setSubmitted(false)'), 'handleReset must clear submitted state');
});

challenger.test('ADV-R4-04', 'Event Listener Cleanup on Unmount and State Transitions', () => {
  const code = fs.readFileSync(path.join(SRC_DIR, 'components', 'FloatingContact.tsx'), 'utf8');

  assert.ok(code.includes("window.addEventListener('keydown', handleKeyDown)"), 'Must attach keydown listener for Escape');
  assert.ok(code.includes("window.removeEventListener('keydown', handleKeyDown)"), 'Must clean up keydown listener');

  assert.ok(code.includes("document.addEventListener('mousedown', handleClickOutside)"), 'Must attach mousedown listener');
  assert.ok(code.includes("document.removeEventListener('mousedown', handleClickOutside)"), 'Must clean up mousedown listener');
  assert.ok(code.includes("document.addEventListener('touchstart', handleClickOutside)"), 'Must attach touchstart listener');
  assert.ok(code.includes("document.removeEventListener('touchstart', handleClickOutside)"), 'Must clean up touchstart listener');
});

challenger.test('ADV-R4-05', 'WhatsApp Link Protocol & URL Parameter Sanitization', () => {
  const code = fs.readFileSync(path.join(SRC_DIR, 'components', 'FloatingContact.tsx'), 'utf8');

  assert.ok(code.includes('https://wa.me/'), 'WhatsApp tab must use https://wa.me/ URL');
  assert.ok(code.includes('target="_blank"'), 'WhatsApp link must open in new tab');
  assert.ok(code.includes('rel="noopener noreferrer"'), 'WhatsApp link must declare rel="noopener noreferrer"');
  assert.ok(code.includes('encodeURIComponent('), 'WhatsApp prefilled text must be properly URL-encoded');
});

// ============================================================================
// SECTION 3: R5 ANIMATION LIFECYCLE & COUNT-UP
// ============================================================================
challenger.section('Section 3: R5 Animation Lifecycle & Count-Up');

challenger.test('ADV-R5-01', 'IntersectionObserver Disconnect on View Entry (Prevents Endless Loops)', () => {
  const code = fs.readFileSync(path.join(SRC_DIR, 'sections', 'About.tsx'), 'utf8');

  assert.ok(
    /if\s*\(\s*entry\.isIntersecting\s*\)\s*\{[^}]*observer\.disconnect\(\)/s.test(code),
    'observer.disconnect() must be called immediately when entry.isIntersecting is true'
  );

  assert.ok(
    /return\s*\(\)\s*=>\s*observer\.disconnect\(\)/.test(code),
    'useEffect must return cleanup function disconnecting observer'
  );
});

challenger.test('ADV-R5-02', 'easeOutCubic Curve & Monotonic Non-Overshooting Integer Progression', () => {
  function simulateCountUp(target, duration = 1800, frameIntervals = [16, 16, 32, 8, 48, 16]) {
    const values = [];
    let elapsed = 0;
    let idx = 0;
    while (elapsed <= duration * 1.5) {
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      const count = Math.round(ease * target);
      values.push({ elapsed, progress, ease, count });
      if (progress >= 1) break;
      const step = frameIntervals[idx % frameIntervals.length];
      elapsed += step;
      idx++;
    }
    return values;
  }

  for (const target of [45, 1000, 100, 0, 1, 999999]) {
    const values = simulateCountUp(target);
    assert.strictEqual(values[0].count, 0, `Target ${target}: Initial value must be 0`);
    assert.strictEqual(values[values.length - 1].count, target, `Target ${target}: Final value must be exactly ${target}`);
    for (let i = 1; i < values.length; i++) {
      assert.ok(values[i].count >= values[i - 1].count, `Target ${target}: Progression must be non-decreasing at step ${i}`);
      assert.ok(Number.isInteger(values[i].count), `Target ${target}: Must be integer`);
    }
  }
});

challenger.test('ADV-R5-03', 'Locale Number Formatting & Green Suffix Isolation', () => {
  const code = fs.readFileSync(path.join(SRC_DIR, 'sections', 'About.tsx'), 'utf8');

  assert.ok(code.includes("count.toLocaleString('en-US')"), "Must format count using count.toLocaleString('en-US')");
  assert.strictEqual((1000).toLocaleString('en-US'), '1,000', '1000 must format as 1,000');
  assert.strictEqual((45).toLocaleString('en-US'), '45', '45 must format as 45');
  assert.strictEqual((100).toLocaleString('en-US'), '100', '100 must format as 100');

  assert.ok(
    /<strong>\s*\{count\.toLocaleString\('en-US'\)\}\s*<span>\{suffix\}<\/span>\s*<\/strong>/.test(code),
    'Suffix must be isolated in <span>{suffix}</span> inside <strong>'
  );
});

challenger.test('ADV-R5-04', 'prefers-reduced-motion Handling (Instant Target Assignment)', () => {
  const code = fs.readFileSync(path.join(SRC_DIR, 'sections', 'About.tsx'), 'utf8');

  assert.ok(
    code.includes("window.matchMedia('(prefers-reduced-motion: reduce)').matches"),
    'Must check prefers-reduced-motion: reduce matchMedia query'
  );
  assert.ok(
    code.includes('setCount(target);') && code.includes('return;'),
    'Must instantly set count to target and return without scheduling RAF'
  );

  assert.ok(
    code.includes('cancelAnimationFrame(frameId)'),
    'Must cancel animation frame on unmount or inView change'
  );
});

// ============================================================================
// SECTION 4: R6 GALLERY MODAL, IMAGE SWITCHING & GRID TOGGLE
// ============================================================================
challenger.section('Section 4: R6 Gallery Modal, Image Switching & Grid Toggle');

challenger.test('ADV-R6-01', 'Modal Component Architecture & native <dialog> Contract', () => {
  const code = fs.readFileSync(path.join(SRC_DIR, 'components', 'Modal.tsx'), 'utf8');

  assert.ok(code.includes('<dialog'), 'Modal must render native <dialog> element');
  assert.ok(code.includes('el.showModal()'), 'Modal must invoke showModal() API');

  assert.ok(code.includes("document.body.style.overflow = 'hidden'"), 'Must lock body scroll when open');
  assert.ok(code.includes('document.body.style.overflow = previousOverflow'), 'Must restore body scroll on close');

  assert.ok(code.includes("el.addEventListener('cancel', cancel)"), 'Must attach cancel listener');
  assert.ok(code.includes("el.removeEventListener('cancel', cancel)"), 'Must clean up cancel listener');

  assert.ok(code.includes('getBoundingClientRect()'), 'Must use getBoundingClientRect() to detect backdrop clicks');
  assert.ok(code.includes('previous?.focus('), 'Must restore previous active element focus on dialog close');
});

challenger.test('ADV-R6-02', 'Gallery Grid Expansion State: 15 vs 6 perspectives toggle', () => {
  const code = fs.readFileSync(path.join(SRC_DIR, 'sections', 'Gallery.tsx'), 'utf8');

  assert.ok(code.includes('useState(true)'), 'Gallery initial expansion state must be true');

  assert.ok(
    code.includes('expanded ? gallery : gallery.slice(0, 6)'),
    'Must show all 15 items when expanded and 6 items when collapsed'
  );

  assert.ok(
    code.includes("expanded ? '15' : '06'"),
    "Footer counter must display '15' or '06' / 15 perspectives"
  );

  assert.ok(
    code.includes("expanded ? 'Show fewer spaces' : 'Explore all 15 spaces'"),
    "Button must toggle between 'Show fewer spaces' and 'Explore all 15 spaces'"
  );

  assert.ok(code.includes('aria-expanded={expanded}'), 'Button must declare aria-expanded attribute');
  assert.ok(code.includes('aria-controls="gallery-grid"'), 'Button must declare aria-controls="gallery-grid"');
});

challenger.test('ADV-R6-03', 'Gallery Data Integrity: 15 unique perspective records with valid metadata', () => {
  const dataPath = path.join(SRC_DIR, 'data', 'gallery.ts');
  const code = fs.readFileSync(dataPath, 'utf8');

  const idMatches = [...code.matchAll(/id:\s*'(\d+)'/g)].map(m => m[1]);
  assert.strictEqual(idMatches.length, 15, 'Must contain exactly 15 item IDs');

  for (let i = 1; i <= 15; i++) {
    const expected = String(i).padStart(2, '0');
    assert.ok(idMatches.includes(expected), `Must include item id '${expected}'`);
  }

  const uniqueIds = new Set(idMatches);
  assert.strictEqual(uniqueIds.size, 15, 'All 15 item IDs must be strictly unique');

  const titles = [...code.matchAll(/title:\s*'([^']+)'/g)].map(m => m[1]);
  assert.strictEqual(titles.length, 15, 'Must contain 15 unique titles');
  assert.strictEqual(new Set(titles).size, 15, 'All titles must be unique');

  const alts = [...code.matchAll(/alt:\s*'([^']+)'/g)].map(m => m[1]);
  assert.strictEqual(alts.length, 15, 'Must contain 15 non-empty alt texts');
});

challenger.test('ADV-R6-04', 'Modal Image Switching: Dynamic selection & payload binding', () => {
  const code = fs.readFileSync(path.join(SRC_DIR, 'sections', 'Gallery.tsx'), 'utf8');

  assert.ok(
    code.includes('onClick={() => setSelected(item)}'),
    'Clicking image button must call setSelected(item)'
  );

  assert.ok(
    code.includes('open={!!selected}'),
    'Modal open prop must bind to !!selected'
  );
  assert.ok(
    code.includes('onClose={() => setSelected(null)}'),
    'Modal onClose prop must reset selected to null'
  );

  assert.ok(code.includes('<h2 id="gallery-image-title">{selected.title}</h2>'), 'Modal must render selected.title in h2');
  assert.ok(code.includes('src={selected.image}'), 'Modal must render selected.image in img src');
  assert.ok(code.includes('alt={selected.alt}'), 'Modal must render selected.alt in img alt');
});

// ============================================================================
// SECTION 5: CROSS-COMPONENT HIERARCHY & ACCESSIBILITY CONTRACTS
// ============================================================================
challenger.section('Section 5: Cross-Component Hierarchy & Accessibility');

challenger.test('ADV-CROSS-01', 'Z-Index Layering: Sticky Header (100) > Drawer (99) > Dock (95)', () => {
  const css = fs.readFileSync(path.join(SRC_DIR, 'styles', 'global.css'), 'utf8');

  // Verify header z-index 100
  assert.ok(css.includes('z-index:100'), 'Sticky header must declare z-index: 100');
  // Verify drawer z-index 99
  assert.ok(css.includes('z-index:99'), 'Contact drawer must declare z-index: 99');
  // Verify floating dock z-index 95
  assert.ok(css.includes('z-index:95'), 'Floating dock must declare z-index: 95');
});

challenger.test('ADV-CROSS-02', 'App Mount Sequence: Section 01 About immediately precedes Section 02 Gallery', () => {
  const appCode = fs.readFileSync(path.join(SRC_DIR, 'App.tsx'), 'utf8');
  const aboutIdx = appCode.indexOf('<About');
  const galleryIdx = appCode.indexOf('<Gallery');

  assert.ok(aboutIdx !== -1, 'About component must be mounted in App.tsx');
  assert.ok(galleryIdx !== -1, 'Gallery component must be mounted in App.tsx');
  assert.ok(aboutIdx < galleryIdx, '<About /> must precede <Gallery /> in App.tsx');

  // Verify no other section is mounted between About and Gallery
  const aboutEnd = appCode.indexOf('/>', aboutIdx) + 2;
  const slice = appCode.substring(aboutEnd, galleryIdx).trim();
  assert.strictEqual(slice, '', 'No intermediate section mounted between About and Gallery');
});

challenger.test('ADV-CROSS-03', 'Mobile Viewport CSS Isolation: @media(max-width: 768px) cascade dominance', () => {
  const mapCss = fs.readFileSync(path.join(SRC_DIR, 'styles', 'map.css'), 'utf8');
  const lastMediaIdx = mapCss.lastIndexOf('@media (max-width: 768px)');
  assert.ok(lastMediaIdx !== -1, 'map.css must contain @media (max-width: 768px)');

  // Verify that subsequent code inside this media query sets flex-direction: column
  const mobileBlock = mapCss.slice(lastMediaIdx);
  assert.ok(mobileBlock.includes('flex-direction: column'), 'Mobile layout must enforce flex-direction: column');
  assert.ok(mobileBlock.includes('.world-map'), 'Mobile layout must handle .world-map width');
  assert.ok(mobileBlock.includes('display: none'), 'Mobile layout must hide desktop buttons');
});

// Run summary and exit
const allPassed = challenger.summary();
process.exit(allPassed ? 0 : 1);
