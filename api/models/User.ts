import { DataTypes, Model } from "sequelize";
const sequelize = require("../config/db");

class User extends Model {}

User.init(
  {
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    lastname: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "user",
  }
);

export default User;
