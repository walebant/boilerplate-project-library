const mongoose = require('mongoose');

const { Schema } = mongoose;

const BookSchema = new Schema(
  {
    title: { type: String, required: true },
    commentcount: { type: Number, default: 0 },
    comments: { type: Array, default: [] },
  },
  { versionKey: false }
);

module.exports = mongoose.model('book', BookSchema);
