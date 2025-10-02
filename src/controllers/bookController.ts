import prisma from "../db/prisma";
import { NextFunction, Request, Response } from "express";
import { BookWithScore } from "../types/book";
import { Borrow, PrismaBookWithBorrows } from "../types";
import { Book } from "@prisma/client";

export const getBooks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const books = await prisma.book.findMany({
      select: {
        id: true,
        name: true,
      },
      orderBy: { name: 'asc' }
    });
    res.json(books);
  } catch (error) {
    next(error);
  }
};
export const createBook = async (
  req: Request,
  res: Response<Book>,
  next: NextFunction
) => {
  try {
    const { name } = req.body;
    const newBook = await prisma.book.create({
      data: { name },
    });
    res.status(201).json(newBook);
  } catch (error) {
    next(error);
  }
};
export const getBook = async (
  req: Request,
  res: Response<BookWithScore>,
  next: NextFunction
) => {
  const { bookId } = req.params;
  try {
    const book = await prisma.book.findUnique({
      where: { id: Number(bookId) },
      include: {
        borrows: {
          include: {
            user: true,
          },
        },
      },
    });
    if (!book) {
      const error = new Error("Book not found");
      (error as any).status = 404;
      return next(error);
    }
    const avarageScore =
      book.borrows
        .filter((b: Borrow) => b.userScore !== null)
        .reduce(
          (acc: number, b: Borrow) => acc + (b.userScore || 0),
          0
        ) /
      (book.borrows.filter((b: Borrow) => b.userScore !== null)
        .length || 1);

    // if no score return -1 as score
    const score : string | number =
      book.borrows.length === 0 ? -1 : (Math.round(avarageScore * 100) / 100).toString();

      const bookWithScore: BookWithScore = {
      id: book.id,
      name: book.name,
      score: score,
    };
    res.json(bookWithScore);
  } catch (error) {
    next(error);
  }
};