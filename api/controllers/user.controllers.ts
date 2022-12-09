import { NextFunction, Request, Response } from "express";
import token from "../config/token.js";
import { AuthRequest } from "../interfaces/user.interface.js";
const { generateToken, validateToken } = token;
import models from "../models/index.js";
const { User, Favorite } = models;

class UserController {
  static async getUsers(req: Request, res: Response, next: NextFunction) {
    User.findAll({ include: { model: Favorite, as: "favorites" } })
      .then((users) => {
        res.status(200).json(users);
      })
      .catch((err) => res.status(400).json(err));
  }

  static async getUser(req: Request, res: Response, next: NextFunction) {
    User.findOne({ where: { email: req.query.email } })
      .then((user) => {
        res.status(200).json(user);
      })
      .catch((err) => res.status(400).json(err));
  }

  static async getUserWithId(req: Request, res: Response, next: NextFunction) {
    User.findByPk(req.params.id, {
      include: { model: Favorite, as: "favorites" },
    })
      .then((user) => {
        res.status(200).json(user);
      })
      .catch((err) => res.status(400).json(err));
  }

  static async registerUser(req: Request, res: Response, next: NextFunction) {
    const { name, lastname, email, password } = req.body;
    User.findOne({ where: { email } })
      .then((user) => {
        if (!user) {
          User.create({
            name,
            lastname,
            email,
            password,
          })
            .then((user) => {
              res.status(201).json({
                message: "Usuario registrado satisfactoriamente.",
                user,
              });
            })
            .catch((err) => res.status(400).json(err));
        } else {
          res.status(201).json({
            message: "El usuario ya se encuentra registrado.",
          });
        }
      })
      .catch((err) => res.status(400).json(err));
  }

  static async loginUser(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;
    console.log(req.body);
    User.findOne({ where: { email } })
      .then((user) => {
        if (!user)
          return res.status(401).json({ message: "No existe el usuario" });
        const isValid = user.validatePassword(password);
        if (!isValid)
          return res.status(401).json({ message: "Contraseña incorrecta" });
        const payload = {
          email: user.email,
          name: user.name,
          lastname: user.lastname,
        };

        const token = generateToken(payload);
        res.cookie("token", token);
        res.status(200).json({ payload, token });
      })
      .catch((error) => console.log("ERROR", error));
  }

  static async secret(req: AuthRequest, res: Response, next: NextFunction) {
    res.status(200).json(req.user);
  }

  static async logoutUser(req: Request, res: Response, next: NextFunction) {
    res.clearCookie("token");
    res.sendStatus(205);
  }
}

export default UserController;
