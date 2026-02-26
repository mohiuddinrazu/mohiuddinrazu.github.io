/* ================================================================
   Quick update self-reminders
   ================================================================
     - New publication: prepend an object to publications[]
     - New skill      : add to the relevant category in skills[]
   ================================================================ */

/* ── Theme initialization ─────────────────────────────────────────
   Make sure always start in dark theme. 
   A tiny inline <script> in <head> also does this to prevent
   flash-of-wrong-theme. This block here re-applies on load for
   correctness in edge cases.
   ──────────────────────────────────────────────────────────────── */
(function () {
  var t = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', t);
})();

/* ── Publications ─────────────────────────────────────────────────
   Reminder: Add latest to TOP. Available fields:
     title  (string)
     venue  (string)  - journal or conference abbreviation
     detail (string)  - volume, year, page
     url    (string|null) - DOI or arXiv link; null = no link
   ──────────────────────────────────────────────────────────────── */
const publications = [
  {
    title:  'Deep learning based event reconstruction for cyclotron radiation emission spectroscopy',
    venue:  'Mach. Learn.: Sci. Technol.',
    detail: '5 (2024) 025026',
    url:    'https://doi.org/10.1088/2632-2153/ad3ee6'
  },
  {
    title:  'Tritium Beta Spectrum and Neutrino Mass Limit from Cyclotron Radiation Emission Spectroscopy',
    venue:  'Phys. Rev. Lett.',
    detail: '131 (2023) 102502',
    url:    'https://doi.org/10.1103/PhysRevLett.131.102502'
  },
  {
    title:  'SYNCA: A Synthetic Cyclotron Antenna for the Project 8 Collaboration',
    venue:  'JINST',
    detail: '18 (2023) 01, P01034',
    url:    'https://doi.org/10.1088/1748-0221/18/01/P01034'
  },
  {
    title:  'Deep Learning based CRES track and event reconstruction in Project 8',
    venue:  'APS DNP',
    detail: '2022',
    url:    'https://meetings.aps.org/Meeting/DNP22/Session/LD.6'
  },
  {
    title:  'The Project 8 Neutrino Mass Experiment',
    venue:  '2022 Snowmass',
    detail: 'arXiv: 2203.07349',
    url:    'https://arxiv.org/abs/2203.07349'
  },
  {
    title:  'Viterbi decoding of CRES signals in Project 8',
    venue:  'New J. Phys.',
    detail: '24 (2022) 5, 053013',
    url:    'https://doi.org/10.1088/1367-2630/ac6200'
  },
  {
    title:  "Bayesian analysis of a future β decay experiment's sensitivity to neutrino mass scale and ordering",
    venue:  'Phys. Rev. C',
    detail: '103 (2021) 6, 065501',
    url:    'https://doi.org/10.1103/PhysRevC.103.065501'
  }
];

/* ── Skills ─────────────────────────────────────────────────────── */
const skills = [
  {
    category: 'Languages',
    items: ['Python', 'R', 'C++', 'SQL', 'Bash']
  },
  {
    category: 'ML / Deep Learning',
    items: ['PyTorch', 'TensorFlow', 'Keras', 'scikit-learn', 'Hugging Face']
  },
  {
    category: 'Data Science',
    items: ['NumPy', 'Pandas', 'SciPy', 'Matplotlib', 'Seaborn']
  },
  {
    category: 'Methods',
    items: ['Deep Learning', 'Bayesian Analysis', 'Signal Processing', 'NLP', 'Generative AI']
  },
  {
    category: 'Clinical Data Science',
    items: ['EHR Analysis', 'Statistical Modeling', 'Patient Outcomes', 'Clinical Trials', 'A/B Testing']
  },
  {
    category: 'Tools & Platforms',
    items: ['Git', 'Linux', 'Jupyter', 'Docker', 'HPC / Slurm']
  }
];

