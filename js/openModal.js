import {
  modalProduct,
  modalProductTitle,
  modalProductImage,
  modalProductDescription,
  ingredientsList,
  ingredientsCalories,
  modalProductPriceCount,
} from './elements.js';

export const openModal = (product) => {
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
