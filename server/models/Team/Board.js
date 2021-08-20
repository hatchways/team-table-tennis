const mongoose = require("mongoose");
const ObjectId = mongoose.ObjectId;

const teamBoardSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: false,
    },
    cards:[{
        type: ObjectId,
        ref: "teamCard"
    }]
})

module.exports = TeamBoard = mongoose.model('teamBoard', teamBoardSchema)