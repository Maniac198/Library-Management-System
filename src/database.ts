import { Sequelize } from 'sequelize';

// Create a new Sequelize instance
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'library.db', // Name of your SQLite database file
});

// Test the connection
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection to SQLite has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

export default sequelize;
