import { Schema } from "express-validator";

const login: Schema = {
  email: {
    notEmpty: { errorMessage: "El email es requerido." },
    isEmail: { errorMessage: "Ingrese un email válido." },
  },
  password: {
    notEmpty: { errorMessage: "La contrase es requerida" }
  },
};

export default login;
