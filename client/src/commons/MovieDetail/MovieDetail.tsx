import { useEffect } from "react";
import { BsBookmarkHeart } from "react-icons/bs";
import { CiBookmarkRemove } from "react-icons/ci";
import ReactPlayer from "react-player";
import { useNavigate, useParams } from "react-router-dom";
import { getOne } from "../../features/movie/movieSlice";
import { persist } from "../../features/user/authSlice";
import { addFav, remFav } from "../../features/user/userSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/useTypedSelector";
import "./MovieDetail.css";

const MovieDetail = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { movie, loading, error } = useAppSelector((state) => state.movie);
  const { auth, user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(persist());
    if (loading) {
      if (error) {
        navigate("/home");
      }
    }
    dispatch(getOne(id!));
  }, [error]);
  const movieToFavorites = {
    email: user.user?.email,
    movieId: movie.id,
    movieTitle: movie.title,
    movieDate: movie.release_date,
    movieGenre: movie.genres,
  };
  console.log(user, auth, movieToFavorites);

  return (
    <div className="container-movie">
      <div className="movie-detail">
        <div className="cover">
          <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />
        </div>
        {movie.videos?.results[0]?.key ? (
          <div className="trailer">
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${movie.videos?.results[0]?.key}`}
              width="100%"
              height="100%"
            />
          </div>
        ) : null}
      </div>
      <div className="description">
        <h2>{movie.title}</h2>
        <hr />
        <p>{movie.overview}</p>
        <button onClick={() => dispatch(addFav(movieToFavorites))}>
          <BsBookmarkHeart />
        </button>
        <button onClick={() => dispatch(remFav(movieToFavorites))}>
          <CiBookmarkRemove />
        </button>
      </div>
    </div>
  );
};

export default MovieDetail;
