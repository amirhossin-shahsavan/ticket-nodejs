const express = require("express");
const { registerUser, loginUser } = require("../controller/userCtrl");

const messageRoutes = express.Router();

messageRoutes.post("/register", registerUser);

messageRoutes.post("/login", loginUser);

module.exports = messageRoutes;
