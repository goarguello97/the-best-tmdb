import { DataTypes, Model } from "sequelize";
import bcrypt from "bcrypt";
import sequelize from "../config/db.js";

const salt = bcrypt.genSaltSync(10);

class User extends Model {
  password: string;
  email: string;
  name: string;
  lastname: string;
  hash(password: string, salt: string) {
    return bcrypt.hashSync(password, salt);
  }

  validatePassword(password: string) {
    return bcrypt.compareSync(password, this.password);
  }
}

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

User.beforeCreate((user: any) => {
  const hash = user.hash(user.password, salt);
  return (user.password = hash);
});

export default User;
