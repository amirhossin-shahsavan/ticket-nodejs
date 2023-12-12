const express = require("express");
const {
  getallTicket,
  getTicket,
  createTicket,
  updateTicket,
  deleteTicket,
} = require("../controller/ticketCtrl");

const islogin = require("./../middleware/isLogin");
const isAdmin = require("./../middleware/isAdmin");

const ticketRoutes = express.Router();

ticketRoutes.get("/", islogin, getallTicket);

ticketRoutes.get("/:id", islogin, getTicket);

ticketRoutes.post("/", islogin, createTicket);

ticketRoutes.put("/:id", isAdmin, updateTicket);

ticketRoutes.delete("/:id", isAdmin, deleteTicket);

module.exports = ticketRoutes;
