const { default: mongoose } = require("mongoose");
const Message = require("./../model/Message");
const Ticket = require("./../model/Ticket");
const appErr = require("./../utils/errHandler");
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
    if (!message) {
      return next(appErr("you dont have access", 401));
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
    if (!ticket) {
      return next(appErr("you dont have access", 401));
    }
    const userFound = await User.findById(req.userAuth);

    const newMessage = await new Message({
      text: req.body.text,
      ticketid: new ObjectId(req.params.id),
      user: req.userAuth,
      isAdmin: userFound.isAdmin,
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
