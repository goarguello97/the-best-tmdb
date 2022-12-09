import { NextFunction, Request, Response } from "express";
import token from "../config/token.js";
import { AuthRequest } from "../interfaces/user.interface.js";
const { validateToken } = token;

function validateAuth(req: AuthRequest, res: Response, next: NextFunction) {
  const token = req.cookies.token;
  const payload = validateToken(token);
  req.user = payload;

  if (payload) return next();

  res.sendStatus(401); // Unauthorized
}

export default validateAuth