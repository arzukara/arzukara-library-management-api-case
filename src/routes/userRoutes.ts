import express from 'express';
import { borrowBook, createUser, getUser, getUsers, returnBook } from '../controllers/userControllers';
import { validateCreateUser, validateUserIdParam } from '../validators/userValidator';
import { validateBookIdParam, validateReturnBookScore } from '../validators/bookValidator';

const userRoutes = express.Router();

userRoutes.get('/', getUsers);

userRoutes.post('/', validateCreateUser, createUser);

userRoutes.get('/:userId', validateUserIdParam, getUser);

userRoutes.post('/:userId/borrow/:bookId', ...validateUserIdParam, ...validateBookIdParam, borrowBook);

userRoutes.post('/:userId/return/:bookId', ...validateUserIdParam, ...validateBookIdParam, ...validateReturnBookScore, returnBook);

export default userRoutes;