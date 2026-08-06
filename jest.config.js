export default {
  // 1. Definir el entorno de pruebas como Node.js
  testEnvironment: 'node',

  // 2. Archivos que se cargan después de inicializar Jest (setup de tests)
  setupFilesAfterEnv: ['./setupTest.js'],

  // 3. Script que se ejecuta una sola vez antes de todos los tests (ej: poblar DB)
  globalSetup: './jest.GlobalSetup.js',

  // 4. Evita que Jest intente transformar con Babel (necesario en proyectos con ES Modules)
  transform: {}, 
};