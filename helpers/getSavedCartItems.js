const getSavedCartItems = (key) => {
  if (key === undefined) {
    throw new Error('parameter is not defined');
  }
  return localStorage.getItem(key);
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
