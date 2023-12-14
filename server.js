const express = require("express");
const expressFile = require("express-fileupload");

const app = express();
global.dotenv = require("dotenv").config().parsed;

require("./config/dbConnet");
const ticketRoutes = require("./routes/ticketRoutes");
const messageRoutes = require("./routes/messageRoutes");
const userRoutes = require("./routes/userRoutes");
const swaggerConfig = require("./config/swagger.config");

app.use(express.json());
app.use(expressFile());
// swaggerConfig(app);

app.use("/api/v1/message", messageRoutes);

app.use("/api/v1/ticket", ticketRoutes);

app.use("/api/v1/user", userRoutes);

app.listen(3000, () => {
  console.log("server run on 3000 port");
});
