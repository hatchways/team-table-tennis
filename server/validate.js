const { check, validationResult } = require("express-validator");

const handleErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });
  next();
}

exports.validateRegister = [
  check("username", "Please enter a username").not().isEmpty(),
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

exports.validateTitle = [
  check('title').exists(),
  check('title').not().isEmpty(),
  handleErrors
]

exports.validateBoardId = [
  check('boardId').exists(),
  check('boardId').not().isEmpty(),
  handleErrors
]