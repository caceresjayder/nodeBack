"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  user.init(
    {
      name: {
        type: DataTypes.STRING,
        validate: {
          is: /^[a-z]+ [a-z]+ ?[a-z]+a? ?[a-z]+a?/gi
        }},
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
        min: 8,
      },
      balance:{
        type:  DataTypes.INTEGER,
        defaultValue: 0
      },
      role: {
        defaultValue : "USER",
        type : DataTypes.ENUM('ADMIN', 'USER', 'WORKER')
    }
  },
    {
      sequelize,
      modelName: "user",
    }
  );
  return user;
};
