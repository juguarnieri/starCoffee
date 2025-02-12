class Pedido {
    constructor(itens, status = "pendente") {
        this.id = Date.now();  // Gera um ID único para o pedido
        this.itens = itens;
        this.status = status; 
    }
}

module.exports = Pedido;
