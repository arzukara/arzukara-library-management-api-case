import express from 'express';
import { createBook, getBook, getBooks } from '../controllers/bookController';
import { validateBookIdParam, validateCreateBook } from '../validators/bookValidator';

const bookRoutes = express.Router();

bookRoutes.get('/', getBooks);

bookRoutes.post('/', validateCreateBook, createBook);

bookRoutes.get('/:bookId', validateBookIdParam, getBook);



export default bookRoutes;