const Emprestimo = require('../models/Emprestimo');
const Livro = require('../models/Livro');
const Cliente = require('../models/Cliente');

const listarEmprestimos = async (req, res) => {
  try {
    const emprestimos = await Emprestimo.findAll({ include: [Livro, Cliente] });
    res.status(200).json(emprestimos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const buscarEmprestimoPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const emprestimo = await Emprestimo.findByPk(id, { include: [Livro, Cliente] });
    if (!emprestimo) return res.status(404).json({ error: 'Empréstimo não encontrado' });
    res.status(200).json(emprestimo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const criarEmprestimo = async (req, res) => {
  try {
    const { LivroId, ClienteId, dataEmprestimo, dataDevolucao } = req.body;

    const livro = await Livro.findByPk(LivroId);
    if (!livro) return res.status(404).json({ error: 'Livro não encontrado' });
    if (!livro.disponivel) return res.status(400).json({ error: 'Livro não está disponível' });

    const cliente = await Cliente.findByPk(ClienteId);
    if (!cliente) return res.status(404).json({ error: 'Cliente não encontrado' });

    const emprestimo = await Emprestimo.create({ LivroId, ClienteId, dataEmprestimo, dataDevolucao });

    await livro.update({ disponivel: false });

    res.status(201).json(emprestimo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const devolverLivro = async (req, res) => {
  try {
    const { id } = req.params;
    const emprestimo = await Emprestimo.findByPk(id);
    if (!emprestimo) return res.status(404).json({ error: 'Empréstimo não encontrado' });

    const livro = await Livro.findByPk(emprestimo.LivroId);
    await livro.update({ disponivel: true });

    await emprestimo.update({ dataDevolucao: new Date() });

    res.status(200).json({ mensagem: 'Livro devolvido com sucesso', emprestimo });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deletarEmprestimo = async (req, res) => {
  try {
    const { id } = req.params;
    const emprestimo = await Emprestimo.findByPk(id);
    if (!emprestimo) return res.status(404).json({ error: 'Empréstimo não encontrado' });

    const livro = await Livro.findByPk(emprestimo.LivroId);
    if (livro) await livro.update({ disponivel: true });

    await Emprestimo.destroy({ where: { id } });

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const atualizarEmprestimo = async (req, res) => {
  try {
    const { id } = req.params;
    const { LivroId, ClienteId, dataEmprestimo, dataDevolucao } = req.body;

    const emprestimo = await Emprestimo.findByPk(id);
    if (!emprestimo) return res.status(404).json({ error: 'Empréstimo não encontrado' });

    const livro = await Livro.findByPk(LivroId);
    if (!livro) return res.status(404).json({ error: 'Livro não encontrado' });

    const cliente = await Cliente.findByPk(ClienteId);
    if (!cliente) return res.status(404).json({ error: 'Cliente não encontrado' });

    await emprestimo.update({
      LivroId,
      ClienteId,
      dataEmprestimo,
      dataDevolucao,
    });

    res.status(200).json(emprestimo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  listarEmprestimos,
  buscarEmprestimoPorId,
  criarEmprestimo,
  devolverLivro,
  deletarEmprestimo,
  atualizarEmprestimo,
};
