class ListaMenu {
    constructor() {
        this.menu = []
    }
    addPedido(produto) {
        if (!produto.id) {
          throw new Error("O pedido precisa ter um ID definido.");
        }
        this.menu.push(produto);
        return produto;
      }
}

module.exports = ListaMenu;
