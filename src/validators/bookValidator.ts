import { NextFunction, Request, Response } from "express";
import { body, param, validationResult } from "express-validator";

export const validateCreateBook = [
    body('name')
    .notEmpty().withMessage('Book name is required')
    .isString().withMessage('Book name must be a string')
    .isLength({ min: 2 }).withMessage('Book name must be at least 2 characters long'),

    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

export const validateBookIdParam = [
    param('bookId')
    .isInt({ min: 1 }).withMessage('Book ID must be a positive integer'),

    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

export const validateReturnBookScore = [
    body('score')
    .optional()
    .isInt({ min: 0, max: 10 }).withMessage('Score must be an integer between 0 and 10'),

    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];
