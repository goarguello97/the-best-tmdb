export interface Movies {
  loading: boolean;
  error: string | null;
  movies: Movie;
}

interface Movie  {
  movies: []
  tvSeries:[] 
  categories: {
    Horror: []
    Drama: []
    Comedy: []
  },
}
