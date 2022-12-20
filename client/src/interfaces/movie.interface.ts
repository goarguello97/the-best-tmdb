export interface AddMovie {
  loading: boolean;
  error: string | null;
  add: Movie;
}

interface Movie {
    movieId: string;
    movieTitle: string;
    movieDate: string;
    movieGenre: string;
}
