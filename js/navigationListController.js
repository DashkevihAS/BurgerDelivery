import {
  navigationListItems,
  navigationList,
  catalogTitle,
} from './elements.js';

export const navigationListController = (cb) => {
  navigationList.addEventListener('click', ({ target }) => {
    if (!target.closest('.navigation__button')) return;

    navigationListItems.forEach((item) => {
      item.classList.remove('navigation__button_active');
    });
    target.classList.add('navigation__button_active');

    const title = target.textContent;
    catalogTitle.textContent = title;

    const category = target.dataset.category;
    cb(category);
  });
};
