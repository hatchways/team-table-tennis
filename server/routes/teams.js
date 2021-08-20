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


router.route('/:teamId').get(getTeam, validateGetTeam);
router.route('/delete/:teamId').delete(deleteTeam, validateDeleteTeam);

router.route('/card/add').post(teamCardAdd, validateTeamCardAdd);
router.route('/card/delete').delete(teamCardDelete, validateTeamCardDelete);
router.route('/card/update').put(teamCardUpdate, validateTeamCardUpdate);

router.route('/board/add/').post(teamBoardAdd, validateTeamBoardAdd);
router.route('/board/delete/boardId').delete(teamBoardDelete, validateTeamBoardDelete);

module.exports = router;