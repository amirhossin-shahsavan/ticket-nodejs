const { default: mongoose } = require("mongoose");
const Ticket = require("./../model/Ticket");
const Message = require("./../model/Message");
const appErr = require("./../utils/errHandler");
const User = require("../model/User");
const fs = require("fs");
const path = require("path");

const getTicket = async (req, res, next) => {
  try {
    const tickets = await Ticket.findOne({
      _id: new ObjectId(req.params.id),
      user: req.userAuth,
    });
    if (!tickets) {
      return next(appErr("you dont have access", 401));
    }
    res.json(tickets);
  } catch (error) {
    next(appErr(error.message));
  }
};
const getallTicket = async (req, res, next) => {
  try {
    const tickets = await Ticket.find({ user: req.userAuth }).populate("text");
    if (!tickets) {
      return next(appErr("you dont have access", 401));
    }
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
      user: req.userAuth,
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
    const updated = await Ticket.updateOne(
      { _id: new ObjectId(req.params.id), user: req.userAuth },
      req.body
    );
    if (!updated) {
      return next(appErr("Ticket not found"), 401);
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
    const deletedTicket = await Ticket.deleteOne({
      id_: req.params.id,
      user: req.userAuth,
    });
    if (!deleteTicket) {
      next(appErr("you dont have access", 401));
    }
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

const uploadfile = async (req, res, next) => {
  try {
    const newMsg = await new Message({
      ticketid: new ObjectId(req.params.id), //req.params.id is message id
      text: "image sent",
      type: "image",
      user: req.userAuth,
    }).save();
    await Ticket.updateOne(
      { _id: new ObjectId(req.params.id) },
      { text: newMsg._id }
    );

    const buffer = Buffer.from(req.files.image.data);

    const filePath = path.join(
      __dirname,
      "./../files",
      "upload",
      newMsg._id.toString() + ".png"
    );

    fs.writeFileSync(filePath, buffer);

    res.json({
      status: "success",
      data: "File uploaded and attached to ticket!",
    });
  } catch (error) {
    next(appErr(error.message));
  }
};

const getFile = async (req, res, next) => {
  const msgid = req.params.id;
  msgid = new ObjectId(msgid);
  var msgFind = await Message.findOne({ user: req.userAuth, _id: msgid });
  if (!msgFind) {
    next(appErr("you dont have access", 401));
  }
  res.sendfile("../files/upload/" + req.params.id + ".png");
};

module.exports = {
  getTicket,
  getallTicket,
  createTicket,
  updateTicket,
  deleteTicket,
  uploadfile,
  getFile,
};
