const asyncHandler = require("express-async-handler");
const Board = require('../models/Board');
const Card = require('../models/Card');
const Column = require('../models/Column');

exports.createBoard = asyncHandler(async (req, res) => {
  const { title } = req.body;
  if (title) {
    const inProgress = new Column({ title: 'In Progress' });
    const completed = new Column({ title : 'Completed' });
    
    await inProgress.save();
    await completed.save();

    const board = new Board({ title, columns: [inProgress._id, completed._id]});
    await board.save();

    res.status(201).json({
      success: {
        board
      }
    });
  } else {
    res.status(400).send({
      message: 'Board title is empty'
    });
  }
})

exports.getBoard = asyncHandler(async (req, res) => {
  const { boardId } = req.body;
  const board = await Board.findById(boardId);
  if (board) {
    res.status(200).json({ board });
  } else {
    const error = new Error(`Could not find board ${boardId}`);
    res.status(404).json({
      error
    })
  }
})

exports.createColumn = asyncHandler(async (req, res) => {
  const { title, boardId } = req.body;
  if (title && boardId) {
    const column = new Column({ title });
    await column.save();
    
    // Add column to board.
    const board = await Board.findById(boardId);
    board.columns.push(column._id);
    await board.save();
    res.status(201).json({
      column
    });
  } else {
    res.status(400).send({
      message: 'Column title is empty'
    });
  }
})

exports.getColumns = asyncHandler(async (req, res) => {
  const { columnIds } = req.body;
  const columns = await Promise.all(columnIds.map(async (id) => {
    const doc = await Column.findById(id);
    return doc;
  }));
  res.status(200).json({
    columns
  })
})

exports.updateColumn = asyncHandler(async (req, res) => {
  const { id, title, cards } = req.body;
  const filter = { _id : id };
  const update = { title, cards };
  await Column.findOneAndUpdate(filter, update);
  res.status(200);
})

exports.createCard = asyncHandler(async (req, res) => {
  const { title, description, columnId } = req.body;
  const card = new Card({ title });
  if (description) {
    card.description = description;
  }
  await card.save();

  const column = await Column.findById(columnId);
  column.cards.push(card._id);
  await column.save();
  res.status(201).json({
    cardId: card._id
  })
})

exports.getCards = asyncHandler(async (req, res) => {
  const { cardIds } = req.body;
  const cards = await Promise.all(cardIds.map(async (id) => {
  const doc = await Card.findById(id);
  return doc;
  }));
  res.status(200).json({
    cards
  })
})

exports.moveCard = asyncHandler(async (req, res) => {
  const { ogColId, destColId, row, cardId } = req.body;
  const ogCol = await Column.findOne({ _id: ogColId });
  ogCol.cards = ogCol.cards.filter(id => id.toString() !== cardId);
  await ogCol.save();
  // TODO: make sure to check element exists to begin with.

  const destCol = await Column.findOne({ _id: destColId });
  destCol.cards.splice(row, 0, cardId);
  await destCol.save();
  res.sendStatus(200);
})