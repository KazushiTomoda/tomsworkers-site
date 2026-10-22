/* Analytics only: no form fields, PII or external payload. */
(() => {
  const menu = document.querySelector('.home-redesign .mobile-menu');
  if (menu) {
    menu.querySelectorAll('nav a').forEach(link => {
      link.addEventListener('click', () => { menu.open = false; });
    });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && menu.open) {
        menu.open = false;
        menu.querySelector('summary')?.focus();
      }
    });
    document.addEventListener('click', event => {
      if (menu.open && !menu.contains(event.target)) menu.open = false;
    });
  }
  document.querySelectorAll('a[data-analytics-event]').forEach((link) => {
    link.addEventListener('click', () => {
      if (typeof window.gtag !== 'function') return;
      const name = link.dataset.analyticsEvent;
      if (!/^(contact_open|service_view)$/.test(name)) return;
      window.gtag('event', name, {
        service: link.dataset.service || 'general',
        page_location: location.origin + location.pathname,
        link_path: (new URL(link.href, location.href)).pathname
      });
    }, {passive: true});
  });
})();
