const { routes: animalsRoutes } = require('./animals');
const { routes: animalRoutes } = require('./animal');

module.exports = (server) => {
  animalsRoutes.forEach((route) => { server.route(route); });
  animalRoutes.forEach((route) => { server.route(route); });
};
