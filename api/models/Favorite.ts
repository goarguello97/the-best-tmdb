import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db.js";

class Movie extends Model {}

Movie.init(
  {
    movieId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    movieTitle: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    movieDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "movie",
  }
);

export default Movie;
