import { NextFunction, Request, Response } from "express";
import token from "../config/token.js";
const { validateToken } = token;
import { AuthRequest } from "../interfaces/user.interface.js";

function validateAuth(req: AuthRequest, res: Response, next: NextFunction) {
  const token = req.cookies.token;
  const payload = validateToken(token);
  req.user = payload;

  if (payload) return next();

  res.sendStatus(401); // Unauthorized
}

export default validateAuth