import { modalProduct, catalogList } from './elements.js';
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

  modalProduct.addEventListener('click', ({ target }) => {
    if (target === modalProduct || target.closest('.modal__close')) {
      modalProduct.classList.remove('modal_open');
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      modalProduct.classList.remove('modal_open');
    }
  });
};
