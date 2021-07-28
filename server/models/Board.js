const mongoose = require("mongoose");

const boardSchema = new mongoose.Schema({
  name: {
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
