export function errorHandler(err, req, res, next) {
  const status = err.statusCode || err.status || 500;
  const message = status === 500 ? 'Error interno del servidor' : (err.message || 'Error desconocido');

  if (status >= 500) {
    console.error(err.stack || err);
  }

  res.status(status).json({ error: message });
}