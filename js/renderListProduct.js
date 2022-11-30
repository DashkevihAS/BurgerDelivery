import { PREFIX_PRODUCT, API_URL } from './const.js';
import { catalogList } from './elements.js';

import { getData } from './getData.js';
import { createCardProduct } from './createCardProduct.js';

export const renderListProduct = async (category = 'burger') => {
  catalogList.textContent = '';

  const listProducts = await getData(`${API_URL}${PREFIX_PRODUCT}`);

  const listCards = listProducts
    .filter((item) => item.category === category)
    .map(createCardProduct);
  catalogList.append(...listCards);
};
