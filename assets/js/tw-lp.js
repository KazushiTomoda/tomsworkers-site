"use strict";
/* Progressive enhancement only: navigation and mailto work without JavaScript. */
document.addEventListener('click', function (event) {
  const target = event.target;
  if (!(target instanceof Element)) return;
  const link = target.closest('a[data-track]');
  if (!link || typeof window.gtag !== 'function') return;
  const service = document.body.dataset.service ||
    (window.location.pathname.match(/\/(abc|meo|chatgpt-ads|google-ads|lp)\//) || [])[1] || 'unknown';
  const crosslink = link.dataset.track === 'crosslink';
  try {
    window.gtag('event', crosslink ? 'service_crosslink_click' : 'service_cta_click', {
      service: service,
      placement: link.dataset.placement || 'page',
      action: crosslink ? 'related_service_navigation' : 'mailto_open'
    });
  } catch (_error) { /* Optional analytics must not block navigation. */ }
});
