import { NextFunction, Response } from "express";
import { validateToken } from "../config/token";
import { AuthRequest } from "../interfaces/user.interface";

function validateAuth(req: AuthRequest, res: Response, next: NextFunction) {
  const token = req.cookies.token;
  const payload = validateToken(token);
  req.user = payload;

  if (payload) return next();

  res.sendStatus(401); // Unauthorized
}

export default validateAuth