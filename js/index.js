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

const modalProduct = document.querySelector('.modal_product');
const catalogList = document.querySelector('.catalog__list');

const openModal = (product) => {
  const modalProductTitle = document.querySelector('.modal-product__title');
  const modalProductImage = document.querySelector('.modal-product__image');
  const modalProductDescription = document.querySelector(
    '.modal-product__description',
  );
  const ingredientsList = document.querySelector('.ingredients__list');
  const ingredientsCalories = document.querySelector('.ingredients__calories');
  const modalProductPriceCount = document.querySelector(
    '.modal-product__price-count',
  );

  modalProductTitle.textContent = product.title;
  modalProductImage.src = product.image;
  modalProductDescription.textContent = product.description;
  ingredientsCalories.textContent = `${product.weight}г, ккал ${product.calories}`;
  ingredientsList.textContent = '';
  modalProductPriceCount.textContent = product.price;
  const ingredientsListItems = product.ingridients.map((item) => {
    const li = document.createElement('li');
    li.classList.add('ingredients__item');
    li.textContent = item;
    return li;
  });
  ingredientsList.append(...ingredientsListItems);

  modalProduct.classList.add('modal_open');
};

const createCardProduct = (product) => {
  const li = document.createElement('li');
  li.classList.add('catalog__item');

  li.innerHTML = `
    <article class="product">
      <img
        class="product__image"
        src=${product.image}
        alt=${product.title}
      />

      <p class="product__price">
        ${product.price}<span class="currency">₽</span>
      </p>

      <h3 class="product__title">
        <button class="product__detail">${product.title}</button>
      </h3>

      <p class="product__weight">${product.weight}г</p>

      <button class="product__add">Добавить</button>
  </article>
  `;
  return li;
};

catalogList.textContent = '';
catalogList.append(createCardProduct(burgerMax));

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
