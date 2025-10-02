import { NextFunction, Request, Response } from "express";
import { UserWithBooks } from "../types/user";
import { Borrow, PastBook, PresentBook, PrismaBorrowWithBook } from "../types";
import prisma from "../db/prisma";
import { User } from "@prisma/client";

export const getUsers = async (
  req: Request,
  res: Response<User[]>,
  next: NextFunction
) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
      },
      orderBy: { name: "asc" },
    });
    res.json(users);
  } catch (error) {
    next(error);
  }
};

export const createUser = async (
  req: Request,
  res: Response<User>,
  next: NextFunction
) => {
  try {
    const { name } = req.body;
    const newUser = await prisma.user.create({
      data: { name },
    });
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};

export const getUser = async (
  req: Request,
  res: Response<UserWithBooks>,
  next: NextFunction
) => {
  const { userId } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: { id: Number(userId) },
      include: {
        // sql deki join gibiymis
        borrows: {
          include: {
            book: true,
          },
        },
      },
    });
    if (!user) {
      const error = new Error("User not found");
      (error as any).status = 404;
      return next(error);
    }
    const past: PastBook[] = user.borrows
      .filter(
        (b: PrismaBorrowWithBook) =>
          b.returnDate !== null && b.userScore !== null
      )
      .map((b: PrismaBorrowWithBook) => ({
        name: b.book.name,
        userScore: b.userScore,
      }));

    const present: PresentBook[] = user.borrows
      .filter((b: PrismaBorrowWithBook) => !b.returnDate)
      .map((b: PrismaBorrowWithBook) => ({
        name: b.book.name,
      }));
    const userWithBooks: UserWithBooks = {
      id: user.id,
      name: user.name,
      books: {
        past,
        present,
      },
    };
    res.json(userWithBooks);
  } catch (error) {
    next(error);
  }
};

export const borrowBook = async (
  req: Request,
  res: Response<Borrow>,
  next: NextFunction
) => {
  const { userId, bookId } = req.params;
  try {
    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { id: Number(userId) },
    });
    if (!user) {
      const error = new Error("User not found");
      (error as any).status = 404;
      return next(error);
    }

    // Check if book exists
    const book = await prisma.book.findUnique({
      where: { id: Number(bookId) },
    });
    if (!book) {
      const error = new Error("Book not found");
      (error as any).status = 404;
      return next(error);
    }

    // Check if the book is already borrowed
    const existingBorrow = await prisma.borrow.findFirst({
      where: {
        bookId: Number(bookId),
        returnDate: null,
      },
    });
    if (existingBorrow) {
      const error = new Error(
        `Book is already borrowed by user : ${existingBorrow.userId}`
      );
      (error as any).status = 400;
      return next(error);
    }

    // Create a new borrow record
    const newBorrow = await prisma.borrow.create({
      data: {
        userId: Number(userId),
        bookId: Number(bookId),
      },
    });
    res.status(201).json(newBorrow);
  } catch (error) {
    next(error);
  }
};
export const returnBook = async (
  req: Request,
  res: Response<Borrow>,
  next: NextFunction
) => {
  const { userId, bookId } = req.params;
  const { score } = req.body;
  try {
    // Check if the borrow record exists and belongs to the correct user
    const borrow = await prisma.borrow.findFirst({
      where: {
        userId: Number(userId),
        bookId: Number(bookId),
        returnDate: null,
      },
    });

    if (!borrow) {
      const error = new Error(
        "User don't have an active borrow record for this book."
      );
      (error as any).status = 404;
      return next(error);
    }

    // Update the borrow record with the return date
    const updatedBorrow = await prisma.borrow.update({
      where: { id: borrow.id },
      data: { returnDate: new Date(), userScore: score || null },
    });

    res.json(updatedBorrow);
  } catch (error) {
    next(error);
  }
};
