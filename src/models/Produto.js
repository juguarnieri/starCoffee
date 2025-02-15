const { v4: uuidv4 } = require("uuid");

class Produto {
  constructor(nome, preco, tamanho, status = "pendente") {
    this.id = uuidv4(); // ID único
    this.nome = nome;
    this.preco = preco;
    this.tamanho = tamanho;
    this.status = status; // Status do produto (pendente, em preparação, pronto)
  }
}

module.exports = Produto;
