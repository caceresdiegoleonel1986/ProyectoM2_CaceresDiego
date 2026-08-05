import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import app from './app.js';

// Obtiene la ruta absoluta del archivo actual y su directorio
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define qué archivo de entorno se va a cargar (.env o .env.test)
const envFilePath = path.resolve(
  __dirname,
  process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
);
console.log("Cargando archivo de entorno:", envFilePath);

// Carga las variables de entorno desde el archivo seleccionado
dotenv.config({ path: envFilePath });

// Define el puerto en el que correrá el servidor (desde .env o por defecto 3000)
const PORT = process.env.PORT || 3000;

// Inicia el servidor Express en el puerto definido
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});