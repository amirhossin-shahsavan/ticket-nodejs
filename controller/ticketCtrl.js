const { default: mongoose } = require("mongoose");
const Ticket = require("./../model/Ticket");
const Message = require("./../model/Message");
const appErr = require("./../utils/errHandler");
const User = require("../model/User");
const fs = require("fs");
const path = require("path");
var ObjectId = require("mongodb").ObjectId;

const getTicket = async (req, res, next) => {
  try {
    const tickets = await Ticket.findOne({
      _id: new ObjectId(req.params.id),
      user: req.userAuth,
    });
    const ticketFound = await Ticket.findOne({ _id: req.params.id });
    if (!ticketFound) {
      return next(appErr("not found", 404));
    }
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

const updateTicket = async (req, res, next) => {
  try {
    const updated = await Ticket.updateOne(
      { _id: new ObjectId(req.params.id), user: req.userAuth },
      req.body
    );
    const ticketFound = await Ticket.findOne({ _id: req.params.id });
    if (!ticketFound) {
      return next(appErr("not found", 404));
    }
    if (!updated) {
      return next(appErr("you dont have access"), 401);
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
    const ticketFound = await Ticket.findOne({ _id: req.params.id });
    if (!ticketFound) {
      return next(appErr("not found", 404));
    }

    if (!deletedTicket) {
      next(appErr("you dont have access", 401));
    }

    await Message.deleteMany({ ticketid: new ObjectId(req.params.id) });

    res.json({
      status: "success",
      data: "you have successfully delete ticket",
    });
  } catch (error) {
    next(appErr(error.message));
  }
};

const uploadfile = async (req, res, next) => {
  try {
    const ticketFound = await Ticket.findOne({ _id: req.params.id });
    if (!ticketFound) {
      return next(appErr("not found", 404));
    }

    const ticketAuthFound = await Ticket.findOne({
      _id: req.params.id,
      user: req.userAuth,
    });

    if (!ticketAuthFound) {
      return next(appErr("dont have access", 401));
    }

    const newMsg = await new Message({
      ticketid: new ObjectId(req.params.id),
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
  try {
    // problem => how add 404 status
    const msgid = new ObjectId(req.params.id);
    const msgFind = await Message.findOne({ user: req.userAuth, _id: msgid });

    const flileFound = await Message.findOne({ _id: msgid });
    if (!flileFound) {
      return next(appErr("not found", 404));
    }
    if (!msgFind) {
      return next(appErr("you dont have access", 401));
    }
    const address = path.join(
      __dirname,
      "../files/upload/",
      req.params.id + ".png"
    );
    res.sendFile(address);
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
  uploadfile,
  getFile,
};
