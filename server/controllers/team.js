const asyncHandler = require("express-async-handler");
const Team = require('../models/Team/Team')
const Card = require('../models/Team/Card')
const Board = require('../models/Team/Board')

exports.getTeam = asyncHandler(async (req, res, next) => {
    const teamId = req.params.teamId;

    const team = await Team.findbyId(teamId);
    if (team) {
        res.status(200).json({ team });
      } else {
        const error = new Error(`Team id does not exists ${teamId}`);
        res.status(404).json({
          error
        })
      }
})

exports.deleteTeam = asyncHandler(async (req, res, next) => {
    const { teamId } =req.params.teamId;

    await Team.deleteOne({ teamId: `${teamId}`});
    res.status(200).json( { success: `${teamId} deleted!`});
})

exports.teamCardAdd = asyncHandler(async (req, res, next) => {
    const { boardId } =req.params.boardId;
    const { title, description } = req.body;

    const card = new Card({
        title,
        description
    })
    await card.save()
    const board = await Board.findbyId(boardId);
    board.cards.push(card._id);
    await board.save();
    res.status(200).json({card})
})

exports.teamCardDelete = asyncHandler(async (req, res, next) => {
    const { boardId, cardId } = req.body;

    await Board.findByIdAndUpdate(
        boardId,
        { $pull: { cards: {_id: cardId}}},
        { new: true }
    )
    .exec((err, result) => {
        if (err) {
          return res.status(422).json({ error: err });
        } else {
          res.json(result);
        }
    })
})

exports.teamCardUpdate = asyncHandler(async (req, res, next) => {
    const { title, desc } = req.body;
    const { boardId, cardId } = req.params

    const board = await Board.findById(boardId)

    await Card.findByIdAndUpdate(
        cardId,
        {
            $set: {
                title,
                desc
            }
        },
        {
            new: true
        }
    )
    .exec((err, result) => {
        if (err) {
          return res.status(422).json({ error: err });
        } else {
          res.status(200).json(result);
        }
      })
})

exports.teamBoardAdd = asyncHandler(async (req, res, next) => {
    const { title } = req.body;

    const newBoard = new Board(title)

    await newBoard.save()
    .exec((err, result) => {
        if (err) {
          return res.status(422).json({ error: err });
        }
        else {
          res.status(200).json(result);
        }
    })
})

exports.teamBoardDelete = asyncHandler(async (req, res, next) => {
    const { boardId } = req.params

    await Board.findByIdAndDelete(boardId)
    .exec((err, result) => {
        if (err) {
          return res.status(422).json({ error: err });
        }
        else {
          res.status(200).json(result);
        }
    })
    

})