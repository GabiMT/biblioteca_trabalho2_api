const request = require('supertest');
const app = require('../app');
const { sequelize } = require('../models/Cliente'); // importa o sequelize do model

beforeAll(async () => {
  await sequelize.sync({ force: true }); // recria o banco de dados
});

describe('Testes de Cliente', () => {
  it('deve criar um novo cliente', async () => {
    const res = await request(app)
      .post('/clientes')
      .send({
        nome: 'Gabrieli Taborda',
        email: 'gabi@example.com'
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.nome).toBe('Gabrieli Taborda');
  });

  it('deve listar todos os clientes', async () => {
    const res = await request(app).get('/clientes');

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('não deve permitir criar cliente com email duplicado', async () => {
    const res = await request(app)
      .post('/clientes')
      .send({
        nome: 'Repetido',
        email: 'gabi@example.com' // mesmo email do primeiro teste
      });

    expect(res.statusCode).toBeGreaterThanOrEqual(400);
    expect(res.body).toHaveProperty('error');
  });
});