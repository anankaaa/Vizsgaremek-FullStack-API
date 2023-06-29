const mongoose = require("mongoose");

const AidSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    details: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    collected: {
      type: Number,
      required: true,
    },
    active: {
      type: Boolean,
      required: true,
    },
    payment: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Aid", AidSchema);
