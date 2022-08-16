const products = document.getElementsByClassName('items');
const shopCart = document.getElementsByClassName('cart__items');
const subtotal = document.getElementById('subtotal');
const cleamCart = document.getElementsByClassName('empty-cart')[0];

/*
const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText;
*/

const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

const withDec = (n) => Math.round((Number(n) + Number.EPSILON) * 100) / 100;

const smartCalc = async () => {
  const value = [];
  const eCarts = shopCart[0].childNodes;
  eCarts.forEach(async (e) => {
    const id = e.innerText.substring(5, 18);
    const valor = await fetchItem(id);
    value.push(valor.price);
    if (value.length === eCarts.length) {
      saveCartItems(shopCart[0].innerHTML);
      subtotal.innerText = withDec(
        value
        .reduce((acc, crr) => withDec(acc) + withDec(crr), 0)
      );
    }
  });
  if (eCarts.length === 0) {
    saveCartItems(shopCart[0].innerHTML);
    subtotal.innerText = Number(0);
  }
};

const addLoadingText = () => {
  const loading = createCustomElement('h3', 'loading', 'carregando...');
  products[0].appendChild(loading);
};

const removeLoadingText = () => {
  const loading = document.getElementsByClassName('loading');
  loading[0].parentNode.removeChild(loading[0]);
  smartCalc();
};

cleamCart.addEventListener('click', () => {
  shopCart[0].innerHTML = ``;
  smartCalc();
});

const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

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
  const item = event.target;
  item.remove(event);
  smartCalc();
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
  const btnInfo = `${evento.target.parentElement.innerHTML}`;
  const id = btnInfo.substring(37, 24);
  const data = await fetchItem(id);
  const { price, title } = data;
  const newElement = createCartItemElement({ sku: id, name: title, salePrice: price });
  shopCart[0].appendChild(newElement);
  smartCalc();
};

const inflate = async () => {
  const data = await fetchProducts('computador');
  removeLoadingText();
  data.results.forEach((e) => {
    const element = createProductItemElement({ sku: e.id, name: e.title, image: e.thumbnail });
    element.classList = 'item';
    products[0].appendChild(element);
    const btn = document.getElementsByClassName('item__add');
    btn[btn.length - 1].addEventListener('click', associateListeners);
  });
};

addLoadingText();

inflate();

window.onload = () => {
  if (localStorage.getItem('cartItems') !== undefined) {
    shopCart[0].innerHTML = getSavedCartItems('cartItems');
    shopCart[0].childNodes.forEach((e) => {
      e.addEventListener('click', cartItemClickListener);
    });
  }else{
    shopCart[0].innerHTML = '';
  }
};
