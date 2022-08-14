const localStorageSimulator = require('../mocks/localStorageSimulator');
const saveCartItems = require('../helpers/saveCartItems');

localStorageSimulator('setItem');

describe('3 - Teste a função saveCartItems', () => {
  it('  Testa se é uma função', () => {
    expect(typeof(saveCartItems)).toBe('function');
  })

  it('Testa se ao chamar a função saveCartItens, localStorage.setItem() é chamado', () => {
    saveCartItems('<ol><li>Item</li></ol>');
    expect(localStorage.setItem).toBeCalled();

  });

  it('Testa os parâmetros de localStorage.setItem', () => {
    saveCartItems('<ol><li>Item</li></ol>');
    expect(localStorage.setItem).toHaveBeenCalledWith('cartItems', '<ol><li>Item</li></ol>');
  })

  it('Testa se a função falha ao não passar parâmetros', () => {
    expect(() => saveCartItems()).toThrow();
  })

  it('Testa se retorna um erro caso o parâmetro não for passado', async () => {
    try {
      await saveCartItems();
    } catch (err) {
      expect(err.message).toBe('parameter is not defined');
    }
  })
});
