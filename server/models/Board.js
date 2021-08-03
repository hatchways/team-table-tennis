const mongoose = require("mongoose");
const ObjectId = mongoose.ObjectId;

const boardSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: false,
  },
  columns:[
    {
      type: ObjectId,
      ref: "column"
    }
  ]
});

module.exports = User = mongoose.model("board", boardSchema);
