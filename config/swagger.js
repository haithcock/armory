// config/swagger.js
const swaggerAutogen = require('swagger-autogen')();
const swaggerUi = require('swagger-ui-express');

// Load the generated documentation (after generation)
const swaggerDocument = require('./swagger-output.json');
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
    // Use the generated swaggerDocument variable
    swaggerUi.setup(swaggerDocument, options)(req, res, next);
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

  // Generate documentation before starting the server (handle asynchronously)
  swaggerAutogen(outputFile, endpointsFiles, doc);
};