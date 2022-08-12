const products = document.getElementsByClassName('items');
const shopCart = document.getElementsByClassName('cart__items');
const subtotal = document.getElementById('subtotal');
const cleamCart = document.getElementsByClassName('empty-cart')[0];

const updateLocalStorage = () => {
  const eCarts = shopCart[0].childNodes;
  let jsonData = { data: [] };
  eCarts.forEach((e) => {
    jsonData.data.push(e.innerText);
    localStorage.setItem('item',JSON.stringify(jsonData))
  });
}

const smartCalc = () => {
  let value = 0;
  const eCarts = shopCart[0].childNodes;
  eCarts.forEach((e) => {
    let acc = '';
    for (let i = e.innerText.length - 1; i > 0; i -= 1) {
      if (e.innerText[i] === '$') {
        i = 0;
      } else {
        acc = `${e.innerText[i]}` + acc;
      }
    }
    value += Number(acc);
  })
  subtotal.innerText = `Subtotal: R$ ${Math.round(value * 100) / 100}`;
  updateLocalStorage();
}

cleamCart.addEventListener('click', () => {
  shopCart[0].innerHTML = '';
  console.log('clicou');
  smartCalc();
});

const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
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

const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText;

const cartItemClickListener = (event) => {
  const item = event.target;
  item.remove(event);
  smartCalc()
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
  const id = btnInfo.substring(37, 24)
  const data = await fetchItem(id);
  const { price, title } = data;
  const newElement = createCartItemElement({ sku: id, name: title, salePrice: price })
  shopCart[0].appendChild(newElement);
  smartCalc();
}


const inflate = async () => {
  const data = await fetchProducts('computador');
  data.results.forEach((e) => {
    const element = createProductItemElement({ sku: e.id, name: e.title, image: e.thumbnail });
    products[0].appendChild(element);
    const btn = document.getElementsByClassName('item__add');
    btn[btn.length - 1].addEventListener('click', associateListeners);
  });
}

inflate();
window.onload = () => {
  if (localStorage.getItem('cart') !== undefined) {
    console.log('não é nulo');
    lstorage = JSON.parse(localStorage.getItem('item'));
    console.log(lstorage);
    lstorage.data.forEach((e)=>{
      const li = document.createElement('li');
      li.innerText = e;
      li.className = 'cart__item';
      li.addEventListener('click', cartItemClickListener);
      shopCart[0].appendChild(li);
    });
    smartCalc();
  } else {
    localStorage.setItem('cart', '');
  }
};
