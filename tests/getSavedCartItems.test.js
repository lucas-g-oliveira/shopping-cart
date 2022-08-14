const localStorageSimulator = require('../mocks/localStorageSimulator');
const getSavedCartItems = require('../helpers/getSavedCartItems');

localStorageSimulator('getItem');

describe('4 - Teste a função getSavedCartItems', () => {
  it('Testa se é uma função', () => {
    expect(typeof (getSavedCartItems)).toBe('function');
  });

  it('Testa se o localStorage.getItem é chamado', () => {
    getSavedCartItems('cartItems');
    expect(localStorage.getItem).toBeCalled();
  });

  it('Testa o parâmetro de localStorage, se é o mesmo passadp pra função', () => {
    getSavedCartItems('cartItems');
    expect(localStorage.getItem).toHaveBeenCalledWith('cartItems')
  });

  it('Testa se ocorre um erro ao chamar a função sem parâmetro', () => {
    expect(()=> getSavedCartItems()).toThrow()
  })

  it('Testa a mensaagem de erro caso não receba nenhum parâmetro', async () => {
    try {
      await getSavedCartItems();
    } catch (err) {
      expect(err.message).toBe('parameter is not defined');
    }
  });
});
