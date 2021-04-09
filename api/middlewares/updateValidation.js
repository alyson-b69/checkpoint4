const { check } = require("express-validator");

const updateValidation = [
    check("email", "Email is invalid").isEmail().optional(),
    check(
        "password",
        "Password should have between 8 and 12 characters"
    ).isLength({ min: 8, max: 12 }).optional(),
    check("username", "Name should have between 2 and 12 characters").isLength({
        min: 2,
        max: 12,
    }).optional(),
];

module.exports = updateValidation;
