(() => {
  'use strict';
  const form = document.getElementById('contact-form');
  if (!form) return;
  const status = document.getElementById('form-status');
  const button = document.getElementById('form-submit');
  const service = document.getElementById('service');
  const source = document.getElementById('contact-source');
  const plan = document.getElementById('contact-plan');
  const query = new URLSearchParams(window.location.search);
  const selections = {
    'chatgpt-ads': 'ChatGPT広告支援',
    'web-ads': 'ウェブ広告支援',
    'google-ads': 'ウェブ広告支援',
    'lp': 'LP制作',
    'meo': 'MEO対策',
    'abc': 'AIブランド調査',
    'other': 'その他'
  };
  const serviceCode = query.get('service');
  if (serviceCode && Object.prototype.hasOwnProperty.call(selections, serviceCode)) {
    service.value = selections[serviceCode];
    source.value = 'LP: ' + serviceCode;
  }
  const sourcePlan = (query.get('plan') || '').slice(0, 80);
  if (sourcePlan) plan.value = sourcePlan;

  // Form ID must be configured in contact/index.html before accepting personal data.
  const endpoint = form.getAttribute('action') || '';
  const configured = /^https:\/\/formspree\.io\/f\/[a-z0-9]{6,}$/i.test(endpoint) && !endpoint.includes('REPLACE_');
  button.disabled = !configured;
  if (configured) {
    status.hidden = true;
  }

  function updateStatus(message, state) {
    status.hidden = false;
    status.dataset.state = state;
    status.textContent = message;
  }
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!configured || !form.reportValidity() || button.disabled) return;
    button.disabled = true;
    button.textContent = '送信中…';
    updateStatus('送信中です。しばらくお待ちください。', 'pending');
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        body: new FormData(form),
        headers: {'Accept': 'application/json'}
      });
      if (!response.ok) {
        if (response.status === 429) throw new Error('too-many-requests');
        throw new Error('submission-failed');
      }
      updateStatus('お問い合わせを受け付けました。ご連絡ありがとうございます。', 'success');
      form.reset();
      button.textContent = '送信済み';
      // Do not re-enable after success to avoid duplicates.
    } catch (error) {
      const message = error.message === 'too-many-requests'
        ? '短時間に送信が集中しています。時間をおいてから再度お試しください。'
        : '送信できませんでした。入力内容をご確認のうえ再度お試しいただくか、メールでお問い合わせください。';
      updateStatus(message, 'error');
      button.disabled = false;
      button.textContent = '再度送信する';
    }
  });
})();
