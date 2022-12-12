import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db";

class Movie extends Model {}

Movie.init(
  {
    movieId: {
      type: DataTypes.UUID,
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
    movieGenre: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    sequelize,
    modelName: "movie",
  }
);

export default Movie;
