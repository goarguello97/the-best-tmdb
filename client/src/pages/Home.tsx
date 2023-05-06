import { useEffect } from "react";
import Loader from "../commons/Loader/Loader";
import GridMovies from "../components/Grid-Movies/Grid-Movies";
import PrincipalCover from "../components/Principal-Cover/Principal-Cover";
import { getPopular } from "../features/movies/moviesSlice";
import { useAppDispatch, useAppSelector } from "../hooks/useTypedSelector";

const Home = () => {
  const { movies } = useAppSelector((state) => state.movies);
  const { search, loadingSearch, searchOK } = useAppSelector((state) => state.movies);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getPopular());
  }, [loadingSearch, searchOK]);

  return movies.movies ? (
    <div className="home">
      {searchOK ? null : <PrincipalCover />}
      <GridMovies />
    </div>
  ) : (
    <Loader />
  );
};

export default Home;
