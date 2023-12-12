const express = require("express");
const app = express();

const ticketRoutes = require("./routes/ticketRoutes");
const messageRoutes = require("./routes/messageRoutes");

app.use(express.json());

app.use("/api/v1/message", messageRoutes);

app.use("/api/v1/ticket", ticketRoutes);

app.listen(3000, () => {
  console.log("server run on 3000 port");
});
