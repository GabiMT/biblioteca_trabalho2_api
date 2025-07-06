const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const Livro = require('./Livro');
const Cliente = require('./Cliente');

const Emprestimo = sequelize.define('Emprestimo', {
  dataEmprestimo: {
    type: DataTypes.DATEONLY,
    defaultValue: DataTypes.NOW
  },
  dataDevolucao: {
    type: DataTypes.DATEONLY,
    allowNull: true
  }
});

// Relacionamentos:
Livro.hasMany(Emprestimo);
Emprestimo.belongsTo(Livro);

Cliente.hasMany(Emprestimo);
Emprestimo.belongsTo(Cliente);

module.exports = Emprestimo;