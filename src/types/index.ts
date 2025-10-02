export * from './user';
export * from './book';
export * from './borrows';

export interface PrismaUserWithBorrows {
  id: number;
  name: string;
  borrows: PrismaBorrowWithBook[];
}

export interface PrismaBorrowWithBook {
  id: number;
  userId: number;
  bookId: number;
  userScore: number | null;
  borrowDate: Date;
  returnDate: Date | null;
  book: {
    id: number;
    name: string;
  };
}

export interface PrismaBookWithBorrows {
  id: number;
  name: string;
  borrows: {
    userScore: number | null;
    returnDate: Date | null;
  }[];
}