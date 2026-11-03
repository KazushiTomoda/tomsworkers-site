/* Tom'sWorkers LP v3: accessible menu behavior and GA4 event tracking. */
(()=>{'use strict';
const init=()=>{
 const menu=document.querySelector('.lp-v3 .mobile-menu');
 if(menu){menu.querySelectorAll('nav a').forEach(a=>a.addEventListener('click',()=>{menu.open=false}));
 document.addEventListener('keydown',e=>{if(e.key==='Escape'&&menu.open){menu.open=false;menu.querySelector('summary')?.focus()}});
 document.addEventListener('pointerdown',e=>{if(menu.open&&!menu.contains(e.target))menu.open=false});}
 document.querySelectorAll('.lp-v3 a[data-track]').forEach(a=>{
  a.addEventListener('click',()=>{
   if(typeof window.gtag!=='function')return;
   const crosslink=a.dataset.track==='crosslink';
   const href=a.getAttribute('href')||'';
   try{window.gtag('event',crosslink?'service_crosslink_click':'service_cta_click',{
    service:'lp',placement:a.dataset.placement||'page',destination_type:href.startsWith('mailto:')?'email':href.startsWith('#')?'anchor':'internal_page'
   });}catch(_e){};
  });
 });
};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
