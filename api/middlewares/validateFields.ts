import { NextFunction, Request, Response } from "express";
import expressValidator, { Result } from "express-validator";
const { validationResult } = expressValidator;

class ValidationErrors {
  public service: Function;
  constructor() {
    this.service = validationResult;
  }
}

const validateFields = (req: Request, res: Response, next: NextFunction) => {
  const { errors } = new ValidationErrors().service(req);
  if (errors.length !== 0)
    return res.status(400).json({ errores: errors.length, errors });
  next();
};

export default validateFields;
