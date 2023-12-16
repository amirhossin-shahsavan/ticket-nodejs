const statusEnum = require("../utils/enum");
const mongoose = require("mongoose");
const ticketType = new mongoose.Schema(
  {
    category: {
      type: String,
      enum: ["sales-lead", "customer-service-issue", "it-support-request"],
    },
    department: {
      type: String,
      enum: ["sales", "customer-service", "it"],
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
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
