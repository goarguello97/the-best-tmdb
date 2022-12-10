import express from "express";
import userRouter from "./user.routes.js";
import movieRouter from "./movies.routes.js";
const router = express.Router();

router.use("/users", userRouter);
router.use("/movies", movieRouter);

export default router;
