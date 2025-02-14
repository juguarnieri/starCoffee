const PedidoLista = require("../models/PedidoLista");
const Produto = require("../models/Produto");
const ListaMenu = require("../models/ListaMenu");

const listaMenu = new ListaMenu();
const produtos = [
    new Produto("Café com Leite", 5.0, "pendente"),
    new Produto("Pão de Queijo", 3.0, "pendente"),
    new Produto("Tapioca", 7.0, "pronto"),
    new Produto("Bolo de Cenoura", 4.0, "pronto"),
    new Produto("Suco de Laranja", 3.0, "em preparação")
];

// Usando o forEach para adicionar os produtos ao menu
produtos.forEach(produto => listaMenu.addProduto(produto));

const pedidos = new PedidoLista();

const pedidoController = {
  createOrder: (req, res) => {
      try {
          const { itens } = req.body;
          // Valida se os itens são um array não vazio
          if (!itens || !Array.isArray(itens) || itens.length === 0) {
              return res.status(400).json({ error: "O pedido deve conter itens válidos." });
          }
          const pedidoItens = [];  // Lista para armazenar os itens do pedido
          let statusPedido = "pendente"; 
          // Itera sobre os itens do pedido, verificando se estão no menu
          for (const nomeItem of itens) {
              // Encontra o produto no menu com base no nome
              const produto = listaMenu.getMenu().find(item => item.nome === nomeItem);
              if (!produto) {
                  // Retorna erro se o produto não for encontrado
                  return res.status(400).json({ error: `Item '${nomeItem}' não encontrado no menu.` });
              }
              // Cria uma nova instância do produto para o pedido
              const novoProduto = new Produto(produto.nome, produto.preco, produto.status);
              pedidoItens.push(novoProduto);  // Adiciona o produto ao pedido

              // O status do pedido é determinado pelos status dos itens:
              // - Se algum item estiver "pronto", o pedido será "pronto".
             // - Se algum item estiver "em preparação" e nenhum item estiver "pronto", o pedido será "em preparação".
             // - Caso contrário, o status do pedido será "pendente".
              if (produto.status === "pronto") {
                  statusPedido = "pronto";  
              } else if (produto.status === "em preparação" && statusPedido !== "pronto") {
                  statusPedido = "em preparação"; 
              }
          }

          const pedido = pedidos.addPedido({
              id: pedidoItens[0].id,  // ID do pedido (a partir do primeiro item)
              itens: pedidoItens,  
              status: statusPedido  
          });

          res.status(201).json({
              message: "Pedido realizado com sucesso!",
              pedido: {
                  id: pedido.id,
                  itens: pedido.itens.map(item => ({
                      nome: item.nome,
                      preco: item.preco,
                      status: item.status
                  }))
              }
          });
      } catch (error) {
          res.status(400).json({ error: error.message });
      }
  },

    getMenu: (req, res) => {
        res.json(listaMenu.getMenu());
    },

    getOrderById: (req, res) => {
        try {
            const pedido = pedidos.getPedidoById(req.params.id);
            res.json(pedido);
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    },

    deleteOrder: (req, res) => { 
      try {
          const pedido = pedidos.getPedidoById(req.params.id);
  
          // Se o status do pedido for diferente de "pendente", não pode ser cancelado
          if (pedido.status === "pronto" || pedido.status === "finalizado" || pedido.status === "em preparação") {
              return res.status(403).json({ error: "O pedido não pode ser cancelado pois já foi finalizado ou está em outro status." });
          }
          pedidos.deletePedido(req.params.id);
          res.json({ message: "Pedido cancelado com sucesso!" });
      } catch (error) {
          res.status(403).json({ error: error.message });
      }
  }
};  
module.exports = pedidoController;
