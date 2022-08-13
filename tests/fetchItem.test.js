require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fetchItem', () => {
  it('Testa de fetchIten é uma função.', () => {
    expect(typeof (fetchItem)).toBe('function')
  })
  it('Testa se fetch é chamado', () => {
    fetchItem('MLB1615760527');
    expect(fetch).toBeCalled();
  })
  it('Testa o endpoint de fetchItem passando um parâmetro', () => {
    fetchItem('MLB1615760527');
    expect(fetch).toBeCalledWith("https://api.mercadolibre.com/items/MLB1615760527");
  })
  it('Testa o retorno na função sendo passado daterminado argumento', async () => {
    expect(await fetchItem("MLB1615760527")).toEqual(item);
  })
  it('Testa o erro se a função for chamada sem parâmetro', async () => {
    try {
      await fetchItem();
    } catch (e) {
      expect(e.message).toBe('You must provide an url');
    }
  })

});
