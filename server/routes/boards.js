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
  getBoardFull,
  moveCard,
  createDetails,
  updateDetails,
  moveColumn,
  quickUpdateCard,
  updateDetailsColor,
  getCard,
  getDetails,
  moveCardToAnotherColumn,
  deleteColumn,
  createBoardWithUser,
  editBoardTitle
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
router.route('/:userId').post(createBoardWithUser, validateCreateBoard);
router.route('/:boardId').get(getBoard, validateGetBoard);
router.route('/full/:boardId').get(getBoardFull);
router.route('/editTitle').put(editBoardTitle);

// Column
router.route("/columns").post(createColumn, validateCreateColumn);
router.route("/columns/move").put(moveColumn);
router.route("/columns/:boardId").get(getColumns, validateGetColumns);
router.route("/columns").put(updateColumn, validateUpdateColumn);
router.route("/columns").delete(deleteColumn);

// Card
router.route("/cards/:columnId").get(getCards, validateGetCards);
router.route("/cards").post(createCard, validateCreateCard);
router.route("/cards/move").put(moveCard, validateMoveCard);
router.route("/cards/moveToOtherColumn").put(moveCardToAnotherColumn);
router.route("/cards/quickUpdate").put(quickUpdateCard);

// Card Detail
router.route("/cards/getDetail/:cardId").get(protect, getDetails);
router.route("/cards/detail").put(protect, createDetails);
router.route("/cards/updateDetails").put(protect, updateDetails);

module.exports = router;
