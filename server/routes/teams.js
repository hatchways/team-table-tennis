const express = require("express");
const router = express.Router();

const {
    getTeam,
    deleteTeam,
    teamCardAdd,
    teamCardDelete,
    teamCardUpdate,
    teamBoardAdd,
    teamBoardDelete
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


router.route('/:teamId').get(getTeam, validateTeam);
router.route('/delete/:teamId').delete(deleteTeam, validateTeamDelete);

router.route('/card/add').post(teamCardAdd, validateTeamCard);
router.route('/card/delete').delete(teamCardDelete, validateTeamCard);
router.route('/card/update').put(teamCardUpdate, validateTeamCard);

router.route('/board/add/').post(teamBoardAdd, validateBoardCard);
router.route('/board/delete/boardId').delete(teamBoardDelete, validateBoardCard);

module.exports = router;