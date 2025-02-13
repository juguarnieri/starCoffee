const ListaMenu = require("../models/ListaMenu.js");
const PedidoLista = require("../models/PedidoLista.js");
const Produto = require("../models/Produto.js");

const item1 = new Produto("Café com Leite", 5.0);
const item2 = new Produto("Pão de Queijo", 3.0);
const item3 = new Produto("Tapioca", 7.0);
const item4 = new Produto("Bolo de Cenoura", 4.0, "pronto");
const item5 = new Produto("Suco de Laranja", 3.0, "pronto");

const menu = new ListaMenu();

menu.addPedido(item1);
menu.addPedido(item2);
menu.addPedido(item3);
menu.addPedido(item4);
menu.addPedido(item5);

const listaPedidos = new PedidoLista();

const pedidoController = {
  getMenu: (req, res) => {
    try {
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
          message: "Não é possível cancelar um pedido que já está em preparação.",
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