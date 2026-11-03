/* Tom'sWorkers / ABC v5. Click events measure navigation intent, not submissions. */
(()=>{'use strict';
  const root=document.querySelector('.tw-abc-v3');
  if(!root)return;
  const menu=root.querySelector('.mobile-menu');
  if(menu){
    const toggle=menu.querySelector('summary');
    menu.querySelectorAll('nav a').forEach(link=>link.addEventListener('click',()=>{menu.open=false}));
    document.addEventListener('keydown',event=>{
      if(event.key==='Escape'&&menu.open){menu.open=false;toggle?.focus();}
    });
    document.addEventListener('click',event=>{
      if(menu.open&&!menu.contains(event.target))menu.open=false;
    });
    menu.addEventListener('toggle',()=>{
      if(toggle)toggle.setAttribute('aria-label',menu.open?'メニューを閉じる':'メニューを開く');
    });
  }

  const dialog=root.querySelector('#report-dialog');
  if(dialog&&typeof dialog.showModal==='function'){
    let opener=null;
    const destination=dialog.querySelector('.dialog-report-body');
    const title=dialog.querySelector('#report-dialog-title');
    const close=dialog.querySelector('.dialog-close');
    root.querySelectorAll('[data-open-report]').forEach(button=>{
      const source=root.querySelector('.report-page[data-report="'+button.dataset.openReport+'"]');
      if(!source)return;
      button.hidden=false;
      button.addEventListener('click',()=>{
        opener=button;
        title.textContent=button.dataset.openReport==='summary'?'調査結果サマリー｜説明用サンプル':'改善提案・優先順位｜説明用サンプル';
        const copy=source.cloneNode(true);
        copy.removeAttribute('data-report');
        destination.replaceChildren(copy);
        // The dialog has its own accessible heading. Keep nested report headings in order.
        const heading=copy.querySelector('h3');
        if(heading){const h=document.createElement('h3');h.innerHTML=heading.innerHTML;heading.replaceWith(h);}
        dialog.showModal();
        root.classList.add('report-open');
        dialog.scrollTop=0;
        close?.focus({preventScroll:true});
      });
    });
    close?.addEventListener('click',()=>dialog.close());
    dialog.addEventListener('click',event=>{
      if(event.target===dialog)dialog.close();
    });
    dialog.addEventListener('keydown',event=>{
      if(event.key!=='Tab')return;
      const controls=Array.from(dialog.querySelectorAll('a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])'))
        .filter(control=>!control.hidden&&control.getClientRects().length>0);
      const first=controls[0],last=controls[controls.length-1];
      if(!first){event.preventDefault();close?.focus();return;}
      const active=document.activeElement;
      if(event.shiftKey&&(active===first||!dialog.contains(active))){event.preventDefault();last.focus();}
      else if(!event.shiftKey&&(active===last||!dialog.contains(active))){event.preventDefault();first.focus();}
    });
    // Native dialog supplies Escape dismissal and an inert background; Tab wraps explicitly.
    dialog.addEventListener('close',()=>{
      root.classList.remove('report-open');
      destination.replaceChildren();
      if(opener?.isConnected)opener.focus({preventScroll:true});
    });
  }

  document.addEventListener('click',event=>{
    if(!(event.target instanceof Element))return;
    const link=event.target.closest('a[data-track]');
    if(!link||typeof window.gtag!=='function')return;
    const crosslink=link.dataset.track==='crosslink';
    try{window.gtag('event',crosslink?'service_crosslink_click':'service_cta_click',{
      service:'abc',placement:link.dataset.placement||'page',
      action:crosslink?'related_service_navigation':'contact_page_navigation',
      ...(link.dataset.plan?{plan:link.dataset.plan}:{})
    });}catch(_error){/* Analytics failure must never block navigation. */}
  });
})();
