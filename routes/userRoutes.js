const express = require("express");
const { registerUser, loginUser } = require("../controller/userCtrl");

const messageRoutes = express.Router();

messageRoutes.post("/register", registerUser);

messageRoutes.get("/login", loginUser);

module.exports = messageRoutes;
