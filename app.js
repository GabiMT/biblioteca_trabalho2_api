const express = require('express');
const app = express();
const livroRoutes = require('./routes/livroRoute');
const clienteRoutes = require('./routes/clienteRoute');
const emprestimoRoutes = require('./routes/emprestimoRoute');

app.use(express.json());
app.use('/livros', livroRoutes);
app.use('/clientes', clienteRoutes);
app.use('/emprestimos', emprestimoRoutes);

module.exports = app;