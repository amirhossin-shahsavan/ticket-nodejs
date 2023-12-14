const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  ticketid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Ticket",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  text: {
    type: String,
  },
  type: {
    type: String,
    default: "text",
    enum: ["text", "image"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  sender: {
    type: String,
    default: "user",
  },
});

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
