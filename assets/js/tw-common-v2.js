/* Shared-page menu behaviour and privacy-safe contact-link analytics. */
(()=>{'use strict';
const menu=document.querySelector('.tw-mobile-menu');
if(menu){menu.querySelectorAll('nav a').forEach(a=>a.addEventListener('click',()=>{menu.open=false}));document.addEventListener('keydown',e=>{if(e.key==='Escape'&&menu.open){menu.open=false;menu.querySelector('summary')?.focus()}});document.addEventListener('click',e=>{if(menu.open&&!menu.contains(e.target))menu.open=false});}
const allowed=new Set(['contact','privacy','terms']);
const page=document.body.classList.contains('tw-page-contact')?'contact':document.body.classList.contains('tw-page-privacy')?'privacy':'terms';
if(allowed.has(page))document.querySelectorAll('a[href^="mailto:"]').forEach(a=>a.addEventListener('click',()=>{if(typeof window.gtag==='function')window.gtag('event','contact_open',{service:'general',page_type:page,link_type:'mailto'})}));
})();
