const asyncHandler = require("express-async-handler");
const Board = require('../models/Board');
const Column = require('../models/Column');

exports.createBoard = asyncHandler(async (req, res, next) => {
  const { name } = req.body;
  if (name) {

    const inProgress = new Column({ name: 'In Progress' });
    const completed = new Column({ name : 'Completed' });
    
    await inProgress.save();
    await completed.save();

    const board = new Board({ name, columns: [inProgress, completed]});
    const doc = await board.save();

    res.status(201).json({
      success: {
        boardId: doc._id.toString(),
      }
    })
  } else {
    res.status(400).send({
      message: 'Name is empty'
    })
  }
})