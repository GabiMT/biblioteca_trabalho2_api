const express = require('express');
const app = express();
const livroRoutes = require('./routes/livros');
const clienteRoutes = require('./routes/clientes');

app.use(express.json());
app.use('/livros', livroRoutes);
app.use('/clientes', clienteRoutes);

module.exports = app;