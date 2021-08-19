const express = require("express");
const router = express.Router();

const {
    getTeam,
    deleteTeam,
    teamCardAdd,
    teamCardDelete,
    teamCardUpdate,
    teamBoardAdd,
    teamBoardADelete
  } = require('../controllers/boards.js');
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


routerrouter.route('/').get(getTeam, validateTeam);
router.route('/delete').get(deleteTeam, validateTeamDelete);

router.route('/card/add').post(teamCardAdd, validateTeamCard);
router.route('/card/delete').post(teamCardDelete, validateTeamCard);
router.route('/card/update').post(teamCardUpdate, validateTeamCard);

router.route('/board/add').post(teamBoardAdd, validateBoardCard);
router.route('/board/delete').post(teamBoardADelete, validateBoardCard);

module.exports = router;