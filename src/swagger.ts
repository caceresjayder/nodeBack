import path from "path";
import swaggerAutogen from "swagger-autogen";
require("dotenv").config();

const doc = {
  info: {
    version: "",
    title: "",
    description: "",
  },
  servers: [
    {
        url: process.env.URL_SERVER,
        description: "local server"
    }
  ],
  securityDefinitions: {
    bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT'
    }
}
}; // update doc
const outputFile = __dirname + "/swagger-output.json";
const endpointsFiles = [
  path.join(__dirname, "./index"),
  path.join(__dirname, "./routes/Login/index"),
  path.join(__dirname, "./routes/Transactions/index"),
  path.join(__dirname, "./routes/Users/index"),
];
swaggerAutogen({ openapi: "3.0.0" })(outputFile, endpointsFiles, doc);
