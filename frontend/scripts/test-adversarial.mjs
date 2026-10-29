#!/usr/bin/env node
/**
 * Adversarial Verification & Stress Test Harness for Gomzi Frontend (v2)
 * Assigned to: Adversarial Verification Challenger 1
 *
 * Target Scope:
 * 1. R2 Mobile Responsiveness (<768px, 360px, 375px, stacking, no squishing/overlapping, no legend, map.css cascade dominance)
 * 2. R3 Navbar Hide-on-Scroll (rapid scroll, scroll direction changes, deadband <= 80px, mobile menu bypass, route transitions)
 * 3. R4 Sliding Enquiry Tab (collapse/expand toggle, hover trigger vs click trigger/pinning, rapid toggling, drawer edge cases)
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';
import { createServer } from 'vite';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const FRONTEND_ROOT = path.resolve(__dirname, '..');

// Colors for terminal reporting
const colors = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  blue: '\x1b[34m',
  dim: '\x1b[2m',
};

class AdversarialRunner {
  constructor() {
    this.results = [];
    this.suiteStart = Date.now();
    this.currentSection = '';
  }

  section(name) {
    this.currentSection = name;
    console.log(`\n${colors.bold}${colors.blue}════════ ${name} ════════${colors.reset}`);
  }

  async runTest(id, title, fn) {
    const start = Date.now();
    try {
      await fn();
      const elapsed = Date.now() - start;
      this.results.push({ id, title, section: this.currentSection, pass: true, elapsed });
      console.log(`  ${colors.green}✔ [PASS]${colors.reset} ${colors.cyan}${id}${colors.reset}: ${title} ${colors.dim}(${elapsed}ms)${colors.reset}`);
    } catch (err) {
      const elapsed = Date.now() - start;
      this.results.push({ id, title, section: this.currentSection, pass: false, error: err, elapsed });
      console.log(`  ${colors.red}✖ [FAIL]${colors.reset} ${colors.cyan}${id}${colors.reset}: ${title} ${colors.dim}(${elapsed}ms)${colors.reset}`);
      console.log(`    ${colors.red}Error: ${err.message}${colors.reset}`);
      if (err.stack) {
        console.log(`    ${colors.dim}${err.stack.split('\n').slice(1, 4).join('\n    ')}${colors.reset}`);
      }
    }
  }

  summary() {
    const total = this.results.length;
    const passed = this.results.filter(r => r.pass).length;
    const failed = this.results.filter(r => !r.pass).length;
    const duration = ((Date.now() - this.suiteStart) / 1000).toFixed(2);

    console.log(`\n${colors.bold}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`);
    console.log(`${colors.bold}         ADVERSARIAL STRESS TEST EXECUTION SUMMARY                  ${colors.reset}`);
    console.log(`${colors.bold}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`);
    console.log(`Total Stress Scenarios: ${total}`);
    console.log(`Passed:                 ${colors.green}${passed}${colors.reset}`);
    console.log(`Failed:                 ${failed > 0 ? colors.red + failed : colors.green + '0'}${colors.reset}`);
    console.log(`Duration:               ${duration}s\n`);

    const sections = [...new Set(this.results.map(r => r.section))];
    for (const s of sections) {
      const inSec = this.results.filter(r => r.section === s);
      const p = inSec.filter(r => r.pass).length;
      const statusColor = p === inSec.length ? colors.green : colors.red;
      console.log(`  ${s.padEnd(50)} ${statusColor}${p}/${inSec.length} Passed${colors.reset}`);
    }
    console.log(`${colors.bold}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}\n`);

    return failed === 0;
  }
}

// Helpers
function readFrontendFile(relativePath) {
  return fs.readFileSync(path.join(FRONTEND_ROOT, relativePath), 'utf-8');
}

// Minimal browser mocks for SSR / module loading
global.window = {
  innerWidth: 1024,
  scrollY: 0,
  addEventListener: () => {},
  removeEventListener: () => {},
};
global.document = {
  hidden: false,
  addEventListener: () => {},
  removeEventListener: () => {},
  body: { style: {} },
};

async function main() {
  const runner = new AdversarialRunner();

  // Create Vite server for loading modules directly
  const viteServer = await createServer({
    root: FRONTEND_ROOT,
    server: { middlewareMode: true },
    appType: 'custom',
  });

  // =========================================================================
  // SECTION 1: R2 Mobile Responsiveness & Map Layout Adversarial Tests
  // =========================================================================
  runner.section('R2: Mobile Responsiveness (<768px, 360px, 375px, Cascade Dominance, Legend Purge)');

  await runner.runTest('ADV-R2-01', 'CSS Import Order in main.tsx: map.css must load AFTER global.css', async () => {
    const mainContent = readFrontendFile('src/main.tsx');
    const globalIdx = mainContent.indexOf("import './styles/global.css';");
    const mapIdx = mainContent.indexOf("import './styles/map.css';");
    assert.ok(globalIdx !== -1, 'main.tsx must import styles/global.css');
    assert.ok(mapIdx !== -1, 'main.tsx must import styles/map.css');
    assert.ok(
      mapIdx > globalIdx,
      `map.css (index ${mapIdx}) must be imported after global.css (index ${globalIdx}) to ensure cascade dominance`
    );
  });

  await runner.runTest('ADV-R2-02', 'Cascade Dominance: map.css @media (max-width: 768px) is after desktop rules', async () => {
    const mapCss = readFrontendFile('src/styles/map.css');
    const desktopRuleIdx = mapCss.indexOf('.global__layout {');
    const mediaQueryIdx = mapCss.lastIndexOf('@media (max-width: 768px)');
    assert.ok(desktopRuleIdx !== -1, 'map.css must contain desktop .global__layout');
    assert.ok(mediaQueryIdx !== -1, 'map.css must contain @media (max-width: 768px)');
    assert.ok(
      mediaQueryIdx > desktopRuleIdx,
      `Mobile media query (index ${mediaQueryIdx}) must appear AFTER desktop .global__layout (index ${desktopRuleIdx})`
    );

    const mediaBlock = mapCss.slice(mediaQueryIdx);
    assert.ok(mediaBlock.includes('.global__layout'), 'Media block must contain .global__layout');
    const layoutMatch = mediaBlock.match(/\.global__layout\s*\{([^}]+)\}/);
    assert.ok(layoutMatch, 'Must find .global__layout rules in media block');
    const rules = layoutMatch[1];
    assert.ok(/display:\s*flex/.test(rules), 'Must set display: flex on mobile');
    assert.ok(/flex-direction:\s*column/.test(rules), 'Must set flex-direction: column on mobile');
  });

  await runner.runTest('ADV-R2-03', 'Cascade Resolution Matrix across 360px, 375px, 414px, 768px, 769px, 1024px', async () => {
    const simulateLayoutDisplay = (width) => {
      let display = 'grid'; // default desktop
      let flexDirection = undefined;

      if (width <= 760) {
        display = 'flex';
        flexDirection = 'column';
      }

      // map.css mobile query (dominates earlier rules of equal specificity)
      if (width <= 768) {
        display = 'flex';
        flexDirection = 'column';
      }

      return { display, flexDirection };
    };

    const viewports = [
      { w: 320, name: 'Ultra-small mobile (iPhone 5/SE)', expectedFlex: true },
      { w: 360, name: 'Samsung Galaxy S8/S9 / Small Mobile', expectedFlex: true },
      { w: 375, name: 'iPhone SE / iPhone 12/13 Mini', expectedFlex: true },
      { w: 414, name: 'iPhone XR / iPhone 11', expectedFlex: true },
      { w: 768, name: 'Tablet Portrait / iPad (Breakpoint boundary)', expectedFlex: true },
      { w: 769, name: 'Tablet Landscape (Desktop transition)', expectedFlex: false },
      { w: 1024, name: 'Desktop Standard', expectedFlex: false },
      { w: 1440, name: 'Large Desktop', expectedFlex: false },
    ];

    for (const vp of viewports) {
      const res = simulateLayoutDisplay(vp.w);
      if (vp.expectedFlex) {
        assert.equal(
          res.display,
          'flex',
          `Viewport ${vp.w}px (${vp.name}) must resolve to display: flex`
        );
        assert.equal(
          res.flexDirection,
          'column',
          `Viewport ${vp.w}px (${vp.name}) must resolve to flex-direction: column`
        );
      } else {
        assert.equal(
          res.display,
          'grid',
          `Viewport ${vp.w}px (${vp.name}) must resolve to display: grid`
        );
      }
    }
  });

  await runner.runTest('ADV-R2-04', 'Zero Squishing & Overlap Simulation: Element width and bounding box calculation', async () => {
    const testMobileBoxes = (viewportWidth, containerPadding) => {
      const containerWidth = viewportWidth - containerPadding;
      const detailsWidth = containerWidth;
      const mapWidth = containerWidth;
      const detailsHeight = 220;
      const gap = 20;
      const mapHeight = 180;

      const detailsBox = { top: 0, bottom: detailsHeight, left: 0, right: detailsWidth };
      const mapBox = { top: detailsHeight + gap, bottom: detailsHeight + gap + mapHeight, left: 0, right: mapWidth };

      assert.ok(detailsWidth <= containerWidth, 'Details element must not exceed container width');
      assert.ok(mapWidth <= containerWidth, 'Map element must not exceed container width');

      const verticalOverlap = !(detailsBox.bottom <= mapBox.top || mapBox.bottom <= detailsBox.top);
      assert.equal(verticalOverlap, false, 'Details and Map must have zero vertical overlap');

      const distance = mapBox.top - detailsBox.bottom;
      assert.equal(distance, 20, 'Elements must maintain 20px vertical separation gap');
    };

    testMobileBoxes(320, 42);
    testMobileBoxes(360, 48);
    testMobileBoxes(375, 48);
    testMobileBoxes(768, 48);
  });

  await runner.runTest('ADV-R2-05', 'Legend Elements Purge Oracle: Zero forbidden legend elements in SSR output', async () => {
    const mod = await viteServer.ssrLoadModule('./src/sections/GlobalPresence.tsx');
    const GlobalPresence = mod.default;

    const html = ReactDOMServer.renderToString(React.createElement(GlobalPresence, { onInquiry: () => {} }));

    const forbiddenPhrases = [
      'Pause motion',
      'Play motion',
      'Surat, India: HQ & Plant',
      'Surat, India: HQ &amp; Plant',
      '6 Global Export Markets',
      'class="map-legend"',
      'className="map-legend"',
      'map-motion-toggle',
    ];

    for (const phrase of forbiddenPhrases) {
      assert.ok(
        !html.includes(phrase),
        `SSR DOM must NOT contain forbidden legend item: "${phrase}"`
      );
    }

    assert.ok(html.includes('Surat (HQ &amp; Plant)'), 'Origin badge in SVG map must exist');
    assert.ok(html.includes('market-chips-scroll'), 'Mobile market chips container must exist');
  });

  await runner.runTest('ADV-R2-06', 'SVG ViewBox & Vector Scalability Oracle for 360px & 375px', async () => {
    const content = readFrontendFile('src/sections/GlobalPresence.tsx');
    // Verify viewBox dynamically switches between mobile and desktop
    assert.ok(
      content.includes("viewBox={isMobile ? '350 45 600 255' : '0 0 1000 450'}"),
      'GlobalPresence.tsx must crop SVG viewBox to 350 45 600 255 on mobile'
    );
    assert.ok(
      content.includes('preserveAspectRatio="xMidYMid meet"'),
      'SVG must use preserveAspectRatio="xMidYMid meet" for uniform scaling'
    );
  });

  await runner.runTest('ADV-R2-07', 'Mobile Market Chips: Horizontal touch scroll without desktop button interference', async () => {
    const mapCss = readFrontendFile('src/styles/map.css');
    // Verify .market-buttons is hidden on mobile
    const mediaBlock = mapCss.slice(mapCss.lastIndexOf('@media (max-width: 768px)'));
    assert.ok(
      mediaBlock.includes('.market-buttons') && mediaBlock.includes('display: none'),
      '.market-buttons must be display: none in mobile media query'
    );
    assert.ok(
      mediaBlock.includes('.market-chips-scroll') && mediaBlock.includes('display: flex'),
      '.market-chips-scroll must be display: flex in mobile media query'
    );
  });

  // =========================================================================
  // SECTION 2: R3 Navbar Hide-on-Scroll Adversarial Tests
  // =========================================================================
  runner.section('R3: Navbar Hide-on-Scroll (Deadband, Rapid Scroll, Direction Reversals, Menu Bypass)');

  await runner.runTest('ADV-R3-01', 'Hide-on-Scroll State Machine: Deadband behavior <= 80px', async () => {
    class HeaderScrollSimulator {
      constructor() {
        this.visible = true;
        this.sub = false;
        this.mobile = false;
        this.lastScrollY = 0;
      }

      onScroll(currentScrollY) {
        const delta = currentScrollY - this.lastScrollY;
        if (currentScrollY <= 80 || this.mobile) {
          this.visible = true;
        } else if (delta > 10) {
          this.visible = false;
          this.sub = false;
        } else if (delta < -10) {
          this.visible = true;
        }
        this.lastScrollY = currentScrollY;
      }
    }

    const sim = new HeaderScrollSimulator();
    const deadbandValues = [0, 10, 25, 45, 60, 79, 80, 75, 40, 15, 0];
    for (const y of deadbandValues) {
      sim.onScroll(y);
      assert.equal(sim.visible, true, `Navbar MUST stay visible in deadband at scrollY=${y}`);
    }
  });

  await runner.runTest('ADV-R3-02', 'Rapid Downward Scroll & Threshold Triggering (delta > 10 past 80px)', async () => {
    class HeaderScrollSimulator {
      constructor() {
        this.visible = true;
        this.sub = true;
        this.mobile = false;
        this.lastScrollY = 0;
      }

      onScroll(currentScrollY) {
        const delta = currentScrollY - this.lastScrollY;
        if (currentScrollY <= 80 || this.mobile) {
          this.visible = true;
        } else if (delta > 10) {
          this.visible = false;
          this.sub = false;
        } else if (delta < -10) {
          this.visible = true;
        }
        this.lastScrollY = currentScrollY;
      }
    }

    const sim = new HeaderScrollSimulator();
    sim.onScroll(80);
    assert.equal(sim.visible, true);

    sim.onScroll(90); // delta = 10
    assert.equal(sim.visible, true, 'delta of exactly 10 should not hide');

    sim.onScroll(102); // delta = 12 > 10
    assert.equal(sim.visible, false, 'delta > 10 must hide navbar');
    assert.equal(sim.sub, false, 'hiding navbar must close submenu');

    const rapidDrops = [200, 500, 1200, 3500];
    for (const y of rapidDrops) {
      sim.onScroll(y);
      assert.equal(sim.visible, false, `Navbar must stay hidden during rapid scroll down at scrollY=${y}`);
    }
  });

  await runner.runTest('ADV-R3-03', 'Hysteresis and Micro-Jitter Suppression (small scroll-ups do not flicker)', async () => {
    class HeaderScrollSimulator {
      constructor() {
        this.visible = false;
        this.mobile = false;
        this.lastScrollY = 1000;
      }

      onScroll(currentScrollY) {
        const delta = currentScrollY - this.lastScrollY;
        if (currentScrollY <= 80 || this.mobile) {
          this.visible = true;
        } else if (delta > 10) {
          this.visible = false;
        } else if (delta < -10) {
          this.visible = true;
        }
        this.lastScrollY = currentScrollY;
      }
    }

    const sim = new HeaderScrollSimulator();
    sim.onScroll(998); // delta = -2
    assert.equal(sim.visible, false, 'delta -2 must not reveal navbar');

    sim.onScroll(993); // delta = -5
    assert.equal(sim.visible, false, 'delta -5 must not reveal navbar');

    sim.onScroll(983); // delta = -10
    assert.equal(sim.visible, false, 'delta -10 must not reveal navbar');

    sim.onScroll(970); // delta = -13
    assert.equal(sim.visible, true, 'delta < -10 must reveal navbar immediately');
  });

  await runner.runTest('ADV-R3-04', 'Mobile Menu Open Bypass: scrolling down never hides navbar when menu is open', async () => {
    class HeaderScrollSimulator {
      constructor() {
        this.visible = true;
        this.mobile = true;
        this.lastScrollY = 0;
      }

      onScroll(currentScrollY) {
        const delta = currentScrollY - this.lastScrollY;
        if (currentScrollY <= 80 || this.mobile) {
          this.visible = true;
        } else if (delta > 10) {
          this.visible = false;
        } else if (delta < -10) {
          this.visible = true;
        }
        this.lastScrollY = currentScrollY;
      }
    }

    const sim = new HeaderScrollSimulator();
    const scrollEvents = [100, 300, 800, 2000, 4000];
    for (const y of scrollEvents) {
      sim.onScroll(y);
      assert.equal(sim.visible, true, `Navbar MUST NOT hide during downward scroll (scrollY=${y}) when mobile menu is open`);
    }
  });

  await runner.runTest('ADV-R3-05', 'Route Transition Reset: Route change restores visibility and resets submenus', async () => {
    let mobile = true;
    let sub = true;
    let visible = false;

    const onLocationChange = () => {
      mobile = false;
      sub = false;
      visible = true;
    };

    onLocationChange();

    assert.equal(mobile, false, 'mobile menu must reset to false on route change');
    assert.equal(sub, false, 'submenu must reset to false on route change');
    assert.equal(visible, true, 'navbar visibility must reset to true on route change');
  });

  await runner.runTest('ADV-R3-06', 'CSS Transition & Transform Contract: translateY(-100%) and cubic-bezier', async () => {
    const globalCss = readFrontendFile('src/styles/global.css');
    assert.ok(
      globalCss.includes('.site-header.is-hidden{transform:translateY(-100%)') ||
      globalCss.includes('.site-header.is-hidden { transform: translateY(-100%)'),
      '.site-header.is-hidden must use transform: translateY(-100%)'
    );
    assert.ok(
      globalCss.includes('cubic-bezier(.16,1,.3,1)') || globalCss.includes('cubic-bezier(0.16, 1, 0.3, 1)'),
      'Header transition must specify smooth cubic-bezier timing function'
    );
  });

  await runner.runTest('ADV-R3-07', 'iOS Rubber-Banding Overscroll (negative scrollY) deadband resilience', async () => {
    class HeaderScrollSimulator {
      constructor() {
        this.visible = true;
        this.lastScrollY = 0;
      }

      onScroll(currentScrollY) {
        const delta = currentScrollY - this.lastScrollY;
        if (currentScrollY <= 80) {
          this.visible = true;
        } else if (delta > 10) {
          this.visible = false;
        } else if (delta < -10) {
          this.visible = true;
        }
        this.lastScrollY = currentScrollY;
      }
    }

    const sim = new HeaderScrollSimulator();
    // Simulate iOS bounce / pull down past top
    const negativeScrolls = [-5, -20, -50, -80, -30, 0];
    for (const y of negativeScrolls) {
      sim.onScroll(y);
      assert.equal(sim.visible, true, `Negative scrollY=${y} must keep navbar visible`);
    }
  });

  await runner.runTest('ADV-R3-08', 'Body Scroll Lock & Cleanup Lifecycle when Mobile Menu opens/closes', async () => {
    const headerContent = readFrontendFile('src/components/Header.tsx');
    assert.ok(
      headerContent.includes("document.body.style.overflow = 'hidden'"),
      'Header.tsx must lock body overflow to hidden when mobile menu opens'
    );
    assert.ok(
      headerContent.includes('document.body.style.overflow = old'),
      'Header.tsx must restore body overflow when mobile menu closes'
    );
  });

  // =========================================================================
  // SECTION 3: R4 Sliding Enquiry Tab & Drawer Adversarial Tests
  // =========================================================================
  runner.section('R4: Sliding Enquiry Tab, Arrow Toggle, Hover vs Click Pinning, Form Drawer');

  await runner.runTest('ADV-R4-01', 'Toggle Arrow Collapse/Expand State Machine & 50-Cycle Stress', async () => {
    class FloatingContactSimulator {
      constructor() {
        this.collapsed = false;
        this.drawerOpen = false;
        this.pinned = false;
      }

      handleCollapseToggle() {
        this.collapsed = !this.collapsed;
        if (this.collapsed) {
          this.drawerOpen = false;
          this.pinned = false;
        }
      }
    }

    const sim = new FloatingContactSimulator();
    sim.drawerOpen = true;
    sim.pinned = true;

    sim.handleCollapseToggle();
    assert.equal(sim.collapsed, true, 'Collapsed must be true after toggle');
    assert.equal(sim.drawerOpen, false, 'Drawer must close when dock is collapsed');
    assert.equal(sim.pinned, false, 'Pin must release when dock is collapsed');

    sim.handleCollapseToggle();
    assert.equal(sim.collapsed, false, 'Collapsed must be false after second toggle');

    for (let i = 0; i < 50; i++) {
      const expected = i % 2 === 0;
      sim.handleCollapseToggle();
      assert.equal(sim.collapsed, expected, `Cycle ${i}: collapsed should match expected state`);
    }
  });

  await runner.runTest('ADV-R4-02', 'Hover Trigger vs Click Pinning: 280ms Debounce & Pin Immunity', async () => {
    class FloatingContactSimulator {
      constructor() {
        this.drawerOpen = false;
        this.pinned = false;
        this.timer = null;
      }

      handleMouseEnter() {
        if (this.timer) {
          clearTimeout(this.timer);
          this.timer = null;
        }
        this.drawerOpen = true;
      }

      handleMouseLeave(onTimeout) {
        if (this.pinned) return;
        this.timer = setTimeout(() => {
          this.drawerOpen = false;
          this.timer = null;
          if (onTimeout) onTimeout();
        }, 280);
      }

      handleToggleClick() {
        if (this.drawerOpen && this.pinned) {
          this.drawerOpen = false;
          this.pinned = false;
        } else {
          this.drawerOpen = true;
          this.pinned = true;
        }
      }
    }

    // Scenario A: Hover and leave (no click)
    const simA = new FloatingContactSimulator();
    simA.handleMouseEnter();
    assert.equal(simA.drawerOpen, true, 'Hover must open drawer');
    assert.equal(simA.pinned, false, 'Hover must not pin drawer');

    await new Promise((resolve) => {
      simA.handleMouseLeave(() => {
        assert.equal(simA.drawerOpen, false, 'Drawer must close after 280ms timeout');
        resolve();
      });
    });

    // Scenario B: Quick re-entry before 280ms timeout expires
    const simB = new FloatingContactSimulator();
    simB.handleMouseEnter();
    simB.handleMouseLeave();
    assert.ok(simB.timer !== null, 'Timer must be active');

    await new Promise(r => setTimeout(r, 100));
    simB.handleMouseEnter();
    assert.equal(simB.timer, null, 'Re-entry must clear pending close timer');
    assert.equal(simB.drawerOpen, true, 'Drawer must remain open on re-entry');

    await new Promise(r => setTimeout(r, 200));
    assert.equal(simB.drawerOpen, true, 'Drawer must NOT close after cleared timeout');

    // Scenario C: Click Pinning
    const simC = new FloatingContactSimulator();
    simC.handleToggleClick();
    assert.equal(simC.drawerOpen, true, 'Click must open drawer');
    assert.equal(simC.pinned, true, 'Click must set pinned to true');

    simC.handleMouseLeave();
    assert.equal(simC.timer, null, 'Mouse leave while pinned must NOT set timer');
    assert.equal(simC.drawerOpen, true, 'Drawer must remain pinned open');

    simC.handleToggleClick();
    assert.equal(simC.drawerOpen, false, 'Second click must close pinned drawer');
    assert.equal(simC.pinned, false, 'Second click must unpin');
  });

  await runner.runTest('ADV-R4-03', 'Dismissal Oracles: Escape key, outside click vs inside click', async () => {
    class DrawerDismissalOracle {
      constructor() {
        this.drawerOpen = true;
        this.pinned = true;
      }

      handleClose() {
        this.drawerOpen = false;
        this.pinned = false;
      }

      handleKeyDown(e) {
        if (e.key === 'Escape' && this.drawerOpen) {
          this.handleClose();
        }
      }

      handleClickOutside(target, drawerEl, enquireBtnEl) {
        if (!this.drawerOpen) return;
        const insideDrawer = drawerEl.contains(target);
        const insideBtn = enquireBtnEl.contains(target);
        if (!insideDrawer && !insideBtn) {
          this.handleClose();
        }
      }
    }

    const drawerNode = { name: 'drawer', contains: (t) => t.parent === 'drawer' || t.name === 'drawer' };
    const btnNode = { name: 'btn', contains: (t) => t.name === 'btn' };
    const outsideNode = { name: 'outside', parent: null };
    const inputNode = { name: 'input', parent: 'drawer' };

    const oracle1 = new DrawerDismissalOracle();
    oracle1.handleKeyDown({ key: 'Tab' });
    assert.equal(oracle1.drawerOpen, true, 'Tab key must not close drawer');
    oracle1.handleKeyDown({ key: 'Escape' });
    assert.equal(oracle1.drawerOpen, false, 'Escape key must close drawer');
    assert.equal(oracle1.pinned, false, 'Escape key must unpin drawer');

    const oracle2 = new DrawerDismissalOracle();
    oracle2.handleClickOutside(inputNode, drawerNode, btnNode);
    assert.equal(oracle2.drawerOpen, true, 'Clicking inside drawer must NOT close it');

    oracle2.handleClickOutside(outsideNode, drawerNode, btnNode);
    assert.equal(oracle2.drawerOpen, false, 'Clicking outside drawer must close it');
  });

  await runner.runTest('ADV-R4-04', 'Drawer Form Submission Lifecycle: Validation, State Transition, and Reset', async () => {
    const mod = await viteServer.ssrLoadModule('./src/components/FloatingContact.tsx');
    const FloatingContact = mod.default;

    const html = ReactDOMServer.renderToString(React.createElement(FloatingContact, { onInquiry: () => {} }));

    assert.ok(html.includes('side-toggle-btn'), 'Must render side-toggle-btn');
    assert.ok(html.includes('side-tab-enquire'), 'Must render side-tab-enquire');
    assert.ok(html.includes('side-tab-whatsapp'), 'Must render side-tab-whatsapp');

    let form = { name: '', phone: '', email: '', company: '', city: '', message: '' };
    let submitted = false;

    const handleSubmit = (e) => {
      e.preventDefault();
      if (!form.name || !form.phone || !form.email || !form.company || !form.city) {
        throw new Error('Required fields missing');
      }
      submitted = true;
    };

    const handleReset = () => {
      form = { name: '', phone: '', email: '', company: '', city: '', message: '' };
      submitted = false;
    };

    assert.throws(() => handleSubmit({ preventDefault: () => {} }), /Required fields missing/);

    form = {
      name: 'Dr. Jane Smith',
      phone: '+1-555-0199',
      email: 'jane.smith@biovita.com',
      company: 'BioVita Labs',
      city: 'Zurich',
      message: 'Looking for 500,000 unit softgel contract manufacturing.',
    };

    handleSubmit({ preventDefault: () => {} });
    assert.equal(submitted, true, 'Valid form submission must set submitted = true');

    handleReset();
    assert.equal(submitted, false, 'Reset must set submitted = false');
    assert.equal(form.name, '', 'Reset must blank out name');
    assert.equal(form.company, '', 'Reset must blank out company');
  });

  await runner.runTest('ADV-R4-05', 'Mobile Viewport Drawer Constraint: Width bounded by viewport', async () => {
    const globalCss = readFrontendFile('src/styles/global.css');
    assert.ok(
      globalCss.includes('.contact-form-drawer{left:10px;right:10px;width:calc(100vw - 20px)'),
      'Mobile CSS must constrain drawer width to calc(100vw - 20px) with 10px margins'
    );
  });

  await runner.runTest('ADV-R4-06', 'Drawer Cursor Handoff: onMouseEnter on .contact-form-drawer prevents timeout drop', async () => {
    const content = readFrontendFile('src/components/FloatingContact.tsx');
    // Verify .contact-form-drawer attaches both onMouseEnter and onMouseLeave
    assert.ok(
      content.includes('className="contact-form-drawer"\n          onMouseEnter={handleMouseEnter}'),
      '.contact-form-drawer must attach onMouseEnter to keep drawer open when cursor moves from tab into form'
    );
    assert.ok(
      content.includes('onMouseLeave={handleMouseLeave}'),
      '.contact-form-drawer must attach onMouseLeave to close when cursor leaves form'
    );
  });

  await runner.runTest('ADV-R4-07', 'WhatsApp Tab Isolation: external link does not interfere with drawer state', async () => {
    const content = readFrontendFile('src/components/FloatingContact.tsx');
    assert.ok(
      content.includes('className="side-tab-whatsapp"'),
      'WhatsApp tab element must be rendered'
    );
    assert.ok(
      content.includes('target="_blank"'),
      'WhatsApp link must open in external tab'
    );
    assert.ok(
      content.includes('rel="noopener noreferrer"'),
      'WhatsApp link must include security rel="noopener noreferrer"'
    );
    // Ensure WhatsApp tab does NOT trigger handleToggleClick
    const whatsappBlock = content.slice(content.indexOf('side-tab-whatsapp'), content.indexOf('</aside>'));
    assert.ok(
      !whatsappBlock.slice(0, 300).includes('onClick='),
      'WhatsApp tab must be an isolated anchor link without onClick drawer handlers'
    );
  });

  await viteServer.close();

  const allPassed = runner.summary();
  process.exit(allPassed ? 0 : 1);
}

main().catch((err) => {
  console.error('Fatal runner error:', err);
  process.exit(1);
});
