const Livro = require('../models/Livro');

const listarLivros = async (req, res) => {
  try {
    const livros = await Livro.findAll();
    res.status(200).json(livros);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const buscarLivroPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const livro = await Livro.findByPk(id);
    if (!livro) return res.status(404).json({ error: 'Livro não encontrado' });
    res.status(200).json(livro);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const criarLivro = async (req, res) => {
  try {
    const novoLivro = await Livro.create(req.body);
    res.status(201).json(novoLivro);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const atualizarLivro = async (req, res) => {
  try {
    const { id } = req.params;
    const [atualizado] = await Livro.update(req.body, { where: { id } });
    if (!atualizado) return res.status(404).json({ error: 'Livro não encontrado' });
    const livroAtualizado = await Livro.findByPk(id);
    res.status(200).json(livroAtualizado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deletarLivro = async (req, res) => {
  try {
    const { id } = req.params;
    const deletado = await Livro.destroy({ where: { id } });
    if (!deletado) return res.status(404).json({ error: 'Livro não encontrado' });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  listarLivros,
  buscarLivroPorId,
  criarLivro,
  atualizarLivro,
  deletarLivro,
};