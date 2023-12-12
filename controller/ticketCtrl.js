const { default: mongoose } = require("mongoose");
const Ticket = require("./../model/Ticket");
const Message = require("./../model/Message");
const appErr = require("./../utils/errHandler");
const getTicket = async (req, res, next) => {
  try {
    const tickets = await Ticket.findById(req.params.id);
    res.json(tickets);
  } catch (error) {
    next(appErr(error.message));
  }
};
const getallTicket = async (req, res, next) => {
  try {
    const tickets = await Ticket.find().populate("text");
    res.json(tickets);
  } catch (error) {
    next(appErr(error.message));
  }
};

const createTicket = async (req, res, next) => {
  const { title, description } = req.body;
  try {
    const ticketCreated = await Ticket.create({
      title,
      description,
    });

    res.json({
      status: "success",
      data: ticketCreated,
    });
  } catch (error) {
    next(appErr(error.message));
  }
};

var ObjectId = require("mongodb").ObjectId;

const updateTicket = async (req, res, next) => {
  try {
    console.log(new ObjectId(req.params.id), req.body);
    var updated = await Ticket.updateOne(
      { _id: new ObjectId(req.params.id) },
      req.body
    );
    if (!updated) {
      return next(appErr("Ticket not found"));
    } else {
      res.json({
        status: "success",
        data: "you have successfully update ticket",
      });
    }
  } catch (error) {
    next(appErr(error.message));
  }
};

const deleteTicket = async (req, res, next) => {
  try {
    const deletedTicket = await Ticket.findByIdAndDelete(req.params.id);
    await Message.deleteMany({ ticketid: new ObjectId(req.params.id) });
    if (!deletedTicket && deletedMessage) {
      return next(appErr("Ticket not found"));
    } else {
      res.json({
        status: "success",
        data: "you have successfully delete ticket",
      });
    }
  } catch (error) {
    next(appErr(error.message));
  }
};

module.exports = {
  getTicket,
  getallTicket,
  createTicket,
  updateTicket,
  deleteTicket,
};
