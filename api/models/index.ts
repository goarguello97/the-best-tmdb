import User from "./User";
import Movie from "./Favorite";

User.belongsToMany(Movie, { as: "favorites", through: "favorites_movies" });
Movie.belongsToMany(User, { as: "favorites", through: "favorites_movies" });

export { User, Movie}
