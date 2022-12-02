import {
  catalogList,
  countAmount,
  modalProductAdd,
  order,
  orderCount,
  orderList,
  orderSubmit,
  orderTotalAmount,
  orderWrapTitle,
} from './elements.js';
import { getData } from './getData.js';
import { PREFIX_PRODUCT, API_URL } from './const.js';
import { orderController } from './orderController.js';

const getCart = () => {
  const cartList = localStorage.getItem('cart');

  return cartList ? JSON.parse(cartList) : [];
};

const renderCartList = async () => {
  const cartList = getCart();

  orderSubmit.disabled = !cartList.length;

  const allId = cartList.map((item) => item.id);
  const data = cartList.length
    ? await getData(`${API_URL}${PREFIX_PRODUCT}?list=${allId}`)
    : [];

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
const removeCartItem = (id) => {
  const cartList = getCart();
  const productIndex = cartList.findIndex((item) => item.id === id);

  cartList[productIndex].count -= 1;

  if (cartList[productIndex].count < 1) {
    cartList.splice(productIndex, 1);
  }

  updateCartList(cartList);
};

const cartController = () => {
  catalogList.addEventListener('click', ({ target }) => {
    if (target.closest('.product__add')) {
      const id = target.closest('.product').dataset.idProduct;
      addCartItem(id);
    }
  });

  modalProductAdd.addEventListener('click', ({ target }) => {
    const modalProductBtn = target.closest('.modal-product__btn');

    if (modalProductBtn) {
      const id = modalProductBtn.dataset.idProduct;
      const count = +countAmount.textContent;
      addCartItem(id, count);
    }

    if (target.closest('.count__plus')) {
      target.previousElementSibling.textContent =
        +target.previousElementSibling.textContent + 1;
    }

    if (target.closest('.count__minus')) {
      if (+target.nextElementSibling.textContent > 1) {
        target.nextElementSibling.textContent -= 1;
      }
    }
  });

  orderList.addEventListener('click', ({ target }) => {
    const id = target.closest('.order__item').dataset.idProduct;

    if (target.closest('.count__plus')) {
      addCartItem(id);
    }
    if (target.closest('.count__minus')) {
      removeCartItem(id);
    }
  });

  orderWrapTitle.addEventListener('click', () => {
    order.classList.toggle('order_open');
  });
};

export const cartInit = () => {
  cartController();
  renderCartList();
  orderController(getCart, updateCartList);
};
