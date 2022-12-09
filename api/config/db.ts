import { Sequelize } from "sequelize";
import dotenv from "dotenv";
const { pathname: root } = new URL("../", import.meta.url);
const __dirname = root;

dotenv.config({ path: __dirname + ".env" });

const dbName = process.env.DB_NAME as string;
const dbUser = process.env.DB_USER as string;
const dbHost = process.env.DB_HOST;
const dbPassword = process.env.DB_PASSWORD;

const db = new Sequelize(dbName, null, null, {
  host: dbHost,
  dialect: "postgres",
  logging: false,
});

export default db;
