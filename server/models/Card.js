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
  cardDetails: [
    {
      tags:{
      type:Array,
      required: false,
      unique: false,
    },
      color:{
      type:String,
      required: false,
      unique: false,
    },
      deadLine:{
      type:Date,
      required: false,
      unique: false,
    },
      attachment:{
      type:String,
      required: false,
      unique: false,
    }}
  ]
})

module.exports = Card = mongoose.model('card', cardSchema)