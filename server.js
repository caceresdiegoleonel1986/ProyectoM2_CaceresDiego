import app from './app.js';

// Usa directamente el puerto desde las variables de entorno
const PORT = process.env.PORT || 3000;

// Inicia el servidor Express en el puerto definido
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});