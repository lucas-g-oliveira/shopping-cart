const products = document.getElementsByClassName('items');
const shopCart = document.getElementsByClassName('cart__items');
const cleamCart = document.getElementsByClassName('empty-cart')[0];
const btn = document.getElementsByClassName('item__add');
const totalCartPrice = document.getElementById('subtotal');
const qtdCart = document.getElementById('qtd_cart');

shopCart[0].innerHTML = '';

const saveStorage = () => {
  if (shopCart[0].length === 0) {
    saveCartItems('');
  } else {
    saveCartItems(shopCart[0].innerHTML);
  }
};

const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

const withDec = (n) => Math.round((Number(n) + Number.EPSILON) * 100) / 100;
withDec(12.02);

const calcSalesCart = async () => {
  const listItens = shopCart[0].childNodes;
  const listValues = [];
  if (listItens.length > 0) {
    listItens.forEach(async (e) => {
      const id = e.innerText.substring(5, 19);
      const itemAsync = await fetchItem(id);
      listValues.push(itemAsync.price);
      if (listValues.length === listItens.length) {
        totalCartPrice.innerText = Math.round(listValues
          .reduce((acc, curr) => acc + curr, 0) * 100) / 100;
      }
    });
  } else {
    totalCartPrice.innerHTML = 0;
  }
  saveStorage();
  qtdCart.innerText = listItens.length;
};

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
  calcSalesCart();
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
  calcSalesCart();
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
  calcSalesCart();
};

const loadingPageProducts = async () => {
  const data = await fetchProducts('computador');
  removeLoadingText();
  data.results.forEach((e) => {
    const element = createProductItemElement({ sku: e.id, name: e.title, image: e.thumbnail });
    products[0].appendChild(element);
    btn[btn.length - 1].addEventListener('click', associateListeners);
  });
  calcSalesCart();
};

addLoadingText();
loadingPageProducts();

window.onload = () => {
  shopCart[0].innerHTML = getSavedCartItems('cartItems');
  calcSalesCart();
  shopCart[0].childNodes.forEach((e) => {
    e.addEventListener('click', cartItemClickListener);
  });
};
