const express = require("express");
const pedidoController = require("../controllers/pedidoController");

const router = express.Router();

router.get("/menu", pedidoController.getMenu);
router.post("/order", pedidoController.addPedido);
router.get("/order/:id", pedidoController.getPedidoById);
router.delete("/order/:id", pedidoController.deletePedido);

module.exports = router;
