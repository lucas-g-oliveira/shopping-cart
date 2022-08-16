const products = document.getElementsByClassName('items');
const shopCart = document.getElementsByClassName('cart__items');
const cleamCart = document.getElementsByClassName('empty-cart')[0];

const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

const withDec = (n) => Math.round((Number(n) + Number.EPSILON) * 100) / 100;
withDec(12.02);

const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

const addLoadingText = () => {
  const loading = createCustomElement('h3', 'loading', 'carregando...');
  products[0].appendChild(loading);
};

const removeLoadingText = () => {
  const loading = document.getElementsByClassName('loading');
  loading[0].parentNode.removeChild(loading[0]);
};

cleamCart.addEventListener('click', () => {
  shopCart[0].innerHTML = '';
});

const createProductItemElement = ({ sku, name, image }) => {
  const section = document.createElement('section');
  section.className = 'item';
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));
  return section;
};

const cartItemClickListener = (event) => {
  console.log('remove item dentro do carrinho');
  const item = event.target;
  item.remove(event);
  saveCartItems(shopCart[0].innerHTML);
};

const createCartItemElement = ({ sku, name, salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};

const associateListeners = async (evento) => {
  const id = `${evento.target.parentElement.querySelector('.item__sku').innerText}`;
  console.log('adidiona ao carrinho');
  const { price, title } = await fetchItem(id);
  const newElement = createCartItemElement({ sku: id, name: title, salePrice: price });
  shopCart[0].appendChild(newElement);
};

const loadingPageProducts = async () => {
  const data = await fetchProducts('computador');
  removeLoadingText();
  data.results.forEach((e) => {
    const element = createProductItemElement({ sku: e.id, name: e.title, image: e.thumbnail });
    products[0].appendChild(element);
    const btn = document.getElementsByClassName('item__add');
    btn[btn.length - 1].addEventListener('click', associateListeners);
  });
};

addLoadingText();
loadingPageProducts();

window.onload = () => {
  if (localStorage.getItem('cartItems') !== undefined) {
    shopCart[0].innerHTML = getSavedCartItems('cartItems');
    shopCart[0].childNodes.forEach((e) => {
      e.addEventListener('click', cartItemClickListener);
    });
  } else {
    shopCart[0].innerHTML = '';
  }
};
