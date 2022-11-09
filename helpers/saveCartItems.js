const saveCartItems = (shopCart) => {
  if (shopCart === undefined) {
    throw new Error('parameter is not defined');
  }
  console.log('salvando Storage');
  console.log(shopCart);
  localStorage.setItem('cartItems', shopCart);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
