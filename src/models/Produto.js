const { v4: uuid4 } = require("uuid");
class Produto {
    constructor(nome, preco, status = "pendente") {
        this.id = uuid4();
        this.nome = nome;
        this.preco = preco;
        this.status = status;
    }
}

module.exports = Produto;
