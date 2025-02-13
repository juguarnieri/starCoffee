class PedidoLista {
    constructor() {
      this.pedidos = [];
    }
  
    addPedido(produto) {
      if (!produto.id) {
        throw new Error("O pedido precisa ter um ID definido.");
      }
      this.pedidos.push(produto);
      return produto;
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
  
    deletePedido(id) {
      const pedido = this.getPedidoById(id);
      if (!pedido) {
        throw new Error("Pedido não encontrado.");
      }
      if (pedido.status !== "recebido") {
        throw new Error("O pedido já está em preparação e não pode ser cancelado.");
      }
      this.pedidos = this.pedidos.filter((p) => p.id !== id);
    }
  }
  
  module.exports = PedidoLista;
