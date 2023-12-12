const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema(
  {
    id: String,
    title: String,
    description: String,
    status: {
      type: String,
      default: "open",
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

const Ticket = mongoose.model("Ticket", ticketSchema);

module.exports = Ticket;
