const express = require("express");
const {
  getallTicket,
  getTicket,
  createTicket,
  updateTicket,
  deleteTicket,
  uploadfile,
  getFile,
} = require("../controller/ticketCtrl");

const islogin = require("./../middleware/isLogin");
const isAdmin = require("./../middleware/isAdmin");

const ticketRoutes = express.Router();

ticketRoutes.get("/", islogin, getallTicket);

ticketRoutes.get("/:id", islogin, getTicket);

ticketRoutes.post("/", islogin, createTicket);

ticketRoutes.post("/upload/:id", islogin, uploadfile);

ticketRoutes.get("/image/:id", islogin, getFile);

ticketRoutes.put("/:id", islogin, isAdmin, updateTicket);

ticketRoutes.delete("/:id", islogin, deleteTicket);

module.exports = ticketRoutes;
