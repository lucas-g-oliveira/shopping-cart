const saveCartItems = (shopCart) => {
  if (shopCart === undefined) {
    throw new Error('parameter is not defined');
  }
  try {
    localStorage.setItem('cartItems', shopCart);
  } catch (err) {
    return err.message;
  }
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
