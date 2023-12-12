const mongoose = require("mongoose");
const ticketStatusEnum = require("./../utils/enum");
const ticketSchema = new mongoose.Schema(
  {
    id: String,
    title: String,
    description: String,
    status: {
      type: String,
      enum: Object.values(ticketStatusEnum),
      default: ticketStatusEnum.OPEN,
    },
    text: { type: mongoose.Schema.Types.ObjectId, ref: "Message" },
    createdAt: { type: mongoose.Schema.Types.ObjectId, ref: "Message" },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

const Ticket = mongoose.model("Ticket", ticketSchema);

module.exports = Ticket;
