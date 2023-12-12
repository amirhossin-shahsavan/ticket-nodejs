const express = require("express");
const app = express();
global.dotenv = require("dotenv").config().parsed;
require("./config/dbConnet");
const ticketRoutes = require("./routes/ticketRoutes");
const messageRoutes = require("./routes/messageRoutes");
const userRoutes = require("./routes/userRoutes");

// console.log(dotenv);

app.use(express.json());

app.use("/api/v1/message", messageRoutes);

app.use("/api/v1/ticket", ticketRoutes);

app.use("/api/v1/user", userRoutes);

app.listen(3000, () => {
  console.log("server run on 3000 port");
});
