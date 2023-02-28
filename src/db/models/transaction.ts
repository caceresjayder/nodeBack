'use strict';
import { Model } from 'sequelize';

module.exports = (sequelize: any, DataTypes: any) => {
  class transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: any) {
      // define association here
    }
  }

  transaction.init({
    to: DataTypes.STRING,
    from: DataTypes.STRING,
    amount: DataTypes.INTEGER,
    concept: DataTypes.ENUM('DEPOSIT','TRANSFER')
  }, {
    sequelize,
    modelName: 'transaction',
  });

  return transaction;
};