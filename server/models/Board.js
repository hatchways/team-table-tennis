const mongoose = require("mongoose");

const boardSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: false,
  },
  columns:[
    {
      type: String,
    }
  ]
});

module.exports = User = mongoose.model("board", boardSchema);
