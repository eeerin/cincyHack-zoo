const _ = require('lodash');
const fs = require('fs-extra')
const zooDB = require('../database.json');
const boom = require('boom');

module.exports = {
  routes: [
    {
      path: '/animals',
      method: 'GET',
      handler: () => {
        return _.values(zooDB.animals);
      }
    },
    {
      path: '/animals',
      method: 'POST',
      handler: async (request, h) => {
        const { animal } = request.payload || {};
        // TODO: throw error if animal is not given
        if (!animal.type) {
          throw boom.badData('The field Type is required.')
        }
        zooDB.animals[animal.type] = animal;
        await fs.writeFile('./database.json', JSON.stringify(zooDB));
        return animal;
      }
    }
  ]
};
