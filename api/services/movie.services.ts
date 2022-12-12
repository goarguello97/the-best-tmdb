import axios from "axios";
import dotenv from "dotenv";

dotenv.config({ path: "../.env" });

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

      return { error: false, data: { movies, tvSeries } };
    } catch ({ response }) {
      const { error } = response.data;
      console.error(error);
      return { error: true, data: error };
    }
  }

  static async getPopularService() {
    try {
      const movies = await axios.get(
        `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=es-ES&page=1`
      );
      const tvSeries = await axios.get(
        `${BASE_URL}/tv/popular?api_key=${API_KEY}&language=es-ES&page=1`
      );

      return { error: false, data: { movies, tvSeries } };
    } catch ({ response }) {
      const { error } = response.data;
      console.error(error);
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
      const { error } = response.data;
      console.error(error);
      return { error: true, data: error };
    }
  }
}

export default MoviesService;
