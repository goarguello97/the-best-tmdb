import "./Grid-Movies.css";
import Carousel from "../../commons/Carousel/Carousel";
import { useAppSelector } from "../../hooks/useTypedSelector";
import { useEffect } from "react";

const GridMovies = () => {
  const { movies } = useAppSelector((state) => state.movies);
  const { search, loadingSearch, searchOK } = useAppSelector((state) => state.movies);

  useEffect(() => {}, [searchOK]);

  return searchOK ? (
    <div className="grid-movies">
      {search.movies.results.length > 0 ? (
        <Carousel
          idName="recomended"
          category={"Películas"}
          data={search.movies.results}
          typeFilm={"movie"}
        />
      ) : null}
      {search.tvSeries.results.length > 0 ? (
        <Carousel
          idName="recomended"
          category={"Series"}
          data={search.tvSeries.results}
          typeFilm={"movie"}
        />
      ) : null}
    </div>
  ) : (
    <div className="grid-movies">
      <Carousel
        idName="recomended"
        category={"Peliculas recomendadas"}
        data={movies.movies}
        typeFilm={"movie"}
      />
      <Carousel
        idName="tv"
        category={"Programas de tv recomendados"}
        data={movies.tvSeries}
        typeFilm={"tvSerie"}
      />
      <Carousel
        idName="Horror"
        category={"Terror"}
        data={movies.categories.Horror}
        typeFilm={"movie"}
      />
      <Carousel
        idName="Comedy"
        category={"Comedia"}
        data={movies.categories.Comedy}
        typeFilm={"movie"}
      />
      <Carousel
        idName="Drama"
        category={"Drama"}
        data={movies.categories.Drama}
        typeFilm={"movie"}
      />
    </div>
  );
};

export default GridMovies;
