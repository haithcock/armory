// swaggerDef.js
const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Armory API',
      version: '1.0.0',
      description: 'API for managing armory items and users',
    },
    servers: [
      { url: 'http://localhost:5000', description: 'Development server' },
    ],
    tags: [
      { name: 'Armory', description: 'Armory item operations' },
      { name: 'Users', description: 'User management' },
      { name: 'Authentication', description: 'User authentication' }
    ],
    components: {
      schemas: {
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
    }
  },
  // Paths to files containing your routes
  apis: ['./routes/*.js'], 
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;