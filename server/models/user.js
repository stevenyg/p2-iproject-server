'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          args: true,
          msg: 'email is required'
        },
        notEmpty: {
          args: true,
          msg: 'email is required'
        },
        isEmail: {
          args: true,
          msg: 'email format is invalid'

        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'password is required'
        },
        notEmpty: {
          args: true,
          msg: 'password is required'
        },
        min: {
          args: [5],
          msg: "Minimum 5 characters required in last name"
        }
      }
    },
    StripeUserId: DataTypes.STRING,
    StripeSubscriptionId: DataTypes.STRING,
    StripeCardId: DataTypes.STRING,
    PlanId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate((instance, option) => {
    instance.password = hashPassword(instance.password)
  })

  return User;
};