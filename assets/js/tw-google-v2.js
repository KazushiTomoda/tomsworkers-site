/* Tom'sWorkers Google Ads service page: no third-party dependencies. */
(()=>{
  'use strict';
  const init=()=>{
  const menu=document.querySelector('.mobile-menu');
  if(menu){
    menu.querySelectorAll('nav a').forEach(a=>a.addEventListener('click',()=>{menu.open=false;}));
    document.addEventListener('keydown',e=>{if(e.key==='Escape'&&menu.open){menu.open=false;menu.querySelector('summary')?.focus();}});
    document.addEventListener('click',e=>{if(menu.open&&!menu.contains(e.target)){menu.open=false;}});
  }
  document.querySelectorAll('a[data-track="cta"]').forEach(a=>{
    a.addEventListener('click',()=>{
      if(typeof window.gtag!=='function')return;
      const href=a.getAttribute('href')||'';
      window.gtag('event','contact_click',{
        service:'google_ads',
        placement:a.dataset.placement||'body',
        destination_type:href.startsWith('mailto:')?'email':'anchor'
      });
    });
  });
  };
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});
  else init();
})();
