const product = {
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

const modalProduct = document.querySelector('.modal_product');
const catalogList = document.querySelector('.catalog__list');

const modalProductTitle = document.querySelector('.modal-product__title');
const modalProductImage = document.querySelector('.modal-product__image');
const modalProductDescription = document.querySelector(
  '.modal-product__description',
);
const ingredientsList = document.querySelector('.ingredients__list');
const ingredientsItem = document.querySelector('.ingredients__item');
const ingredientsCalories = document.querySelector('.ingredients__calories');
const modalProductPriceCount = document.querySelector(
  '.modal-product__price-count',
);

modalProductTitle.textContent = product.title;
modalProductImage.src = product.image;
modalProductDescription.textContent = product.description;
ingredientsCalories.textContent = `${product.weight}г, ккал ${product.calories}`;
ingredientsList.textContent = '';

const ingredientsListItems = product.ingridients.map((item) => {
  const li = document.createElement('li');
  li.classList.add('ingredients__item');
  li.textContent = item;
  return li;
});
ingredientsList.append(...ingredientsListItems);

catalogList.addEventListener('click', ({ target }) => {
  if (target.closest('.product__detail') || target.closest('.product__image')) {
    modalProduct.classList.add('modal_open');
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
