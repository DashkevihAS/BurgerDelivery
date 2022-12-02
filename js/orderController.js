import { modalDeliveryForm } from './elements.js';

export const orderController = (getCart, updateCartList) => {
  modalDeliveryForm.addEventListener('change', () => {
    if (modalDeliveryForm.format.value === 'pickup') {
      modalDeliveryForm['address-info'].classList.add(
        'modal-delivery__fieldset-input_hide',
      );
    }
    if (modalDeliveryForm.format.value === 'delivery') {
      modalDeliveryForm['address-info'].classList.remove(
        'modal-delivery__fieldset-input_hide',
      );
    }
  });

  modalDeliveryForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(modalDeliveryForm);

    const data = Object.fromEntries(formData);
    data.order = getCart();

    fetch('https://63895b67c5356b25a2feb4a8.mockapi.io/order', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json',
      },
    })
      .then((res) => {
        if (res.ok) {
          modalDeliveryForm.reset();
          updateCartList([]);
        }

        return res.json();
      })
      .then((data) => {
        modalDeliveryForm.textContent = '';
        const div = document.createElement('div');
        div.innerHTML = `
          <p>Ваш заказ: ${data.id} принят, менеджер ${data.manager}</p>
        `;
        modalDeliveryForm.append(div);
        console.log(data);
      });
  });
};
