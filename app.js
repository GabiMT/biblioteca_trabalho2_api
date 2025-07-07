const express = require('express');
const app = express();
const livroRoutes = require('./routes/livros');
const clienteRoutes = require('./routes/clientes');
const emprestimoRoutes = require('./routes/emprestimos');

app.use(express.json());
app.use('/livros', livroRoutes);
app.use('/clientes', clienteRoutes);
app.use('/emprestimos', emprestimoRoutes);

module.exports = app;