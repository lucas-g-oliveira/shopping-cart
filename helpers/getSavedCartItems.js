const getSavedCartItems = (key) => {
  if (key === undefined) {
    throw new Error('parameter is not defined');
  }
  const data = localStorage.getItem(key);
  console.log('recuperando Storage');
  console.log(data);
  return data;
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
