import express, { Response, Request } from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import cors from "cors";
import db from "./config/db.js";

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

const PORT = process.env.PORT || 3001;

db.sync({ force: true }).then(() => {
  console.log("DB connected");
  app.listen(PORT, () => console.log(`Server listenning on port ${PORT}`));
});
