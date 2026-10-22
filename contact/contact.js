(() => {
  'use strict';
  const address = 'info@tomsworkers.com';
  const compose = document.getElementById('contact-compose');
  const copy = document.getElementById('copy-email');
  const status = document.getElementById('copy-status');
  if (!compose || !copy || !status) return;

  // Existing LP links may use /contact/?service=meo etc. Keep this mapping
  // for a future common LINE contact channel as well.
  const serviceNames = Object.freeze({
    'chatgpt-ads': 'ChatGPT広告支援',
    'web-ads': 'ウェブ広告支援',
    'google-ads': 'Google広告支援',
    'lp': 'LP制作',
    'meo': 'MEO対策',
    'abc': 'AI BRAND CHECK',
    'other': 'その他'
  });
  const params = new URLSearchParams(window.location.search);
  const code = params.get('service');
  const service = Object.prototype.hasOwnProperty.call(serviceNames, code) ? serviceNames[code] : '';
  const plan = (params.get('plan') || '').slice(0, 80).replace(/[\r\n]/g, ' ');
  const subject = service ? "【" + service + "】Tom'sWorkersへのお問い合わせ" : "Tom'sWorkersへのお問い合わせ";
  const body = [
    'お名前・社名／屋号：',
    'ご相談したいサービス：' + (service || ''),
    ...(plan ? ['ご相談プラン：' + plan] : []),
    'ご相談内容：',
    ''
  ].join('\n');
  compose.href = 'mailto:' + address + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);

  copy.addEventListener('click', async () => {
    let copied = false;
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(address);
        copied = true;
      }
    } catch (_) { /* Use the fallback below. */ }
    if (!copied) {
      const temp = document.createElement('textarea');
      temp.value = address;
      temp.setAttribute('readonly', '');
      temp.style.position = 'fixed';
      temp.style.left = '-9999px';
      document.body.appendChild(temp);
      temp.select();
      try { copied = document.execCommand('copy'); } catch (_) { copied = false; }
      temp.remove();
    }
    status.textContent = copied
      ? 'メールアドレスをコピーしました。お使いのメールサービスに貼り付けてください。'
      : 'コピーできませんでした。上のメールアドレスを選択してコピーしてください。';
  });
})();
