import { DataTypes, Model } from 'sequelize';
import sequelize from './database'; // Ensure the import path is correct

class Book extends Model {
  public id!: string; // Unique identifier (e.g., ISBN)
  public title!: string; // Title of the book
  public author!: string; // Author of the book
  public publicationYear!: number; // Publication year
  public available!: boolean; // Availability status
}

Book.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    publicationYear: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    available: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true, // Books are available by default
    },
  },
  {
    sequelize,
    modelName: 'Book',
    tableName: 'books',
  }
);

export default Book;
