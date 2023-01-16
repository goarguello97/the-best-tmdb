import "./Grid-Movies.css";
import Carousel from "../../commons/Carousel/Carousel";
import { useAppSelector } from "../../hooks/useTypedSelector";

const GridMovies = () => {
  const { movies } = useAppSelector((state) => state.movies);
  return (
    <div className="grid-movies">
      <Carousel
        idName="recomended"
        category={"Peliculas recomendadas"}
        data={movies.movies}
      />
      <Carousel
        idName="tv"
        category={"Programas de tv recomendados"}
        data={movies.tvSeries}
      />
      <Carousel
        idName="Horror"
        category={"Terror"}
        data={movies.categories.Horror}
      />
      <Carousel
        idName="Comedy"
        category={"Comedia"}
        data={movies.categories.Comedy}
      />
      <Carousel
        idName="Drama"
        category={"Drama"}
        data={movies.categories.Drama}
      />
    </div>
  );
};

export default GridMovies;
