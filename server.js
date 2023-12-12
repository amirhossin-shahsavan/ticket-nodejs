const express = require("express");
const app = express();

const ticketRoutes = require("./routes/ticketRoutes");

app.use(express.json());

app.use("/api/v1/ticket", ticketRoutes);

app.listen(3000, () => {
  console.log("server run on 3000 port");
});
