const express = require("express");
const app = express();
require("./config/dbConnet");
const ticketRoutes = require("./routes/ticketRoutes");
const messageRoutes = require("./routes/messageRoutes");
const dotenv = require("dotenv").config();

app.use(express.json());

app.use("/api/v1/message", messageRoutes);

app.use("/api/v1/ticket", ticketRoutes);

app.listen(3000, () => {
  console.log("server run on 3000 port");
});
