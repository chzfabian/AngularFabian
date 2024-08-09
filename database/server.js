const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json'); // Tu archivo de base de datos
const middlewares = jsonServer.defaults();

// Añadir middleware personalizado para CORS
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Permitir cualquier origen
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization'); // Añadir Authorization
  next();
});

server.use(router);
server.listen(3000, () => {
  console.log('JSON Server is running');
});
