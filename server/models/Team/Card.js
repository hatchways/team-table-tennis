const mongoose = require("mongoose");
const ObjectId = mongoose.ObjectId;

const teamCardSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: false
      },
      description: {
        type: String,
        required: false,
        unique: false,
      }
})

module.exports = TeamCard = mongoose.model('teamCard', teamCardSchema)