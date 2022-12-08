import User from "./User";
import Favorite from "./Favorite";

User.belongsToMany(Favorite, { as: "favorites", through: "favorites_movies" });
Favorite.belongsToMany(User, { as: "favorites", through: "favorites_movies" });

export default { User, Favorite };