/* ── Render: Publications ─────────────────────────────────────── */
function renderPublications() {
  const list = document.getElementById('pub-list');
  if (!list) return;

  publications.forEach(pub => {
    const li = document.createElement('li');
    li.className = 'pub-item';

    const titleHtml = pub.url
      ? `<a href="${pub.url}" target="_blank" rel="noreferrer noopener">${pub.title}</a>`
      : pub.title;

    li.innerHTML =
      `<p class="pub-title">${titleHtml}</p>` +
      `<p class="pub-meta"><span class="pub-journal">${pub.venue}</span> &middot; ${pub.detail}</p>`;

    list.appendChild(li);
  });
}

/* ── Render: Skills ───────────────────────────────────────────── */
function renderSkills() {
  const grid = document.getElementById('skills-grid');
  if (!grid) return;

  skills.forEach(cat => {
    const card = document.createElement('div');
    card.className = 'skill-category';

    const pillsHtml = cat.items
      .map(item => `<span class="skill-pill">${item}</span>`)
      .join('');

    card.innerHTML =
      `<h4>${cat.category}</h4>` +
      `<div class="skill-pills">${pillsHtml}</div>`;

    grid.appendChild(card);
  });
}

/* ── Email assembly (anti-scraper?) ─────────────────────────────── */
function initEmail() {
  const el = document.getElementById('email-link');
  if (!el) return;

  const u = 'mohiuddin';           // local part (before @)
  const d = 'razu' + '.me';     // domain kept split to defeat simple scrapers

  el.href = 'mailto:' + u + '@' + d;
  el.textContent = u + '@' + d;
}

/* ── Copyright year ──────────────────────────────────── */
function initCopyrightYear() {
  const el = document.getElementById('copyright-year');
  if (el) el.textContent = new Date().getFullYear();
}

/* ── Mobile menu ─────────────────────────────────────────────── */
function initMobileMenu() {
  const hamburger  = document.querySelector('.nav-hamburger');
  const mobileMenu = document.querySelector('.nav-mobile');
  const closeBtn   = document.querySelector('.nav-mobile-close');
  const links      = document.querySelectorAll('.nav-mobile .nav-link');

  if (!hamburger || !mobileMenu) return;

  function openMenu() {
    mobileMenu.classList.add('is-open');
    mobileMenu.removeAttribute('aria-hidden');
    document.body.style.overflow = 'hidden';
    hamburger.setAttribute('aria-expanded', 'true');
    hamburger.classList.add('is-open');
  }

  function closeMenu() {
    mobileMenu.classList.remove('is-open');
    mobileMenu.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.classList.remove('is-open');
  }

  hamburger.addEventListener('click', () => {
    mobileMenu.classList.contains('is-open') ? closeMenu() : openMenu();
  });
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);
  links.forEach(l => l.addEventListener('click', closeMenu));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
}

/* ── Theme toggle ────────────────────────────────────────────── */
function setThemeIcon(btn, theme) {
  // Show sun when in dark mode (-> switch to light), moon when in light mode (-> switch to dark)
  if (theme === 'dark') {
    btn.innerHTML =
      '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
      'stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      '<circle cx="12" cy="12" r="5"/>' +
      '<line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>' +
      '<line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>' +
      '<line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>' +
      '<line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>' +
      '</svg>';
    btn.setAttribute('aria-label', 'Switch to light mode');
  } else {
    btn.innerHTML =
      '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
      'stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>' +
      '</svg>';
    btn.setAttribute('aria-label', 'Switch to dark mode');
  }
}

function initThemeToggle() {
  const btn = document.querySelector('.theme-toggle');
  if (!btn) return;

  const current = document.documentElement.getAttribute('data-theme') || 'dark';
  setThemeIcon(btn, current);

  btn.addEventListener('click', () => {
    const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    setThemeIcon(btn, next);
  });
}

/* ── Bootstrap ───────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  renderPublications();
  renderSkills();
  initEmail();
  initCopyrightYear();
  initMobileMenu();
  initThemeToggle();
});
