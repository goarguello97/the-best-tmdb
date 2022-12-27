import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const API_KEY = process.env.API_KEY;
const BASE_URL = process.env.BASE_URL;

class MoviesService {
  static async getSpecificService(search: string) {
    try {
      const movies = await axios.get(
        `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${search}&language=es-ES&page=1`
      );
      const tvSeries = await axios.get(
        `${BASE_URL}/search/tv?api_key=${API_KEY}&query=${search}&language=es-ES&page=1`
      );

      return {
        error: false,
        data: { movies: movies.data, tvSeries: tvSeries.data },
      };
    } catch ({ response }) {
      const error = response.data;
      return { error: true, data: error };
    }
  }

  static async getPopularService() {
    try {
      //Peliculas populares
      const movies = axios.get(
        `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=es-ES&page=1`
      );
      const tvSeries = axios.get(
        `${BASE_URL}/tv/popular?api_key=${API_KEY}&language=es-ES&page=1`
      );

      //Peliculas terror
      const moviesHorror = axios.get(
        `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=27&language=es-ES`
      );

      //Peliculas comedia
      const moviesComedy = axios.get(
        `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=35&language=es-ES`
      );

      //Peliculas drama
      const moviesDrama = axios.get(
        `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=18&language=es-ES`
      );

      const [
        moviesResult,
        tvSeriesResult,
        moviesHorrorResult,
        moviesComedyResult,
        moviesDramaResult,
      ] = await Promise.all([
        movies,
        tvSeries,
        moviesHorror,
        moviesComedy,
        moviesDrama,
      ]);
      return {
        error: false,
        data: {
          movies: moviesResult.data.results,
          tvSeries: tvSeriesResult.data.results,
          categories: {
            Horror: moviesHorrorResult.data.results,
            Drama: moviesDramaResult.data.results,
            Comedy: moviesComedyResult.data.results,
          },
        },
      };
    } catch (error) {
      return { error: true, data: error };
    }
  }

  static async getOneService(id: string) {
    try {
      const resp = await axios.get(
        `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=es-ES`
      );

      return { error: false, data: resp.data };
    } catch ({ response }) {
      const error = response.data;
      return { error: true, data: error };
    }
  }
}

export default MoviesService;
