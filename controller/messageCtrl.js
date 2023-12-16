const { default: mongoose } = require("mongoose");
const Message = require("./../model/Message");
const Ticket = require("./../model/Ticket");
const { appErr } = require("./../utils/errHandler");
const User = require("../model/User");
var ObjectId = require("mongodb").ObjectId;
const expressFile = require("express-fileupload");

const getMessages = async (req, res, next) => {
  try {
    const message = await Message.find({
      ticketid: new ObjectId(req.params.id),
      user: req.userAuth,
    })
      .sort({ createdAt: -1 })
      .exec();
    const messageFound = await Message.findOne({ ticketid: req.params.id });
    if (!messageFound) {
      return res.status(404).json(appErr("not found", 404));
    }
    if (!message) {
      return res.status(401).json(appErr("you dont have access", 401));
    }
    res.json({
      status: "success",
      data: {
        list: message,
      },
    });
  } catch (error) {
    next(appErr(error.message));
  }
};

const createMessage = async (req, res, next) => {
  try {
    const ticket = await Ticket.findOne({
      _id: new ObjectId(req.params.id),
      user: req.userAuth,
    });

    const ticketFound = await Ticket.findOne({
      _id: req.params.id,
      status: "open",
    });

    if (!ticketFound) {
      return res.status(404).json(appErr("not found", 404));
    }
    if (!ticket && !req.user.permission == "support") {
      return res.status(401).json(appErr("you dont have access", 401));
    }

    const newMessage = await new Message({
      text: req.body.text,
      ticketid: new ObjectId(req.params.id),
      user: req.userAuth,
      sender: req.user.permission,
    }).save();

    await Ticket.updateOne(
      { _id: new ObjectId(req.params.id) },
      { text: newMessage._id }
    );

    res.json({
      status: "success",
      data: newMessage,
    });
  } catch (error) {
    next(appErr(error.message));
  }
};

module.exports = {
  getMessages,
  createMessage,
};
