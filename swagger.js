const swaggerAutogen = require('swagger-autogen');

const autogen = swaggerAutogen()

const doc = {
  info: {
    title: 'nodeBack',
    description: 'Description',
  },
  host: 'localhost:3000',
  schemes: ['http'],
};

const outputFile = './swagger.json';
//const endpointsFiles = ['./path/endpointsUser.js', './path/endpointsBook.js'];

/* NOTE: if you use the express Router, you must pass in the 
   'endpointsFiles' only the root file where the route starts,
   such as index.js, app.js, routes.js, ... */

autogen(outputFile, doc);