const { check, validationResult } = require("express-validator");

const handleErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });
  next();
}

exports.validateRegister = [
  check("email", "Please enter a valid email address").isEmail(),
  check(
    "password",
    "Please enter a password with 6 or more characters"
  ).isLength({
    min: 6
  }),
  handleErrors
];

exports.validateLogin = [
  check("email", "Please enter a valid email address").isEmail(),
  check("password", "Password is required").not().isEmpty(),
  handleErrors
];

exports.validateCreateBoard = [
  check('title', "Please include a title for the board").exists(),
  check("title", "Please include a title for the board").not().isEmpty(),
  handleErrors
];

exports.validateGetBoard = [
  check('boardId', 'No Board Id provided').exists(),
  check('boardId', 'Please provide a valid Board Id').not().isEmpty(),
  handleErrors
];

exports.validateCreateColumn = [
  check('title', "No 'title' field found").exists(),
  check("title", "Please include a title for the column").not().isEmpty(),
  check('boardId', 'No Board Id provided').exists(),
  check('boardId', 'Please provide a valid Board Id').not().isEmpty(),
  handleErrors
];

exports.validateGetColumns = [
  check('columnIds', "No 'columnIds' field found").exists(),
  check('columnIds', 'No columns provided').not().isEmpty(),
  handleErrors
];

exports.validateUpdateColumn = [
  check('id', 'No Column Id Provided').exists(),
  check('id', 'Please provide a valid Board Id').not().isEmpty(),
  check('title', "Please include a title for the column").exists(),
  check("title", "Please include a title for the column").not().isEmpty(),
  check('cards').exists(),
  check('cards').not().isEmpty(),
  handleErrors,
];

exports.validateGetCards = [
  check('cardIds', "No 'cardIds' field found").exists(),
  check('cardIds', 'No cards provided').not().isEmpty(),
  handleErrors
];

exports.validateGetCard = [
  check('cardId', "No 'cardId ' field found").exists(),
  check('cardId', 'No card provided').not().isEmpty(),
  handleErrors
];

exports.validateCreateCard = [
  check('columnId', 'Please include a Column Id').exists(),
  check('title', "Please include a title for the board").exists(),
  check("title", "Please include a title for the board").not().isEmpty(),
  ...exports.validateCreateBoard,
];

exports.validateMoveCard = [
  check('ogColId', 'Please include a source column ID').exists(),
  check('destColId', "Please include a destination column ID").exists(),
  check("row", "Please include a destination row").not().isEmpty(),
  check("cardId", "Please include a card ID").not().isEmpty(),
];
exports.validateUpdateCalendar = [
  handleErrors
]