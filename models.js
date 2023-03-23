const mongoose = require("mongoose");

const { Schema } = mongoose;

const BookSchema = new Schema(
  {
    title: { type: String, required: true },
    comments: { type: Array, default: [] },
  },
  { versionKey: false }
);

module.exports = mongoose.model("book", BookSchema);
