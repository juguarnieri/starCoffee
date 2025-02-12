class PedidoLista {
    constructor() {
      this.pedidos = [];
    }
  
    addPedido(pedido) {
      if (!pedido.id) {
        throw new Error("O pedido precisa ter um ID definido.");
      }
      this.pedidos.push(pedido);
      return pedido;
    }
};
  module.exports = PedidoLista;
  