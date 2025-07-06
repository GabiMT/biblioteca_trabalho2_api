const {Sequelize} = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.biblioteca.sqlite'
});

module.exports = sequelize;