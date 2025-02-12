const Pedido = require("../models/Pedido.js");
const PedidoLista = require("../models/PedidoLista.js");

const listaPedidos = new PedidoLista();

const pedidoController = {
  getMenu: (req, res) => {
    try {
      const menu = [
        { id: 1, nome: "Café Expresso", preco: 5.0 },
        { id: 2, nome: "Cappuccino", preco: 7.5 },
        { id: 3, nome: "Pão de Queijo", preco: 4.0 },
        { id: 4, nome: "Misto Quente", preco: 10.0 },
        { id: 5, nome: "Bolo de Chocolate", preco: 7.0 },
      ];
      res.status(200).json(menu);
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar o menu!", error: error.message });
    }
  },
  addPedido: (req, res) => {
    try {
      const { itens, status } = req.body; 
      if (!itens || itens.length === 0) {
        throw new Error("O pedido deve conter pelo menos um item.");
      }
      const statusPedido = status || "recebido"; 
      const novoPedido = new Pedido(itens, statusPedido);
      listaPedidos.addPedido(novoPedido);
      res.status(201).json({
        message: "Pedido criado com sucesso!",
        pedido: novoPedido,
      });
    } catch (error) {
      res.status(400).json({
        message: "Erro ao criar pedido",
        error: error.message,
      });
    }
  },

  getPedidoById: (req, res) => {
    try {
      const pedido = listaPedidos.getPedidoById(req.params.id);
      res.status(200).json({
        message: "Pedido encontrado",
        pedido,
      });
    } catch (error) {
      res.status(404).json({
        message: "Erro ao buscar pedido por Id.",
        error: error.message,
      });
    }
  },

  deletePedido: (req, res) => {
    try {
      const pedido = listaPedidos.getPedidoById(req.params.id);
      if (pedido.status !== "recebido") {
        return res.status(400).json({
          message: "Não é possível cancelar um pedido que não esteja no status 'recebido', ou seja, que já está em preparação.",
        });
      }
      listaPedidos.deletePedido(req.params.id);
      res.status(200).json({ message: "Pedido cancelado com sucesso!" });
    } catch (error) {
      res.status(404).json({
        message: "Erro ao cancelar pedido",
        error: error.message,
      });
    }
  },
};

module.exports = pedidoController;
