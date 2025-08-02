// config/swagger.js
const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Armory API Documentation',
      version: '1.0.0',
      description: 'API for managing armory items and users',
    },
servers: [
  { url: 'http://localhost:5000', description: 'Development server' },
  { url: 'https://armory-api.onrender.com', description: 'Production server' }
],
    components: {
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
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: '507f1f77bcf86cd799439011' },
            name: { type: 'string', example: 'John Doe' },
            email: { type: 'string', example: 'john@example.com' },
            role: { type: 'string', example: 'user', enum: ['admin', 'user'] },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' }
          }
        },
        ArmoryItem: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: '507f1f77bcf86cd799439012' },
            name: { type: 'string', example: 'AR-15' },
            caliber: { type: 'string', example: '.223 Wylde' },
            type: { type: 'string', example: 'Rifle' },
            manufacturer: { type: 'string', example: 'NA' },
            round_count: { type: 'integer', example: 820 },
            last_cleaned: { type: 'string', format: 'date-time' },
            notes: { type: 'string', example: 'Free-floating handguard' }
          }
        },

        Error: {
          type: 'object',
          properties: {
            message: { type: 'string', example: 'Error description' },
            errors: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  msg: { type: 'string' },
                  param: { type: 'string' },
                  location: { type: 'string' }
                }
              }
            }
          }
        }
      }
    }
  },

apis: [
  './routes/*.js' // Simple pattern to find all route files
],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;