/* AI BRAND CHECK / progressive mobile navigation enhancement. */
(() => {
  'use strict';
  const menu = document.querySelector('.abc-redesign .mobile-menu');
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
})();
