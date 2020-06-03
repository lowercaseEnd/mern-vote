const { check } = require("express-validator");

const validatePoll = [
  //проверка названия
  check("title")
    .trim()
    .isLength({ min: 3 })
    .withMessage("Title should be at least 4 characters long"),
  check("shortName")
    .trim()
    .isLength({ max: 16 })
    .withMessage("Short name should not be bigger than 16 chars"),
  check("choices")
    .trim()
    .custom(array => Array.from(new Set(array)).length >= 2)
    .withMessage("Must include at least 2 unique choices"),
  check("choices.*")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Choices cannot be blank")
    .escape()
];

module.exports = validatePoll;