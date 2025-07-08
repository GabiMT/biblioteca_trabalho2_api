const request = require('supertest');
const app = require('../app');
const { sequelize } = require('../models/Emprestimo');

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

describe('Testes de Empréstimo', () => {
  let livroId;
  let clienteId;

  beforeAll(async () => {
    // Cria um livro
    const livro = await request(app)
      .post('/livros')
      .send({
        titulo: 'Livro para Empréstimo',
        autor: 'Autor XPTO',
        anoPublicacao: 2022
      });
    livroId = livro.body.id;

    // Cria um cliente
    const cliente = await request(app)
      .post('/clientes')
      .send({
        nome: 'Cliente do Empréstimo',
        email: 'cliente@email.com'
      });
    clienteId = cliente.body.id;
  });

  it('deve criar um novo empréstimo', async () => {
    const res = await request(app)
      .post('/emprestimos')
      .send({
        LivroId: livroId,
        ClienteId: clienteId,
        dataEmprestimo: '2025-07-07',
        dataDevolucao: '2025-07-14'
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.LivroId).toBe(livroId);
    expect(res.body.ClienteId).toBe(clienteId);
  });

  it('não deve emprestar o mesmo livro duas vezes', async () => {
    const res = await request(app)
      .post('/emprestimos')
      .send({
        LivroId: livroId,
        ClienteId: clienteId,
        dataEmprestimo: '2025-07-15',
        dataDevolucao: '2025-07-22'
      });

    expect(res.statusCode).toBeGreaterThanOrEqual(400);
    expect(res.body).toHaveProperty('error');
  });

  it('deve listar todos os empréstimos', async () => {
    const res = await request(app).get('/emprestimos');

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });
});