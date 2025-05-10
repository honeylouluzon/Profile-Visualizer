export let FB_APP_ID        = '';
export let LLM_PROVIDER     = 'openai';
export let LLM_API_KEY      = '';
export let PAYMENT_MODE     = 'paypal';
export let PAYPAL_CLIENT_ID = '';
export let GCASH_CLIENT_ID  = '';

const modal = document.getElementById('settings-modal');
document.getElementById('open-settings').onclick = () => {
  document.getElementById('llm-provider').value = LLM_PROVIDER;
  document.getElementById('llm-api-key').value  = LLM_API_KEY;
  document.getElementById('payment-mode').value = PAYMENT_MODE;
  document.getElementById
  document.getElementById('gcash-client-id').value  = GCASH_CLIENT_ID;
  modal.classList.remove('hidden');
};
document.getElementById('cancel-settings').onclick = () => modal.classList.add('hidden');
document.getElementById('settings-form').onsubmit = e => {
  e.preventDefault();
  LLM_PROVIDER     = document.getElementById('llm-provider').value;
  LLM_API_KEY      = document.getElementById('llm-api-key').value.trim();
  PAYMENT_MODE     = document.getElementById('payment-mode').value;
  PAYPAL_CLIENT_ID = document.getElementById('paypal-client-id').value.trim();
  GCASH_CLIENT_ID  = document.getElementById('gcash-client-id').value.trim();

  localStorage.setItem('vibeSettings', JSON.stringify({
    LLM_PROVIDER, LLM_API_KEY, PAYMENT_MODE, PAYPAL_CLIENT_ID, GCASH_CLIENT_ID
  }));
  import('./payment.js').then(m=>m.initPayment());
  modal.classList.add('hidden');
};
window.addEventListener('DOMContentLoaded', () => {
  const saved = localStorage.getItem('vibeSettings');
  if (saved) Object.assign(window, JSON.parse(saved));
});
