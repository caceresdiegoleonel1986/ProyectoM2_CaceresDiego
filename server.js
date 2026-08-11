import app from './Desarrollo/app.js';

const PORT = Number(process.env.PORT) || 3000;
const HOST = '0.0.0.0';

// Inicia el servidor Express en el puerto definido
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});