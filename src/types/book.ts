export interface Book {
    id:number;
    name:string;
}

export interface BookWithScore extends Book {
    score: string | number;
}

export interface PastBook {
    name: string;
    userScore: number | null;
}

export interface PresentBook {
    name: string;
}

export interface CreateBookDto {
    name: string;
}