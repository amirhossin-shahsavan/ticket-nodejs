const { default: mongoose } = require("mongoose");
const Message = require("./../model/Message");
const Ticket = require("./../model/Ticket");
const appErr = require("./../utils/errHandler");
const User = require("../model/User");
var ObjectId = require("mongodb").ObjectId;
const getMessages = async (req, res, next) => {
  try {
    const message = await Message.find({
      ticketid: new ObjectId(req.params.id),
    })
      .sort({ createdAt: -1 })
      .exec();

    // const { text, createdAt } = await Ticket.findById(req.params.id);
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
    const ticket = await Ticket.findById(req.params.id);

    const userFound = await User.findById(req.userAuth);
    const newMessage = await new Message({
      text: req.body.text,
      ticketid: new ObjectId(req.params.id),
      sender: [userFound.email, userFound.role],
    }).save();
    ticket.text = newMessage._id;
    await Ticket.updateOne(
      { _id: ticket._id },
      { text: newMessage._id },
      { sender: [userFound.email, userFound.role] }
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
