/* Love Scottish Coffee Shop — interactions */
(function () {
  'use strict';

  // Mobile nav
  var header = document.getElementById('siteHeader');
  var toggle = document.getElementById('navToggle');
  var nav = document.getElementById('mainNav');

  if (toggle && header) {
    toggle.addEventListener('click', function () {
      var open = header.classList.toggle('nav-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });
    // Close nav when a link is tapped
    if (nav) {
      nav.addEventListener('click', function (e) {
        if (e.target.tagName === 'A') {
          header.classList.remove('nav-open');
          toggle.setAttribute('aria-expanded', 'false');
        }
      });
    }
  }

  // Menu tabs
  var tabs = document.querySelectorAll('.tab');
  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      tabs.forEach(function (t) {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      var target = 'panel-' + tab.getAttribute('data-tab');
      document.querySelectorAll('.menu-panel').forEach(function (panel) {
        var show = panel.id === target;
        panel.classList.toggle('active', show);
        if (show) { panel.removeAttribute('hidden'); }
        else { panel.setAttribute('hidden', ''); }
      });
    });
  });

  // Reveal on scroll
  var revealEls = document.querySelectorAll('.reveal');
  function revealInView() {
    var vh = window.innerHeight || document.documentElement.clientHeight;
    revealEls.forEach(function (el) {
      if (el.classList.contains('in')) return;
      var r = el.getBoundingClientRect();
      if (r.top < vh - 40 && r.bottom > 40) el.classList.add('in');
    });
  }
  if ('IntersectionObserver' in window && revealEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
    // Fallback: rAF-throttled viewport check guarantees nothing stays hidden
    var ticking = false;
    window.addEventListener('scroll', function () {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(function () { revealInView(); ticking = false; });
      }
    }, { passive: true });
    window.addEventListener('load', revealInView);
  } else {
    revealEls.forEach(function (el) { el.classList.add('in'); });
  }
})();
