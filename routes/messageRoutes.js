const express = require("express");
const { getMessages, createMessage } = require("../controller/messageCtrl");

const messageRoutes = express.Router();

// messageRoutes.get("/", getallTicket);

messageRoutes.get("/:id", getMessages);

messageRoutes.post("/:id", createMessage);

module.exports = messageRoutes;