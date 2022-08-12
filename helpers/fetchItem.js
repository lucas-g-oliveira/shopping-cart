const fetchItem = async (id) => {
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
