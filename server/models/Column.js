const mongoose = require("mongoose");
const ObjectId = mongoose.ObjectId;

const columnSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: false
  },
  cards: [{
    type: ObjectId,
    ref: "card"
  }]
})

module.exports = Column = mongoose.model('column', columnSchema)