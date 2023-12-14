const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

function swaggerConfig(app) {
  const swaggerDocument = swaggerJsDoc({
    swaggerDefinition: {
      info: {
        title: "ticket",
        description: "ticket system nodejs",
        version: "1.0.0",
      },
    },
    apis: [process.cwd() + "/**/*.swagger.js"],
  });

  const swagger = swaggerUi.setup(swaggerDocument);

  app.use("/api/v1/", swaggerUi.serve, swagger);
}

module.exports = swaggerConfig;
