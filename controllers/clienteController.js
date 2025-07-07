const Cliente = require('../models/Cliente');

const listarClientes = async (req, res) => {
  try {
    const clientes = await Cliente.findAll();
    res.status(200).json(clientes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const buscarClientePorId = async (req, res) => {
  try {
    const { id } = req.params;
    const cliente = await Cliente.findByPk(id);
    if (!cliente) return res.status(404).json({ error: 'Cliente não encontrado' });
    res.status(200).json(cliente);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const criarCliente = async (req, res) => {
  try {
    const novoCliente = await Cliente.create(req.body);
    res.status(201).json(novoCliente);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const atualizarCliente = async (req, res) => {
  try {
    const { id } = req.params;
    const [atualizado] = await Cliente.update(req.body, { where: { id } });
    if (!atualizado) return res.status(404).json({ error: 'Cliente não encontrado' });
    const clienteAtualizado = await Cliente.findByPk(id);
    res.status(200).json(clienteAtualizado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deletarCliente = async (req, res) => {
  try {
    const { id } = req.params;
    const deletado = await Cliente.destroy({ where: { id } });
    if (!deletado) return res.status(404).json({ error: 'Cliente não encontrado' });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  listarClientes,
  buscarClientePorId,
  criarCliente,
  atualizarCliente,
  deletarCliente,
};
