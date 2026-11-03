"use strict";
// Only the service page's own navigation and events are handled here.
(() => {
  const menu = document.querySelector('.meo-v3 .mobile-menu');
  if (menu) {
    menu.querySelectorAll('nav a').forEach(link => link.addEventListener('click', () => { menu.open = false; }));
    document.addEventListener('keydown', event => { if (event.key === 'Escape' && menu.open) { menu.open = false; menu.querySelector('summary')?.focus(); } });
    document.addEventListener('click', event => { if (menu.open && !menu.contains(event.target)) menu.open = false; });
  }
  document.addEventListener('click', event => {
    if (!(event.target instanceof Element)) return;
    const link = event.target.closest('a[data-track]');
    if (!link || typeof window.gtag !== 'function') return;
    const crosslink = link.dataset.track === 'crosslink';
    window.gtag('event', crosslink ? 'service_crosslink_click' : 'service_cta_click', {
      service: 'meo', placement: link.dataset.placement || 'page',
      action: crosslink ? 'related_service_navigation' : 'contact_page_open'
    });
  });
})();
