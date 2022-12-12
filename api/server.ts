import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import cors from "cors";
import db from "./config/db.js";
import models from "./models/index.js";
import routes from "./routes/index.routes.js";

// Configuración del servidor
dotenv.config();
const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

// Rutas
app.use("/api", routes);

const PORT = process.env.PORT || 3001;

db.sync({ force: false }).then(() => {
  console.log("DB connected");
  app.listen(PORT, () => console.log(`Server listenning on port ${PORT}`));
});
