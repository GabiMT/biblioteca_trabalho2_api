const express = require('express');
const router = express.Router();

const livroController = require('../controllers/livroController');

router.get('/', livroController.listarLivros);
router.get('/:id', livroController.buscarLivroPorId);
router.post('/', livroController.criarLivro);
router.put('/:id', livroController.atualizarLivro);
router.delete('/:id', livroController.deletarLivro);

module.exports = router;