import sequelize from './database';
import Book from './book';

const initializeDatabase = async () => {
  await sequelize.sync();
  console.log('Database has been synchronized.');
};

initializeDatabase();
