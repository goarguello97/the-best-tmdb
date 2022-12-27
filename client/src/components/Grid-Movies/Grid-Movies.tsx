import "./Grid-Movies.css";
import { useEffect } from "react";
import Carousel from "../../commons/Carousel/Carousel";
import { useAppDispatch, useAppSelector } from "../../hooks/useTypedSelector";
import { getPopular } from "../../features/movies/movieSlice";

const GridMovies = () => {
  const { movies, loading } = useAppSelector((state) => state.movies);
  
  console.log(movies);
  return (
    <div className="grid-movies">
      <Carousel category={"Peliculas recomendadas"} data={movies.movies} />
      <Carousel
        category={"Programas de tv recomendados"}
        data={movies.tvSeries}
      />
      <Carousel category={"Terror"} data={movies.categories.Horror} />
      <Carousel category={"Comedia"} data={movies.categories.Comedy} />
      <Carousel category={"Drama"} data={movies.categories.Drama} />
    </div>
  );
};

export default GridMovies;
