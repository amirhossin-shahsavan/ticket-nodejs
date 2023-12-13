const express = require("express");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const expressFile = require("express-fileupload");

const app = express();
global.dotenv = require("dotenv").config().parsed;

require("./config/dbConnet");
const ticketRoutes = require("./routes/ticketRoutes");
const messageRoutes = require("./routes/messageRoutes");
const userRoutes = require("./routes/userRoutes");

const options = {
  definition: {
    openapi: "1.0.0",
    servers: [{ url: "http://localhost:3000/" }],
  },
  apis: ["./routes/*.js"],
};

app.use(express.json());
app.use(expressFile());
// app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/message", messageRoutes);

app.use("/api/v1/ticket", ticketRoutes);

app.use("/api/v1/user", userRoutes);

const spacs = swaggerJsdoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(spacs));

app.listen(3000, () => {
  console.log("server run on 3000 port");
});
