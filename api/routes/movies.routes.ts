import express from "express";
const router = express.Router();
import MoviesController from "../controllers/movie.controllers";
import UserController from "../controllers/user.controllers";
const { getPopular, getSpecific, getOne } = MoviesController;
const { addFav, remFav } = UserController;

router.get("/", getPopular);
router.get("/movie/:id", getOne);
router.get("/search", getSpecific);
router.post("/add", addFav);
router.post("/remove", remFav)

export default router;
