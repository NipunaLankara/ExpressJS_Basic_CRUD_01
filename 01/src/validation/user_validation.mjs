import { body, query } from "express-validator";

export const validateUserIdQuery = [
    query("id")
        .isInt({ gt: 0 })
        .withMessage("ID must be a positive integer")
];

export const validateCreateUser = [
    body("Name")
        .exists().withMessage("Name is required")
        .isString().withMessage("Name must be a string")
        .notEmpty().withMessage("Name cannot be empty"),
    body("UserName")
        .exists().withMessage("UserName is required")
        .isString().withMessage("UserName must be a string")
        .notEmpty().withMessage("UserName cannot be empty"),
    body("Password")
        .exists().withMessage("Password is required")
        .isString().withMessage("Password must be a string")
        .isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
    body("PhoneNumber")
        .optional()
        .isNumeric().withMessage("PhoneNumber must be a number")
];


export const validateUpdateUser = [
    query("id")
        .isInt({ gt: 0 })
        .withMessage("ID must be a positive integer"),
    body("Name")
        .optional()
        .isString()
        .withMessage("Name must be a string"),
    body("UserName")
        .optional()
        .isString()
        .withMessage("UserName must be a string"),
    body("Password")
        .optional()
        .isString()
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters"),
    body("PhoneNumber")
        .optional()
        .isFloat()
        .withMessage("PhoneNumber must be a number")
];
