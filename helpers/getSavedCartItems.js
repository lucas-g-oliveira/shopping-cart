const getSavedCartItems = (key) => {
  if (key === undefined) {
    throw new Error('parameter is not defined');
  }
  try { 
    return localStorage.getItem(key);
  } catch (err) {
    return err.message;
  }
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
