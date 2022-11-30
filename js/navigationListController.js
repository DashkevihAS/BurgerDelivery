import {
  navigationListItems,
  navigationList,
  catalogTitle,
} from './elements.js';
import { renderListProduct } from './renderListProduct.js';

export const navigationListController = () => {
  navigationList.addEventListener('click', ({ target }) => {
    if (!target.closest('.navigation__button')) return;

    navigationListItems.forEach((item) => {
      item.classList.remove('navigation__button_active');
    });
    target.classList.add('navigation__button_active');

    const title = target.textContent;
    catalogTitle.textContent = title;

    const category = target.dataset.category;
    renderListProduct(category);
  });
};
