"use strict";
const {Model} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Calendar, {foreignKey: "userId"});

      // INVITATIONS
      User.hasMany(models.Invitation, {
        foreignKey: "userId"
      })

      User.belongsToMany(models.Event, {
        through: models.Invitation,
        as: 'InvitedEvent',
        foreignKey: "userId"
      })      
    }
  }
  User.init(
    {
      fname: DataTypes.STRING,
      lname: DataTypes.STRING,
      username: DataTypes.STRING,
      email: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
