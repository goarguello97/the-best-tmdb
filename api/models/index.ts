import User from "./User.js";
import Movie from "./Favorite.js";

User.belongsToMany(Movie, { as: "favorites", through: "favorites_movies" });
Movie.belongsToMany(User, { as: "favorites", through: "favorites_movies" });

export default { User, Movie };
