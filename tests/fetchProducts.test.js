require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fetchProducts', () => {
  it('Testa se fetchProducts é uma função', () => {
    expect(typeof (fetchProducts)).toBe('function');
  });

  it('Testa se fetch é chamado', () => {
    fetchProducts('computador');
    expect(fetch).toBeCalled();
  });

  it('Verifica o endpoint da chamada com parâmetro da função "computador"', () => {
    fetchProducts('computador');
    expect(fetch).toBeCalledWith('https://api.mercadolibre.com/sites/MLB/search?q=computador');
  });

  it('Testa se o retorno da função c/ parâmetro "computador" tem a mesma estrutura de "computadorSearch"', async () => {
    expect(await fetchProducts('computador')).toEqual(computadorSearch);
  });

  it('Testa o erro se a função for chamada sem parâmetro', async () => {
    try {
      await fetchProducts();
    } catch (e) {
      expect(e.message).toBe('You must provide an url');
    }
  })
});
