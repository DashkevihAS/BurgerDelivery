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

  modalDeliveryForm.phone.addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/\D/g, '');
  });
  modalDeliveryForm.name.addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/\d/g, '');
  });

  modalDeliveryForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(modalDeliveryForm);

    const data = Object.fromEntries(formData);
    data.order = getCart();

    fetch('https://jsonplaceholder.typicode.com/posts', {
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
        const p = document.createElement('p');
        p.textContent = `
        ${data.name},ваш заказ ${data.id} принят, c вами свяжется менеджер по телефону ${data.phone}
        `;

        modalDeliveryForm.append(p);
        setTimeout(() => {
          p.remove();
        }, 8000);
        console.log(data);
      });
  });
};
