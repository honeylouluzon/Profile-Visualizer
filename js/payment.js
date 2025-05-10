// js/payment.js
import { PAYMENT_MODE, PAYPAL_CLIENT_ID, GCASH_CLIENT_ID } from './settings.js';

export function initPayment() {
  if (PAYMENT_MODE==='paypal') {
    paypal.Buttons({
      style:{ layout:'vertical' },
      createOrder:() => paypal.Order.create({ purchase_units:[{ amount:{ value:'5.00' }}] }),
      onApprove:() => {
        window.isPaid = true;
        document.body.classList.add('paid');
      }
    }).render('#paypal-button-container');
  } else if (PAYMENT_MODE==='gcash') {
    // add GCash deep-link or QR code logic here
  }
}
document.addEventListener('DOMContentLoaded', initPayment);
