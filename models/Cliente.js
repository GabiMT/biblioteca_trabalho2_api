const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Cliente = sequelize.define('Cliente', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
});

module.exports = Cliente;