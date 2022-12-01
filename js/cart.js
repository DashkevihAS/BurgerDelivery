import {
  catalogList,
  countAmount,
  modalProductAdd,
  orderCount,
  orderList,
  orderTotalAmount,
} from './elements.js';
import { getData } from './getData.js';
import { PREFIX_PRODUCT, API_URL } from './const.js';

const getCart = () => {
  const cartList = localStorage.getItem('cart');
  if (cartList) {
    return JSON.parse(cartList);
  } else {
    return [];
  }
};

const renderCartList = async () => {
  const cartList = getCart();

  if (!cartList.length) {
    orderList.textContent = '';
    orderCount.textContent = 0;
    orderTotalAmount.textContent = 0;
    return;
  }

  const allId = cartList.map((item) => item.id);

  const data = await getData(`${API_URL}${PREFIX_PRODUCT}?list=${allId}`);

  orderCount.textContent = cartList.reduce((sum, item) => sum + item.count, 0);
  orderTotalAmount.textContent = data.reduce(
    (sum, item) =>
      sum +
      item.price * cartList.find((cartItem) => cartItem.id === item.id).count,
    0,
  );

  const cartItems = data.map((item) => {
    const li = document.createElement('li');
    li.classList.add('order__item');
    li.dataset.idProduct = item.id;
    const product = cartList.find((cartItem) => cartItem.id === item.id);
    li.innerHTML = `
      <img
        src=${API_URL}/${item.image}
        alt=${item.title}
        class="order__image"
      />

      <div class="order__product">
        <h3 class="order__product-title">${item.title}</h3>

        <p class="order__product-weight">${item.weight}г</p>

        <p class="order__product-price">${item.price}₽</p>
      </div>

      <div class="order__product-count count">
        <button class="count__minus">-</button>

        <p class="count__amount">${product.count}</p>

        <button class="count__plus">+</button>
      </div>
    `;
    return li;
  });

  orderList.textContent = '';
  orderList.append(...cartItems);
};

const updateCartList = (cartList) => {
  localStorage.setItem('cart', JSON.stringify(cartList));
  renderCartList();
};

const addCartItem = (id, count = 1) => {
  const cartList = getCart();
  const product = cartList.find((item) => item.id === id);

  if (product) {
    product.count += count;
  } else {
    cartList.push({ id, count });
  }
  updateCartList(cartList);
};
const removeCartItem = (id, count) => {
  const cartList = getCart();
  const product = cartList.find((item) => item.id === id);
  if (count > 1) {
    product.count -= 1;
    updateCartList(cartList);
  } else {
    const filteredCardList = cartList.filter((item) => item.id !== id);
    updateCartList(filteredCardList);
  }
};

const cartController = () => {
  catalogList.addEventListener('click', ({ target }) => {
    if (target.closest('.product__add')) {
      const id = target.closest('.product').dataset.idProduct;
      addCartItem(id);
    }
  });

  modalProductAdd.addEventListener('click', ({ target }) => {
    const modalProductAdd = target.closest('.modal-product__btn');

    if (modalProductAdd) {
      const id = modalProductAdd.dataset.idProduct;
      const count = +countAmount.textContent;
      addCartItem(id, count);
    }

    if (target.closest('.count__plus')) {
      target.previousElementSibling.textContent =
        +target.previousElementSibling.textContent + 1;
    }

    if (target.closest('.count__minus')) {
      if (target.nextElementSibling.textContent > 1) {
        target.nextElementSibling.textContent -= 1;
      }
    }
  });

  orderList.addEventListener('click', ({ target }) => {
    if (target.closest('.count__plus')) {
      const id = target.closest('.order__item').dataset.idProduct;
      addCartItem(id);
    }

    if (target.closest('.count__minus')) {
      const id = target.closest('.order__item').dataset.idProduct;
      const count = +target.nextElementSibling.textContent;
      removeCartItem(id, count);
    }
  });
};

export const cartInit = () => {
  cartController();
  renderCartList();
};
