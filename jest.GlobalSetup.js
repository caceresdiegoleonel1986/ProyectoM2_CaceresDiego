import { execSync } from 'node:child_process'; // 1. Importa execSync para ejecutar comandos de shell
import path from 'path';                       // 2. Módulo path para manejar rutas
import { fileURLToPath } from 'url';           // 3. Convierte URL de archivo a ruta
import dotenv from 'dotenv';                   // 4. Cargar variables de entorno desde .env

export default async () => {
  // 5. Forzar entorno de test
  process.env.NODE_ENV = 'test';

  // 6. Cargar archivo .env.test manualmente
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const envFilePath = path.resolve(__dirname, '.env.test');
  dotenv.config({ path: envFilePath });

  // 7. Reseteo y seed de la base de datos de test
  console.log('Reseteando y poblando la base de TEST (una sola vez)...');
  execSync(
    `psql -U ${process.env.DB_USER} -d ${process.env.DB_NAME} -f ./sql/seed.test.sql`,
    { stdio: 'inherit' }
  );
};