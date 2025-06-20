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


export interface ApiResponse <T> {
  message: string;
  success: boolean;
  error ?: T;
  data ?: T;
}



// const result = successApiResponse({
//   message: "apirequest succes",
//   success: true,
//   data: { ...responseResult}
// })

// const errorResult = errorApiResponse({
//   message: "apirequest succes",
//   success: true,
//   error: { ...errorResResult}
// })