import express from "express";
const router = express.Router();
import userControllers from "../controllers/user.controllers.js";
const {
  getUsers,
  getUser,
  getUserWithId,
  registerUser,
  loginUser,
  secret,
  logoutUser,
} = userControllers;
import validateAuth from "../config/auth.js";

router.get("/", getUsers);
router.get("/user", getUser);
router.get("/user/:id", getUserWithId);
router.post("/", registerUser);
router.post("/login", loginUser);
router.get("/secret", validateAuth, secret);
router.post("/logout", validateAuth, logoutUser);

export default router;
