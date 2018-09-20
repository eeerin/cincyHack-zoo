const zooDB = require('../database.json');
const boom = require('boom');
const _ = require('lodash');
const fs = require('fs-extra')

module.exports = {
  routes: [
    {
      path: '/animal/{type}',
      method: 'GET',
      handler: async (request, h) => {
        const type = request.params.type;
        // TODO: throw error if animal is not given
        const result = zooDB.animals[type];
        if (!result) {
          throw boom.notFound(`Could not find the animal of type ${type}.`);
        }
        return result;
      }
    },
    {
      path: '/animal/{type}',
      method: 'PATCH',
      handler: async (request, h) => {
        const type = request.params.type;
        // TODO: throw error if animal is not given
        const animal = zooDB.animals[type];
        if (!animal) {
          throw boom.notFound(`Could not find the animal of type ${type}.`);
        }
        const result = _.merge({}, animal, request.payload);
        zooDB.animals[type] = result;
        await fs.writeFile('./database.json', JSON.stringify(zooDB));
        return result;
      }
    },
    {
      path: '/animal/{type}',
      method: 'DELETE',
      handler: async (request, h) => {
        const type = request.params.type;
        delete zooDB.animals[type];
        await fs.writeFile('./database.json', JSON.stringify(zooDB));
        return { success: true };
      }
    }
  ]
};
