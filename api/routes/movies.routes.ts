import express from "express";
const router = express.Router();
import MoviesController from "../controllers/movie.controllers.js";
const { getPopular, getSpecific, getOne } = MoviesController;

router.get("/", getPopular);
router.get("/movie/:id", getOne);
router.get("/search", getSpecific);

export default router;
