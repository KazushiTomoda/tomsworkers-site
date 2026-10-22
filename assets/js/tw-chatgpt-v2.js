/* ChatGPT ads LP — progressive navigation only; FAQ uses native <details>. */
(() => {
  'use strict';
  const menu = document.querySelector('.tw-chatgpt .mobile-menu');
  if (!menu) return;
  menu.querySelectorAll('a').forEach(link => {
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
  /* Anchor CTA is tracked separately from mailto links, so the event action is accurate. */
  document.querySelectorAll('.tw-chatgpt a[href="#contact"]').forEach(link => {
    link.addEventListener('click', () => {
      if (typeof window.gtag !== 'function') return;
      try {
        window.gtag('event', 'service_cta_click', {
          service: 'chatgpt-ads',
          placement: link.closest('.hero') ? 'hero' : 'header',
          action: 'anchor_navigation'
        });
      } catch (_) { /* analytics must not block navigation */ }
    });
  });
})();
