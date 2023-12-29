"use strict";
const {Model} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Invitation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Invitation.belongsTo(models.Event, {
        foreignKey: "eventId",
      });

      Invitation.belongsTo(models.User, {
        foreignKey: "userId",
      });
    }
  }
  Invitation.init(
    {
      eventId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Invitation",
    }
  );
  return Invitation;
};
