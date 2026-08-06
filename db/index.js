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

dotenv.config({ path: envFilePath });

const pool = new pg.Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 5432,
  client_encoding: "UTF8",
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

export default pool;