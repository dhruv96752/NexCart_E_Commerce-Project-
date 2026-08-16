/* Supports carts created before MongoDB product ObjectIds were available. */
function showOrderSuccess(order){const modal=document.createElement('div');modal.className='order-success-backdrop';modal.innerHTML=`<section class="order-success-modal" role="dialog" aria-modal="true" aria-labelledby="order-success-title"><div class="order-success-check">✓</div><h2 id="order-success-title">Order placed successfully!</h2><p>Thank you for shopping with NexCart. We have received your order and will keep you updated about its delivery.</p><div class="order-reference">ORDER #${String(order._id).slice(-6).toUpperCase()}</div><div class="order-success-actions"><button type="button" data-continue>Continue shopping</button><a class="btn" href="orders.html">View my orders</a></div></section>`;document.body.appendChild(modal);modal.querySelector('[data-continue]').onclick=()=>location.href='products.html'}
function checkout(){
  const root=document.querySelector('#app');
  if(!items().length){root.innerHTML=msg('Your cart is empty.',true);return}
  const safeOrderItems=()=>items().map(item=>{
    const id=item._id||item.id;
    const base={name:item.name,price:item.price,quantity:item.quantity};
    return /^[a-f\d]{24}$/i.test(String(id))?{...base,product:id}:base;
  });
  root.innerHTML=`<div class="grid"><form class="panel checkout-panel" id="checkout"><h1>Secure checkout</h1><p class="muted">A few details and your order will be on its way.</p><label>Full name<input name="name" required></label><label>Phone<input name="phone" required></label><label>Delivery address<textarea name="address" required></textarea></label><div class="grid"><label>City<input name="city" required></label><label>Pincode<input name="pincode" required></label></div><label>Payment method<select name="paymentMethod"><option value="COD">Cash on Delivery</option><option value="ONLINE">Demo Online Payment</option></select></label><p class="payment-note">🔒 Your order and delivery details are protected.</p><button>Place secure order →</button><p id="out"></p></form><aside class="summary checkout-summary"><span class="section-label">ORDER SUMMARY</span><h3>Ready when you are</h3>${items().map(x=>`<div class="row"><span>${x.name} × ${x.quantity}</span><b>${money(x.price*x.quantity)}</b></div>`).join('')}<hr><div class="row total-row"><b>Total</b><b>${money(total()+99)}</b></div><p class="muted">Includes ₹99 delivery</p></aside></div>`;
  root.querySelector('#checkout').onsubmit=async event=>{
    event.preventDefault();
    try{
      const form=Object.fromEntries(new FormData(event.target));
      const response=await api.post('/orders',{items:safeOrderItems(),shippingAddress:form,paymentMethod:form.paymentMethod,deliveryFee:99});
      NexCart.clear();
      showOrderSuccess(response.order);
    }catch(error){root.querySelector('#out').innerHTML=msg(error.message,true)}
  };
}
