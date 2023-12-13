const express = require("express");
const { getMessages, createMessage } = require("../controller/messageCtrl");
const isLogin = require("../middleware/isLogin");
const isAdmin = require("../middleware/isAdmin");

const messageRoutes = express.Router();

// messageRoutes.get("/", getallTicket);

messageRoutes.get("/:id", isLogin, getMessages);

messageRoutes.post("/:id", isLogin, isAdmin, createMessage);

module.exports = messageRoutes;
