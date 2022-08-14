const saveCartItems = (shopCart) => {
  if (shopCart === undefined) {
    throw new Error('parameter is not defined');
  }
  localStorage.setItem('cartItems', shopCart);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
