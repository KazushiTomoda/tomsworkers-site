"use strict";
/* One delegated analytics listener: no duplicate tw-lp.js loading. */
(function(){
  const menu=document.querySelector('.chatgpt-v3 .mobile-menu');
  if(menu){
    menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{menu.open=false}));
    document.addEventListener('keydown',e=>{if(e.key==='Escape'&&menu.open){menu.open=false;menu.querySelector('summary')?.focus()}});
    document.addEventListener('click',e=>{if(menu.open&&!menu.contains(e.target))menu.open=false});
  }
  document.addEventListener('click',function(e){
    const target=e.target;if(!(target instanceof Element))return;
    const link=target.closest('a[data-track]');if(!link||typeof window.gtag!=='function')return;
    const isCross=link.dataset.track==='crosslink';
    const href=link.getAttribute('href')||'';
    const action=link.dataset.action||(href.startsWith('mailto:')?'mailto_open':href.startsWith('#')?'anchor_navigation':'contact_page_navigation');
    try{window.gtag('event',isCross?'service_crosslink_click':'service_cta_click',{
      service:'chatgpt-ads',placement:link.dataset.placement||'page',action:action,
      ...(link.dataset.plan?{plan:link.dataset.plan}:{})
    })}catch(_error){}
  });
})();
