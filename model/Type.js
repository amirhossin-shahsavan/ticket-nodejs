const statusEnum = require("../utils/enum");
const mongoose = require("mongoose");
const ticketType = new mongoose.Schema(
  {
    ticketid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ticket",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    category: {
      type: String,
      enum: ["sales-lead", "customer-service-issue", "it-support-request"],
    },
    department: {
      type: String,
      enum: ["sales", "customer-service", "it"],
    },
    status: {
      type: String,
      enum: Object.values(statusEnum),
      default: statusEnum.OPEN,
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high", "urgent"],
      default: "low",
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);
const Type = mongoose.model("Type", ticketType);

module.exports = Type;
