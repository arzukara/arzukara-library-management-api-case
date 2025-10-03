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
    const [book, scoreStat] = await Promise.all([
      prisma.book.findUnique({
        where: { id: Number(bookId) },
        select: {
          id: true,
          name: true,
        },
      }),
      prisma.borrow.aggregate({
        where: { bookId: Number(bookId), userScore: { not: null } },
        _avg: { userScore: true },
        _count: { userScore: true },
      }),
    ]);

    if (!book) {
      const error = new Error("Book not found");
      (error as any).status = 404;
      return next(error);
    }

    const score: string | number =
      scoreStat._count.userScore === 0
        ? -1
        : (Math.round((scoreStat._avg.userScore || 0) * 100) / 100).toString();

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
