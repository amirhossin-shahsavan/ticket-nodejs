const expressFile = require("express-fileupload");

const express = require("express"),
  http = require("http"),
  socketIo = require("socket.io"),
  app = express();

var server = http.createServer(app);
var io = socketIo(server);

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

const verifyToken = require("./utils/verifyToken");

global.UsersSocket = {};

io.on("connection", (socket) => {
  socket.on("login", function (data) {
    try {
      var dacode = verifyToken(data);
      socket.id = dacode.id;
      global.UsersSocket[socket.id] = socket;
      socket.emit("login", JSON.stringify({ islogin: true }));
    } catch {
      socket.emit("login", JSON.stringify({ islogin: false }));
    }
  });

  socket.on("close", function () {
    delete global.UsersSocket[socket.id];
  });
});

server.listen(3000, () => {
  console.log("server run on 3000 port");
});

module.exports = app;
