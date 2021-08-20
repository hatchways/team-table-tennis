const asyncHandler = require("express-async-handler");
const Board = require('../models/Board');
const Card = require('../models/Card');

exports.getCalendar = asyncHandler( async (req, res, next) => {
    const { boardId } = req.body;
    const board = await Board.findById(boardId)
    console.log(board);
})

exports.updateCalendar = asyncHandler( async (req, res, next) => {

})