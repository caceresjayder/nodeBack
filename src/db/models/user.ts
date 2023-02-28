"use strict";
import {Model, Optional} from 'sequelize'

module.exports = (sequelize: any, DataTypes: any) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: any) {
      // define association here
    }
  }
  user.init(
    {
      name: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        validate: {
          min: 8
        }
      },
      balance:{
        type:  DataTypes.INTEGER,
        defaultValue: 0
      },
      role: {
        defaultValue : "USER",
        type : DataTypes.ENUM('ADMIN', 'USER', 'WORKER')
    },
    status: {
      defaultValue: "ACTIVE",
      type: DataTypes.ENUM('ACTIVE','DISABLED')
    }
  },
    {
      sequelize,
      modelName: "user",
    }
  );
  return user;
};
