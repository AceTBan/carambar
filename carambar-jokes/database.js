import { Sequelize, DataTypes } from 'sequelize';

// Créer une instance de Sequelize avec SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite'
});

// Définir le modèle de blague
const Joke = sequelize.define('Joke', {
  content: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

// Synchroniser les modèles avec la base de données
sequelize.sync();

export default { sequelize, Joke };
