import { useEffect } from "react";
import { CiBookmarkRemove } from "react-icons/ci";
import { BsBookmarkHeart } from "react-icons/bs";
import ReactPlayer from "react-player";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import { getOne } from "../../features/movie/movieSlice";
import { addFav, getUser, remFav } from "../../features/user/userSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/useTypedSelector";
import "./MovieDetail.css";
import { TabTitle } from "../../utils/generalFunctions";

const MovieDetail = () => {
  const { id, typeFilm } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { movie, error } = useAppSelector((state) => state.movie);
  const { userLogged, isUserLoggedIn } = useAppSelector((state) => state.auth);
  const { user, loading } = useAppSelector((state) => state.user);

  const handleAddFavorites = () => {
    dispatch(addFav(movieToFavorites)).then((data) => {
      Swal.fire({
        customClass: "swal-wide",
        title: "¡Genial!",
        text: `${data.payload.message}`,
        icon: "success",
        confirmButtonText: "X",
      });
    });
  };

  const handleRemFavorites = () => {
    Swal.fire({
      title: "¡Estás segur@?",
      icon: "warning",
      customClass: "swal-wide",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(remFav(movieToFavorites)).then((data) => {
          Swal.fire({
            customClass: "swal-wide",
            title: "¡Eliminada!",
            text: `${data.payload.message}`,
            icon: "success",
            confirmButtonText: "X",
          });
        });
      }
    });
  };

  const movieToFavorites = {
    email: userLogged.user?.email,
    movieId: movie.id,
    movieTitle: typeFilm === "movie" ? movie.title : movie.name,
    movieDate: typeFilm === "movie" ? movie.release_date : movie.first_air_date,
    movieGenre: movie.genres,
  };

  useEffect(() => {
    if (isUserLoggedIn) {
      dispatch(getUser(userLogged.user.id));
    }

    dispatch(getOne(`${typeFilm}/${id}`));
  }, [isUserLoggedIn, loading, error]);
  TabTitle(
    `${typeFilm === "movie" ? movie.title : movie.name} - The Best TMDB`
  );
  return (
    <div className="container-movie">
      <div className="movie-detail">
        <div className="cover">
          <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />
        </div>
        {movie.videos?.results[0]?.key ? (
          <div className="trailer">
            <ReactPlayer
              url={`http://www.youtube.com/watch?v=${movie.videos?.results[0]?.key}`}
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
        {isUserLoggedIn ? (
          user.favorites?.find((e) => e.movieId == movie.id) ? (
            <button
              onClick={() => {
                handleRemFavorites();
                dispatch(getUser(userLogged.user.id));
              }}
            >
              <CiBookmarkRemove />
            </button>
          ) : (
            <button
              onClick={() => {
                handleAddFavorites();
                dispatch(getUser(userLogged.user.id));
              }}
            >
              <BsBookmarkHeart />
            </button>
          )
        ) : null}
      </div>
    </div>
  );
};

export default MovieDetail;
