const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Livro = sequelize.define('Livro', {
  titulo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  autor: {
    type: DataTypes.STRING,
    allowNull: false
  },
  anoPublicacao: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  disponivel: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
});

module.exports = Livro;