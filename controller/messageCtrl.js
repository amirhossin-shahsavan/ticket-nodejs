const { default: mongoose } = require("mongoose");
const Message = require("./../model/Message");
const Ticket = require("./../model/Ticket");
const { appErr } = require("./../utils/errHandler");
const User = require("../model/User");
var ObjectId = require("mongodb").ObjectId;

const getMessages = async (req, res, next) => {
  try {
    const messageFoundOne = await Message.findOne({
      ticketid: new ObjectId(req.params.id),
    }); /**soal inke in moshkel ro chetori bar taraf konam?*/

    const messageFound = await Message.find({
      ticketid: req.params.id,
    });

    if (!messageFoundOne) {
      return res.status(404).json(appErr("not found", 404));
    }

    if (
      messageFoundOne.user.toString() != req.userAuth.toString() &&
      req.user.permission == "user"
    ) {
      return res.status(401).json(appErr("you dont have access", 401));
    }

    res.json({
      status: "success",
      data: {
        list: messageFound,
      },
    });
  } catch (error) {
    appErr("error.message");
  }
};

const createMessage = async (req, res, next) => {
  try {
    const ticketFound = await Ticket.findOne({
      _id: req.params.id,
      status: "open",
    });

    if (!ticketFound) {
      return res.status(404).json(appErr("not found", 404));
    }

    if (
      req.user.permission == "user" &&
      ticketFound.user.toString() != req.userAuth.toString()
    ) {
      return res.status(401).json(appErr("permission deneid", 401));
    }

    const newMessage = await new Message({
      text: req.body.text,
      ticketid: new ObjectId(req.params.id),
      user: req.userAuth,
      sender: req.user.permission,
    }).save();

    try {
      global.UsersSocket[ticketFound.user.toString()].emit(
        "newmsg",
        JSON.stringify(newMessage)
      );
    } catch {
      next(appErr("new msg error ..."));
    }

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
