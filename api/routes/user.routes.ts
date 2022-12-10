import express from "express";
const router = express.Router();
import expressValidator, { checkSchema } from "express-validator";
import user from "../schemas/user.js";
import login from "../schemas/login.js";
import UserControllers from "../controllers/user.controllers.js";
const {
  getUsers,
  getUser,
  getUserWithId,
  registerUser,
  loginUser,
  secret,
  logoutUser,
  updateUser,
  deleteUser,
} = UserControllers;
import validateAuth from "../config/auth.js";
import emailUnique from "../helpers/emailUnique.js";
import validateFields from "../middlewares/validateFields.js";

router.get("/", getUsers);
router.get("/user", getUser);
router.get("/user/:id", getUserWithId);
router.post("/", checkSchema(user), validateFields, registerUser);
router.post("/login", checkSchema(login), validateFields, loginUser);
router.get("/secret", validateAuth, secret);
router.post("/logout", validateAuth, logoutUser);
router.put("/", updateUser);
router.delete("/", deleteUser);

export default router;
