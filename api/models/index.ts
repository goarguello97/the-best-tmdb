import User from "./User.js";
import Favorite from "./Favorite.js";

User.belongsToMany(Favorite, { as: "favorites", through: "favorites_movies" });
Favorite.belongsToMany(User, { as: "favorites", through: "favorites_movies" });

export default { User, Favorite };
