/* ============================================================
   MONKSILLY — shared.js
   Injects: ticker, nav, footer, konami overlay
   Handles: active nav state, easter eggs, changelog accordion
   ============================================================ */

(function () {
  /* ── Nav links ── */
  const NAV = [
    { label: 'Mods',       href: '/mods/' },
    { label: 'Roadmap',    href: '/roadmap/' },
    { label: 'Devlog',     href: '/devlogs/' },
    { label: 'Team',       href: '/team/' },
    { label: 'Changelog',  href: '/changelogs/' },
    { label: 'Discord',    href: '/contact/' },
  ];

  /* ── Ticker messages ── */
  const TICKS = [
    'WKMultiplayer is in active development',
    'ResourcefulHands (Continued) — now on Thunderstore',
    'WKLib v0.0.4 — the backbone of MonkSilly mods',
    'Custom Gamemodes — bend the rules, on purpose',
    'RC builds available on GitHub Releases',
    'Join the MonkSilly Discord :3',
    'White Knuckle modding is not a crime (probably)',
    'galfar.exe is fixing something right now, probably',
    'colling provides emotional support. it helps.',
    'Cass is architecting something ungodly',
    'SUB-STRUCTURE 17 has never been sillier',
    'grab early RC builds before they explode',
    'monksilly.github.io — you are here',
  ];

  /* ── Build ticker ── */
  function buildTicker() {
    const t = document.getElementById('ticker-mount');
    if (!t) return;
    const doubled = [...TICKS, ...TICKS];
    const inner = doubled.map(s => `<span>${s}</span>`).join('');
    t.className = 'ticker';
    t.innerHTML = `<div class="ticker-inner">${inner}</div>`;
  }

  /* ── Build nav ── */
  function buildNav() {
    const n = document.getElementById('nav-mount');
    if (!n) return;
    const path = window.location.pathname;
    const links = NAV.map(({ label, href }) => {
      const active = (href === '/' ? path === '/' : path.startsWith(href)) ? ' class="active"' : '';
      return `<li><a href="${href}"${active}>${label}</a></li>`;
    }).join('');
    n.outerHTML = `<nav>
      <a class="nav-logo" href="/" id="navLogo">MONKSILLY</a>
      <ul class="nav-links">${links}</ul>
    </nav>`;
  }

  /* ── Build footer ── */
  function buildFooter() {
    const f = document.getElementById('footer-mount');
    if (!f) return;
    f.outerHTML = `<footer>
      <div class="footer-inner">
        <div class="footer-logo">MONKSILLY</div>
        <div>Not affiliated with Dark Machine Games. White Knuckle&trade; is theirs. The silly mods are ours.</div>
        <span class="secret-px" id="spx" title="..."></span>
      </div>
    </footer>`;
  }

  /* ── Build konami overlay ── */
  function buildKonami() {
    const k = document.createElement('div');
    k.className = 'konami-bg';
    k.id = 'konamiOverlay';
    k.innerHTML = `<div class="konami-box" onclick="event.stopPropagation()">
      <div class="konami-title">YOU FOUND<br>THE CODE</div>
      <p class="konami-msg">Wow. You actually did the Konami code on a mod team website.<br><br>
        galfar.exe is fixing a crash right now. colling is providing emotional support about it.
        Cass has already refactored the whole thing.<br><br>Thanks for being silly with us. 🐒</p>
      <button class="btn" onclick="document.getElementById('konamiOverlay').classList.remove('show')">[ CLOSE ]</button>
    </div>`;
    k.addEventListener('click', () => k.classList.remove('show'));
    document.body.appendChild(k);
  }

  /* ── Konami code listener ── */
  function initKonami() {
    const SEQ = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
    let ki = 0;
    document.addEventListener('keydown', e => {
      if (e.key === SEQ[ki]) { ki++; if (ki === SEQ.length) { ki = 0; document.getElementById('konamiOverlay')?.classList.add('show'); } }
      else ki = 0;
    });
  }

  /* ── Logo click easter egg (5x) ── */
  function initLogoEgg() {
    document.addEventListener('click', e => {
      const logo = e.target.closest('#navLogo');
      if (!logo) return;
      logo._clicks = (logo._clicks || 0) + 1;
      clearTimeout(logo._timer);
      logo._timer = setTimeout(() => { logo._clicks = 0; }, 1800);
      if (logo._clicks >= 5) {
        logo._clicks = 0;
        logo.textContent = 'SILLYMONK';
        logo.style.color = 'var(--red)';
        setTimeout(() => { logo.textContent = 'MONKSILLY'; logo.style.color = ''; }, 2200);
      }
    });
  }

  /* ── Secret pixel (3x) ── */
  function initSecretPixel() {
    document.addEventListener('click', e => {
      if (!e.target.closest('#spx')) return;
      const spx = document.getElementById('spx');
      spx._clicks = (spx._clicks || 0) + 1;
      if (spx._clicks >= 3) {
        spx._clicks = 0;
        alert('🐒 you found it.\nthe silly is inside you.\nit was always inside you.');
      }
    });
  }

  /* ── Run on DOM ready ── */
  function init() {
    buildTicker();
    buildNav();
    buildFooter();
    buildKonami();
    initKonami();
    initLogoEgg();
    initSecretPixel();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();

/* ── Changelog accordion (used on changelog pages) ── */
function toggleCL(id) {
  document.getElementById(id)?.classList.toggle('open');
}
