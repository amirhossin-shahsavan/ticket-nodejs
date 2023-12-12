const express = require("express");

const ticketRoutes = express.Router();

ticketRoutes.get("/", (req, res) => {
  res.json({
    data: "tickek resive all",
  });
});

ticketRoutes.get("/:id", (req, res) => {
  res.json({
    data: "tickek resive once",
  });
});

ticketRoutes.post("/", (req, res) => {
  res.json({
    data: "tickek created",
  });
});

ticketRoutes.put("/:id", (req, res) => {
  res.json({
    data: "tickek updated",
  });
});

ticketRoutes.delete("/:id", (req, res) => {
  res.json({
    data: "tickek deleted",
  });
});

module.exports = ticketRoutes;
