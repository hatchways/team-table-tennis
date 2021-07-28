const express = require("express");
const router = express.Router();
const {
  getBoard,
  createBoard,
  createColumn,
  updateColumn,
  createCard,
  moveCard
} = require('../controllers/boards.js')

// Board
router.route('/create-board').post(createBoard);
router.route('/get-board').get(getBoard);

// Column
router.route('/create-column').post(createColumn);
router.route('/update-column').post(updateColumn);

// Card
router.route('/create-card').post(createCard);
router.route('/move-card').post(moveCard);

module.exports = router;