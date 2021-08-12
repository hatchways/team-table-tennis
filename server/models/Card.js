const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: false
  },
  description: {
    type: String,
    required: false,
    unique: false,
  },
  cardDetails: 
    {
      tags:{ type: Array },
      color:{ type: String },
      deadLine: {type: Date },
      attachment:{ type: String }
    }
})

module.exports = Card = mongoose.model('card', cardSchema)