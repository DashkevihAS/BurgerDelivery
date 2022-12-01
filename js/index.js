import { renderListProduct } from './renderListProduct.js';
import { navigationListController } from './navigationListController.js';
import { cartInit } from './cart.js';
import { modalController } from './modalController.js';

const init = () => {
  renderListProduct();
  navigationListController(renderListProduct);
  modalController();
  cartInit();
};

init();
