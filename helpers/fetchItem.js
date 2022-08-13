const fetchItem = async (id) => {
  if (id === undefined) {
    throw new Error('You must provide an url');
  }
  try {
    const endpoint = `https://api.mercadolibre.com/items/${id}`;
    const response = await fetch(endpoint);
    const data = await response.json();
    return data;
  } catch (err) {
    return err.message;
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
