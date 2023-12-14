const mongoose = require("mongoose");
const ticketStatusEnum = require("./../utils/enum");
const ticketSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    status: {
      type: String,
      enum: Object.values(ticketStatusEnum),
      default: ticketStatusEnum.OPEN,
    },
    text: { type: mongoose.Schema.Types.ObjectId, ref: "Message" },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    is_deletet: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

const Ticket = mongoose.model("Ticket", ticketSchema);

module.exports = Ticket;
