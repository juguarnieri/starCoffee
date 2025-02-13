
const { v4: uuid4 } = require("uuid");
class Produto {
    constructor(nome, preco) {
        this.id = uuid4();
        this.nome = nome;
        this.preco = preco;
    }
}

module.exports = Produto;
