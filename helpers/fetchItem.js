const fetchItem = async (id) => {
  if (id === undefined) {
    throw new Error('You must provide an url');
  }
  const endpoint = `https://api.mercadolibre.com/items/${id}`;
  const response = await fetch(endpoint);
  const data = await response.json();
  return data;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
