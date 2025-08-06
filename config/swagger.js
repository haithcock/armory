// config/swagger.js
// swagger.js
const swaggerAutogen = require('swagger-autogen')();

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swaggerDef');

module.exports = function(app) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};

const doc = {
  info: {
    title: 'Armory API',
    description: 'API for managing armory items and users',
  },
  host: 'localhost:3000',
  schemes: ['http'],
  tags: [
    { name: 'Armory', description: 'Armory item operations' },
    { name: 'Users', description: 'User management' },
    { name: 'Authentication', description: 'User authentication' }
  ],
  definitions: {
    ArmoryItem: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        type: { type: 'string' },
        damage: { type: 'number' }
      }
    },
    User: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        email: { type: 'string' },
        role: { type: 'string' }
      }
    }
  }
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./routes/*.js']; // Path to your route files

swaggerAutogen(outputFile, endpointsFiles, doc);