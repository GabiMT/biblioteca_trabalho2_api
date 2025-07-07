const request = require('supertest');
const app = require('../app');
const { sequelize } = require('../models/Livro'); // para resetar DB entre os testes

beforeAll(async () => {
  await sequelize.sync({ force: true }); // limpa o banco e recria as tabelas
});

describe('Testes de Livro', () => {
  it('deve criar um novo livro', async () => {
    const res = await request(app)
      .post('/livros')
      .send({
        titulo: 'Teste Automatizado',
        autor: 'Autor Automático',
        anoPublicacao: 2025
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.titulo).toBe('Teste Automatizado');
  });

  it('deve listar todos os livros', async () => {
    const res = await request(app).get('/livros');

    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });
});