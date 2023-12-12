const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  ticketid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Ticket",
  },
  text: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Message = mongoose.model("newTicket", messageSchema);

module.exports = Message;
