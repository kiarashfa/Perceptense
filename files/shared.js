/* ============================================================
   shared.js — Have a Sense About Everything
   Topbar injection · Theme toggle · Module navigation
   ============================================================ */

(function () {
  'use strict';

  /* --- Module registry (order matters for prev/next) --- */
  var MODULES = [
    { id: 1,  file: '01-everyday.html',      name: 'Everyday Objects' },
    { id: 2,  file: '02-biology.html',        name: 'Human Body & Biology' },
    { id: 3,  file: '03-geography.html',      name: 'Geography & Distance' },
    { id: 4,  file: '04-food.html',           name: 'Food & Cooking' },
    { id: 5,  file: '05-money.html',          name: 'Money & Economy' },
    { id: 6,  file: '06-infrastructure.html', name: 'Big Infrastructure' },
    { id: 7,  file: '07-time.html',           name: 'Time & Scale' },
    { id: 8,  file: '08-speed.html',          name: 'Speed & Duration' },
    { id: 9,  file: '09-size.html',           name: 'Size & Scale' },
    { id: 10, file: '10-history.html',        name: 'History Anchors' },
    { id: 11, file: '11-temperature.html',    name: 'Temperature & Energy' },
    { id: 12, file: '12-probability.html',    name: 'Probability & Risk' },
    { id: 13, file: '13-percentages.html',    name: 'Percentages & Ratios' },
    { id: 14, file: '14-materials.html',      name: 'Materials & Engineering' },
    { id: 15, file: '15-chemistry.html',      name: 'Chemistry' },
    { id: 16, file: '16-engineering.html',    name: 'Engineering Rules of Thumb' },
    { id: 17, file: '17-politics.html',       name: 'Politics' },
    { id: 18, file: '18-diplomacy.html',      name: 'Diplomacy' },
    { id: 19, file: '19-culinary.html',       name: 'Culinary Arts' },
    { id: 20, file: '20-drinks.html',         name: 'Drinks' },
    { id: 21, file: '21-fashion.html',        name: 'Fashion' },
    { id: 22, file: '22-sleep.html',          name: 'Sleep' },
    { id: 23, file: '23-gender.html',         name: 'Sex, Gender & Orientation' },
    { id: 24, file: '24-fitness.html',        name: 'Fitness & Exercise' },
    { id: 25, file: '25-weather.html',        name: 'Weather' },
    { id: 26, file: '26-space.html',          name: 'Space & the Solar System' },
    { id: 27, file: '27-psychology.html',     name: 'Psychology' },
    { id: 28, file: '28-philosophy.html',     name: 'Philosophy' },
    { id: 29, file: '29-art.html',            name: 'Art' }
  ];

  /* --- SVG icons --- */
  var IC = {
    sun:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>',
    moon:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>',
    info:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>',
    home:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>',
    prev:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>',
    next:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 6 15 12 9 18"/></svg>'
  };

  /* --- Detect context --- */
  var html = document.documentElement;
  var moduleNum = parseInt(html.getAttribute('data-module'), 10);
  var isModule = !isNaN(moduleNum);

  // Path prefix: modules are in /modules/, homepage is in /
  var prefix = isModule ? '../' : '';

  /* --- Find prev/next --- */
  var prevMod = null, nextMod = null;
  if (isModule) {
    for (var i = 0; i < MODULES.length; i++) {
      if (MODULES[i].id === moduleNum) {
        if (i > 0) prevMod = MODULES[i - 1];
        if (i < MODULES.length - 1) nextMod = MODULES[i + 1];
        break;
      }
    }
  }

  /* --- Build topbar HTML --- */
  var leftHtml = '';
  var rightHtml = '';

  if (isModule) {
    // Left: home + prev
    leftHtml += '<a href="' + prefix + 'index.html" class="topbar-btn" title="All modules" aria-label="All modules">' + IC.home + '</a>';
    if (prevMod) {
      leftHtml += '<a href="' + prevMod.file + '" class="topbar-btn" title="Previous: ' + prevMod.name + '" aria-label="Previous module">' + IC.prev + '</a>';
    } else {
      leftHtml += '<span class="topbar-btn topbar-btn--disabled" aria-hidden="true">' + IC.prev + '</span>';
    }
    if (nextMod) {
      leftHtml += '<a href="' + nextMod.file + '" class="topbar-btn" title="Next: ' + nextMod.name + '" aria-label="Next module">' + IC.next + '</a>';
    } else {
      leftHtml += '<span class="topbar-btn topbar-btn--disabled" aria-hidden="true">' + IC.next + '</span>';
    }
  }

  // Right: theme + info
  rightHtml += '<button class="topbar-btn" id="themeToggle" title="Toggle dark/light mode" aria-label="Toggle dark/light mode">' +
    '<span id="iconSun">' + IC.sun + '</span>' +
    '<span id="iconMoon" style="display:none">' + IC.moon + '</span>' +
    '</button>';
  rightHtml += '<a href="' + prefix + 'about.html" class="topbar-btn" title="About this project" aria-label="About this project">' + IC.info + '</a>';

  var topbar = document.createElement('div');
  topbar.className = 'topbar';
  topbar.innerHTML =
    '<div class="topbar-left">' + leftHtml + '</div>' +
    '<div class="topbar-right">' + rightHtml + '</div>';

  // Insert at very start of body
  document.body.insertBefore(topbar, document.body.firstChild);

  // Remove old nav-back link if topbar replaces it
  var oldNav = document.querySelector('.nav-back');
  if (oldNav) oldNav.remove();

  /* --- Theme toggle --- */
  var themeBtn = document.getElementById('themeToggle');
  var iconSun = document.getElementById('iconSun');
  var iconMoon = document.getElementById('iconMoon');

  function getSystemTheme() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function resolveTheme(theme) {
    return theme === 'auto' ? getSystemTheme() : theme;
  }

  function applyTheme(theme) {
    html.setAttribute('data-theme', theme);
    var resolved = resolveTheme(theme);
    if (resolved === 'dark') {
      iconSun.style.display = 'none';
      iconMoon.style.display = 'block';
    } else {
      iconSun.style.display = 'block';
      iconMoon.style.display = 'none';
    }
  }

  var saved = localStorage.getItem('hasense-theme');
  applyTheme(saved || 'auto');

  themeBtn.addEventListener('click', function () {
    var current = html.getAttribute('data-theme');
    var next;
    if (current === 'auto') {
      next = getSystemTheme() === 'dark' ? 'light' : 'dark';
    } else if (current === 'dark') {
      next = 'light';
    } else {
      next = 'dark';
    }
    localStorage.setItem('hasense-theme', next);
    applyTheme(next);
  });

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function () {
    if (html.getAttribute('data-theme') === 'auto') applyTheme('auto');
  });

})();
