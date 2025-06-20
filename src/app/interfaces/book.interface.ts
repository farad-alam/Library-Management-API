enum Genre {
  FICTION = "FICTION",
  NON_FICTION = "NON_FICTION",
  SCIENCE = "SCIENCE",
  HISTORY = "HISTORY",
  BIOGRAPHY = "BIOGRAPHY",
  FANTASY = "FANTASY",
}

export interface IBook {
    title : string;
    author : string;
    genre : Genre;
    isbn : string;
    description?: string;
    copies: number;
    available?: boolean;
}


// title (string) — Mandatory. The book’s title.
// author (string) — Mandatory. The book’s author.
// genre (string) — Mandatory. Must be one of: FICTION, NON_FICTION, SCIENCE, HISTORY, BIOGRAPHY, FANTASY.
// isbn (string) — Mandatory and unique. The book’s International Standard Book Number.
// description (string) — Optional. A brief summary or description of the book.
// copies (number) — Mandatory. Non-negative integer representing total copies available.
// available (boolean) — Defaults to true. Indicates if the book is currently available for borrowing.