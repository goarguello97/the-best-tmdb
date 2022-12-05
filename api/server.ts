const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const db = require("./config/db");
import { Response, Request } from "express";

// Configuración del servidor
dotenv.config();
const app = express();

app.use(express.json());
app.use(cookieParser());

// Rutas
app.use("/api", (_req: Request, res: Response) => res.status(200).json("OK"));

const PORT = process.env.PORT || 3000;

db.sync({ force: false }).then(() => {
  console.log("DB connected");
  app.listen(PORT, () => console.log(`Server listenning on port ${PORT}`));
});
