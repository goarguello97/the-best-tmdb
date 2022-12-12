import express from "express";
const router = express.Router();
import { checkSchema } from "express-validator";
import schemas from "../schemas/index.js";
const { user, login, deleteOrUpdate } = schemas;
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
import middlewares from "../middlewares/index.js";
const { validateFields, validateAuth } = middlewares;

router.get("/", getUsers);
router.get("/user", getUser);
router.get("/user/:id", getUserWithId);
router.post("/", checkSchema(user), validateFields, registerUser);
router.post("/login", checkSchema(login), validateFields, loginUser);
router.get("/secret", validateAuth, secret);
router.post("/logout", validateAuth, logoutUser);
router.put("/", checkSchema(deleteOrUpdate), validateFields, updateUser);
router.delete("/", checkSchema(deleteOrUpdate), validateFields, deleteUser);

export default router;
