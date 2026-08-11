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

// ⚡ Solo carga dotenv si NO estás en producción
if (process.env.NODE_ENV !== "production") {
  dotenv.config({ path: envFilePath });
  if (process.env.DEBUG === "true") {
    console.log(`Cargando variables de entorno desde: ${envFilePath}`);
  }
}

const { Pool } = pg;

let pool;

if (process.env.NODE_ENV === "production" && process.env.DATABASE_URL) {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });
} else {
  //  Desarrollo/Test: usa variables locales
  pool = new Pool({
    host: process.env.PGHOST || process.env.DB_HOST,
    user: process.env.PGUSER || process.env.POSTGRES_USER || process.env.DB_USER,
    password: process.env.PGPASSWORD || process.env.POSTGRES_PASSWORD || process.env.DB_PASSWORD,
    database: process.env.PGDATABASE || process.env.POSTGRES_DB || process.env.DB_NAME,
    port: process.env.PGPORT || process.env.DB_PORT || 5432,
    client_encoding: "UTF8",
    max: Number(process.env.DB_MAX) || 20,
    idleTimeoutMillis: Number(process.env.DB_IDLE_TIMEOUT) || 30000,
    connectionTimeoutMillis: Number(process.env.DB_CONNECTION_TIMEOUT) || 2000,
  });
}

// Log de debug
if (process.env.DEBUG === "true") {
  console.log("Pool Config:", {
    host: pool.options.host,
    user: pool.options.user,
    database: pool.options.database,
    port: pool.options.port,
  });
}

export default pool;