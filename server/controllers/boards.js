const asyncHandler = require("express-async-handler");
const Board = require('../models/Board');
const Card = require('../models/Card');
const Column = require('../models/Column');

exports.createBoard = asyncHandler(async (req, res) => {
  const { title } = req.body;
  if (title) {
    try {
      const inProgress = new Column({ title: 'In Progress' });
      const completed = new Column({ title : 'Completed' });
      
      await inProgress.save();
      await completed.save();

      const board = new Board({ title, columns: [inProgress, completed]});
      const doc = await board.save();

      res.status(201).json({
        success: {
          boardId: doc._id,
        }
      });
    } catch (err) {
      res.status(500);
      console.error(err);
    }
  } else {
    res.status(400).send({
      message: 'Board title is empty'
    });
  }
})

exports.createColumn = asyncHandler(async (req, res) => {
  const { title } = req.body;
  if (title) {
    try {
      const column = new Column({ title });
      const doc = await column.save();
      res.status(201).json({
        success : {
          columnId: doc._id,
        }
      });
    } catch (err) {
      res.status(500);
      console.error(err);
    }
  } else {
    res.status(400).send({
      message: 'Column title is empty'
    });
  }
})

exports.updateColumn = asyncHandler(async (req, res) => {
  const { id, title, columns } = req.body;
  const filter = { _id : id };
  const update = { title, columns };
  try {
    await Column.findOneAndUpdate(filter, update);
    res.status(200);
  } catch (err) {
    res.status(500);
    console.error(err);
  }
})

exports.createCard = asyncHandler(async (req, res) => {
  const { title, description } = req.body;
  const card = new Card({ title });
  if (description) {
    card.description = description;
  }
  try {
    await card.save();
    res.status(201)
  } catch (err) {
    console.error(err);
    res.status(500);
  }
})

exports.moveCard = asyncHandler(async (req, res) => {
  const { ogColId, destColId, row, cardId } = req.body;
  try {
    const destCol = await Column.findOne({ _id: destColId });
    destCol.cards.splice(row, 0, cardId);
    await destCol.save();

    const ogCol = await Column.findOne({ _id: ogColId });
    ogCol.cards = ogCol.cards.filter(card => card._id !== cardId);
    await ogCol.save();
    res.status(200);
  } catch (err) {
    res.status(500);
    console.error(err);
  }
})