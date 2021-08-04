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
} = require('../controllers/boards.js');
const {
  validateCreateBoard,
  validateGetBoard,
  validateCreateColumn,
  validateGetColumns,
  validateUpdateColumn,
  validateGetCards,
  validateCreateCard,
  validateMoveCard
} = require("../validate");

// Board
router.route('/').post(createBoard, validateCreateBoard);
router.route('/').get(getBoard, validateGetBoard);

// Column
router.route('/columns').post(createColumn, validateCreateColumn);
router.route('/columns').get(getColumns, validateGetColumns);
router.route('/columns').put(updateColumn, validateUpdateColumn);

// Card
router.route('/cards').get(getCards, validateGetCards);
router.route('/cards').post(createCard, validateCreateCard);
router.route('/cards/move').put(moveCard, validateMoveCard);

module.exports = router;