export interface User {
  id: string;
  name: string;
  lastname: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  moviesId: any;
  favorites: Favorite[];
  password: string;
  password2: string;
}

export interface Favorite {
  movieId: number;
  movieTitle: string;
  movieDate: string;
  movieGenre: MovieGenre[];
  createdAt: string;
  updatedAt: string;
  usersId: string;
}

export interface MovieGenre {
  id: number;
  name: string;
}
