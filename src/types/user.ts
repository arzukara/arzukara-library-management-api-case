import { PastBook, PresentBook } from "./book";

export interface User {
  id: number;
  name: string;
}

export interface UserWithBooks extends User {
  books: {
    past: PastBook[];
    present: PresentBook[];
  };
}

export interface CreateUserDto {
  name: string;
}