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
} = require("../controllers/boards.js");
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
} = require("../validate");

// Board
router.route("/").post(createBoard, validateCreateBoard);
router.route("/").get(getBoard, validateGetBoard);

// Column
router.route("/columns").post(createColumn, validateCreateColumn);
router.route("/columns").get(getColumns, validateGetColumns);
router.route("/columns").put(updateColumn, validateUpdateColumn);

// Card
router.route("/cards").get(getCards, validateGetCards);
router.route("/cards").post(createCard, validateCreateCard);
router.route("/cards/move").put(moveCard, validateMoveCard);

// Card Detail
router.route("/cards/getDetail/:cardId").get(protect, getDetails);
router.route("/cards/detail").put(protect, createDetails);
router.route("/cards/updateDetails").put(protect, updateDetails);

module.exports = router;
