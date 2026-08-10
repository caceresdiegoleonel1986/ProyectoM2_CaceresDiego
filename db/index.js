import pg from "pg";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Selecciona el archivo correcto según NODE_ENV
const envFilePath = path.resolve(
  __dirname,
  process.env.NODE_ENV === "test" ? "../.env.test" : "../.env"
);

// ⚡ Solo carga dotenv si NO estás en producción (Railway no lo necesita)
if (process.env.NODE_ENV !== "production") {
  dotenv.config({ path: envFilePath });
  console.log(`Cargando variables de entorno desde: ${envFilePath}`);
}

const { Pool } = pg;

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 5432,
  client_encoding: "UTF8",
  max: Number(process.env.DB_MAX) || 20,
  idleTimeoutMillis: Number(process.env.DB_IDLE_TIMEOUT) || 30000,
  connectionTimeoutMillis: Number(process.env.DB_CONNECTION_TIMEOUT) || 2000,
});

export default pool;