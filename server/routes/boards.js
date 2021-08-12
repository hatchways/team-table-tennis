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
  
  moveCard,
  createDetails,
  updateDetails,
  updateDetailsColor,
  getCard,
  getDetails
} = require('../controllers/boards.js');
const protect = require("../middleware/auth.js");
const {
  validateCreateBoard,
  validateGetBoard,
  validateCreateColumn,
  validateGetColumns,
  validateUpdateColumn,
  validateGetCards,
  validateCreateCard,
  validateMoveCard,
  validateGetCard
} = require("../validate");

// Board
router.route('/').post(createBoard, validateCreateBoard);
router.route('/').get(getBoard, validateGetBoard);

// Column
router.route('/columns').post(createColumn, validateCreateColumn);
router.route('/columns').get(getColumns, validateGetColumns);
router.route('/columns').put(updateColumn, validateUpdateColumn);

// Card
//router.route('/cards').get(getCards, validateGetCards);
router.route('/cards').post(createCard, validateCreateCard);
router.route('/cards/move').put(moveCard, validateMoveCard);
router.route('/cards/').get(getCard, validateGetCard);

// Card Detail
router.route('/cards/getDetail/:cardId').get(protect,getDetails);
router.route('/cards/detail').put(protect,createDetails);
router.route('/cards/updateDetails').put(protect,updateDetails);
router.route('/cards/ ').put(protect,updateDetailsColor);

module.exports = router;