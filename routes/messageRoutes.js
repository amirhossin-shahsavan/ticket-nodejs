const express = require("express");
const { getMessages, createMessage } = require("../controller/messageCtrl");
const isLogin = require("../middleware/isLogin");

const messageRoutes = express.Router();

// messageRoutes.get("/", getallTicket);

messageRoutes.get("/:id", isLogin, getMessages);

messageRoutes.post("/:id", isLogin, createMessage);

module.exports = messageRoutes;
