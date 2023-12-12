const { default: mongoose } = require("mongoose");
const Message = require("./../model/Message");
const Ticket = require("./../model/Ticket");
const appErr = require("./../utils/errHandler");
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
    const newMessage = await new Message({
      text: req.body.text,
      ticketid: new ObjectId(req.params.id),
    }).save();
    ticket.text = newMessage._id;
    await Ticket.updateOne({ _id: ticket._id }, { text: newMessage._id });

    res.json({
      status: "success",
      data: newMessage,
    });
  } catch (error) {
    next(appErr(error.message));
  }
};

// const updateTicket = async (req, res) => {
//   try {
//     const updatedTicket = await Ticket.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true }
//     );
//     if (!updatedTicket) {
//       return next(appErr("Ticket not found"));
//     } else {
//       res.json({
//         status: "success",
//         data: "you have successfully update ticket",
//       });
//     }
//   } catch (error) {
//     next(appErr(error.message));
//   }
// };

// const deleteTicket = async (req, res) => {
//   try {
//     const deletedTicket = await Ticket.findByIdAndDelete(req.params.id);
//     if (!deletedTicket) {
//       return next(appErr("Ticket not found"));
//     } else {
//       res.json({
//         status: "success",
//         data: "you have successfully delete ticket",
//       });
//     }
//   } catch (error) {
//     next(appErr(error.message));
//   }
// };

module.exports = {
  getMessages,
  createMessage,
};
