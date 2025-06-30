const app = require('./app');
const sequelize = require('./database');

const PORT = 3000;

sequelize.sync({ force: false }).then(() => {
  console.log('Banco sincronizado');
  app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
  });
});