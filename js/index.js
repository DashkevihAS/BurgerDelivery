import { modalProduct, catalogList } from './elements.js';
import { openModal } from './openModal.js';
import { renderListProduct } from './renderListProduct.js';
import { navigationListController } from './navigationListController.js';

const burgerMax = {
  title: 'Бургер Макс',
  price: 10000,
  weight: 5000,
  calories: 15000,
  description: 'Огромный бургер - съешь сам или поделись с компанией',
  image: 'img/megaburger.jpg',
  ingridients: [
    'Пшеничная булочка',
    'Котлета из говядины',
    'Много сыра',
    'Листья салата',
    'Соус горчичный',
  ],
};

catalogList.addEventListener('click', ({ target }) => {
  if (target.closest('.product__detail') || target.closest('.product__image')) {
    openModal(burgerMax);
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
  navigationListController();
};

init();
