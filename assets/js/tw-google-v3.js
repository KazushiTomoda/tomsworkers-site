/* Google Ads LP: menu controls and one-time CTA click tracking. */
(()=>{'use strict';
 const menu=document.querySelector('.google-v3 .mobile-menu');
 if(menu){menu.querySelectorAll('nav a').forEach(a=>a.addEventListener('click',()=>{menu.open=false}));
 document.addEventListener('keydown',e=>{if(e.key==='Escape'&&menu.open){menu.open=false;menu.querySelector('summary')?.focus()}});
 document.addEventListener('pointerdown',e=>{if(menu.open&&!menu.contains(e.target))menu.open=false});}
 // Keep keyboard focus and scroll instructions only when the comparison table actually overflows.
 const tableWrap=document.querySelector('.google-v3 .table-wrap');
 const tableHint=document.getElementById('pricing-scroll-hint');
 if(tableWrap&&tableHint){
   const syncTable=()=>{
     const canScroll=tableWrap.scrollWidth>tableWrap.clientWidth+1;
     tableHint.hidden=!canScroll;
     tableWrap.tabIndex=canScroll?0:-1;
     tableWrap.setAttribute('aria-label',canScroll?'プラン比較表（左右にスクロールできます）':'プラン比較表');
     if(canScroll)tableWrap.setAttribute('aria-describedby',tableHint.id);
     else tableWrap.removeAttribute('aria-describedby');
   };
   syncTable();
   window.addEventListener('resize',syncTable,{passive:true});
   if(document.fonts&&document.fonts.ready)document.fonts.ready.then(syncTable);
 }
 document.querySelectorAll('.google-v3 a[data-cta]').forEach(a=>{
   a.addEventListener('click',()=>{if(typeof window.gtag==='function')window.gtag('event','contact_open',{service:'google_ads',cta_location:a.dataset.cta,link_type:'internal'});});
 });
})();
