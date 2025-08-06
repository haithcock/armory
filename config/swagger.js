// config/swagger.js
// swagger.js
const swaggerAutogen = require('swagger-autogen')();

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swaggerDef');

module.exports = function(app) {
 app.use('/api-docs', swaggerUi.serve, (req, res, next) => {
  const token = req.query.token;

  const options = {
    swaggerOptions: {
      authAction: token
        ? {
            bearerAuth: {
              name: 'bearerAuth',
              schema: {
                type: 'http',
                in: 'header',
                scheme: 'bearer',
                bearerFormat: 'JWT',
              },
              value: `Bearer ${token}`,
            },
          }
        : undefined,
    },
  };

  swaggerUi.setup(require('./swaggerDef'), options)(req, res, next);
});

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
const endpointsFiles = ['./routes/*.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);