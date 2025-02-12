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
  
    getPedidoById(id) {
      const pedido = this.pedidos.find((pedido) => pedido.id == id);
      if (!pedido) {
        throw new Error("Pedido não encontrado");
      }
      return {
        id: pedido.id,
        itens: pedido.itens,
        status: pedido.status,
      };
    }
  
};
  module.exports = PedidoLista;
  