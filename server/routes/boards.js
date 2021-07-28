const express = require("express");
const router = express.Router();
const {
  createBoard,
  createColumn,
  updateColumn,
  createCard
} = require('../controllers/boards.js')


router.route('/create-board').post(createBoard);

router.route('/create-column').post(createColumn);

router.route('/update-column').post(updateColumn);

router.route('/create-card').post(createCard);

router.route('/move-card').post();

module.exports = router;