const express = require("express");
const router = express.Router();
const {
  getBoard,
  createBoard,
  createColumn,
  getColumns,
  updateColumn,
  createCard,
  getCards,
  moveCard
} = require('../controllers/boards.js')

// Board
router.route('/').post(createBoard);
router.route('/').get(getBoard);

// Column
router.route('/columns').post(createColumn);
router.route('/columns').get(getColumns)
router.route('/columns').put(updateColumn);

// Card
router.route('/cards').get(getCards);
router.route('/cards').post(createCard);
router.route('/cards/move').put(moveCard);

module.exports = router;