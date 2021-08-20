const asyncHandler = require("express-async-handler");
const Board = require('../models/Board');
const Card = require('../models/Card');

exports.updateCalendar = asyncHandler( async (req, res, next) => {
    const { cardId, date } = req.body;
  await Card.findByIdAndUpdate(
    cardId,
    {
        $set:{
            "cardDetails.deadLine": date
        }
    },
    {
        $new: true
    }
  )
  .exec((err, result) => {
    if (err) {
      return res.status(422).json({ error: err });
    }
    else {
      res.status(200).json(result);
    }
  })
})