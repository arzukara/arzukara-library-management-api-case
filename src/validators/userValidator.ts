import { NextFunction, Request, Response } from "express";
import { body, param, validationResult } from "express-validator";

export const validateCreateUser = [
    body('name')
    .notEmpty().withMessage('Username is required')
    .isString().withMessage('Username must be a string')
    .isLength({ min: 2 }).withMessage('Username must be at least 2 characters long'),

    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
]

export const validateUserIdParam = [
    param('userId')
    .isInt({ min: 1 }).withMessage('User ID must be a positive integer'),

    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
]