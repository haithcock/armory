const swaggerJSDoc = require('swagger-jsdoc');
const path = require('path');
const { count } = require('console');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Armory API',
      version: '1.0.0',
      description: 'API for managing armory items and users',
    },
    servers: [
      { 
        url: 'http://localhost:5000', 
        description: 'Development server' 
      },
      { 
        url: 'https://armory-wj0k.onrender.com', 
        description: 'Production server' 
      }
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
            name: { type: 'string', example: 'AR-47' },
            caliber: { type: 'string', example: '7.62x39' },
            type: { type: 'string', example: 'Rifle' },
            manufacturer: { type: 'string', example: 'DIY' },
            round_count: { type: 'integer', example: 30 },
            last_cleaned: { type: 'string', format: 'date-time', example: '2023-10-01T12:00:00Z' },
            notes: { type: 'string', example: 'Uses banana mags' }
          }
        },
        User: {
          type: 'object',
          properties: {
            name: { type: 'string', example: 'John Doe' },
            email: { type: 'string', example: 'john@example.com' },
            role: { type: 'string', example: 'user' }
          }
        },
        Error: {
          type: 'object',
          properties: {
            message: { type: 'string' }
          }
        }
      },
      securitySchemes: {
        OAuth2: {
          type: 'oauth2',
          flows: {
            authorizationCode: {
              authorizationUrl: 'https://accounts.google.com/o/oauth2/auth',
              tokenUrl: 'https://oauth2.googleapis.com/token',
              scopes: {
                'email': 'View your email address',
                'profile': 'View your basic profile info'
              }
            }
          }
        }
      }
    }
  },
  apis: [
    path.join(__dirname, '../routes/*.js')
  ], 
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;