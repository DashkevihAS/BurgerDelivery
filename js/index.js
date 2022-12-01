import { modalProduct, catalogList } from './elements.js';
import { openModal } from './openModal.js';
import { renderListProduct } from './renderListProduct.js';
import { navigationListController } from './navigationListController.js';

catalogList.addEventListener('click', async ({ target }) => {
  if (target.closest('.product__detail') || target.closest('.product__image')) {
    const id = target.closest('.product').dataset.idProduct;
    openModal(id);
  }
});

modalProduct.addEventListener('click', (event) => {
  const target = event.target;
  if (target === modalProduct || target.closest('.modal__close')) {
    modalProduct.classList.remove('modal_open');
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    modalProduct.classList.remove('modal_open');
  }
});

const init = () => {
  renderListProduct();
  navigationListController(renderListProduct);
};

init();
