const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const cors = require("cors");
const db = require("./config/db");
import { Response, Request } from "express";

// Configuración del servidor
dotenv.config();
const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

// Rutas
app.use("/api", (_req: Request, res: Response) =>
  res.status(200).json({ message: "OK" })
);

const PORT = process.env.PORT || 3000;

db.sync({ force: false }).then(() => {
  console.log("DB connected");
  app.listen(PORT, () => console.log(`Server listenning on port ${PORT}`));
});
