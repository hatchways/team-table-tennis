const express = require("express");
const router = express.Router();
const {
  getBoard,
  createBoard,
  createColumn,
  getColumns,
  updateColumn,
  createCard,
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
router.route('/card').post(createCard);
router.route('/card').patch(moveCard);

module.exports = router;