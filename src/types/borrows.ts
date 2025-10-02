export interface Borrow {
  id: number;
  userId: number;
  bookId: number;
  userScore?: number | null;
  borrowDate: Date;
  returnDate?: Date | null;
}