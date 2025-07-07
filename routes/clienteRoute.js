const express = require('express');
const router = express.Router();

const clienteController = require('../controllers/clienteController');

router.get('/', clienteController.listarClientes);
router.get('/:id', clienteController.buscarClientePorId);
router.post('/', clienteController.criarCliente);
router.put('/:id', clienteController.atualizarCliente);
router.delete('/:id', clienteController.deletarCliente);

module.exports = router;