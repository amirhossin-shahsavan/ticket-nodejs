const express = require("express");
const {
  getallTicket,
  getTicket,
  createTicket,
  updateTicket,
  deleteTicket,
} = require("../controller/ticketCtrl");

const ticketRoutes = express.Router();

ticketRoutes.get("/", getallTicket);

ticketRoutes.get("/:id", getTicket);

ticketRoutes.post("/", createTicket);

ticketRoutes.put("/:id", updateTicket);

ticketRoutes.delete("/:id", deleteTicket);

module.exports = ticketRoutes;
