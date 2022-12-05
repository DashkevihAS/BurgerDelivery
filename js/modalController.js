import {
  modalProduct,
  catalogList,
  modalDelivery,
  orderSubmit,
} from './elements.js';
import { openModal } from './openModal.js';

export const modalController = () => {
  catalogList.addEventListener('click', async ({ target }) => {
    if (
      target.closest('.product__detail') ||
      target.closest('.product__image')
    ) {
      const id = target.closest('.product').dataset.idProduct;
      openModal(id);
    }
  });

  orderSubmit.addEventListener('click', () => {
    modalDelivery.classList.add('modal_open');
  });

  const closeModal = (modal, target) => {
    if (target === modal || target.closest('.modal__close')) {
      modal.classList.remove('modal_open');
    }

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        modal.classList.remove('modal_open');
      }
    });
  };

  modalProduct.addEventListener('click', ({ target }) => {
    closeModal(modalProduct, target);
  });

  modalDelivery.addEventListener('click', ({ target }) => {
    closeModal(modalDelivery, target);
  });
};
