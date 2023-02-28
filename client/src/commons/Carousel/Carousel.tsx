import { MdOutlineNavigateNext, MdOutlineNavigateBefore } from "react-icons/md";
import { BsBookmarkHeart, BsPlayCircle } from "react-icons/bs";
import { CiBookmarkRemove } from "react-icons/ci";
import "./Carousel.css";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/useTypedSelector";
import Swal from "sweetalert2";
import { addFav, getUser, remFav } from "../../features/user/userSlice";
import { getPopular } from "../../features/movies/moviesSlice";

const Carousel = ({
  idName,
  category,
  data,
  typeFilm,
}: {
  idName: string;
  category: string | null;
  data: [];
  typeFilm: string;
}) => {
  const dispatch = useAppDispatch();
  const { userLogged, isUserLoggedIn } = useAppSelector((state) => state.auth);
  const { user } = useAppSelector((state) => state.user);

  const carousel = document.querySelector(
    `.container-carousel-${idName}`
  )! as HTMLElement;

  const next = () => {
    carousel.scrollLeft += carousel!.offsetWidth / 2;
  };

  const prev = () => {
    carousel.scrollLeft -= carousel!.offsetWidth / 2;
  };

  const handleAddFavorites = (movieToFavorites: any) => {
    dispatch(addFav(movieToFavorites)).then((data) => {
      Swal.fire({
        customClass: "swal-wide",
        title: "¡Genial!",
        text: `${data.payload.message}`,
        icon: "success",
        confirmButtonText: "X",
      });
      dispatch(getPopular());
      dispatch(getUser(userLogged.user.id));
    });
  };

  const handleRemFavorites = (movieToFavorites: {}) => {
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
          dispatch(getPopular());
          dispatch(getUser(userLogged.user.id));
        });
      }
    });
  };

  console.log(data);

  // const movieToFavorites = {
  //   email: userLogged.user?.email,
  //   movieId: movie.id,
  //   movieTitle: typeFilm === "movie" ? movie.title : movie.name,
  //   movieDate: typeFilm === "movie" ? movie.release_date : movie.first_air_date,
  //   movieGenre: movie.genres,
  //   typeFilm: typeFilm!,
  // };

  return (
    <div className="movies mobile-container">
      <div className="title">
        <h3>{category}</h3>
      </div>

      <div className="principal-container">
        <button
          role="button"
          id="left-arrow"
          className="left-arrow"
          onClick={prev}
        >
          <MdOutlineNavigateBefore />
        </button>

        <div className={`container-carousel-${idName}`}>
          <div className="carousel">
            {data?.map(
              (
                movie: {
                  backdrop_path: string;
                  id: any;
                  title: string;
                  name: string;
                  release_date: string;
                  first_air_date: string;
                  genre_ids: [];
                },
                i
              ) => (
                <div
                  className="movie"
                  key={i}
                  style={{
                    backgroundImage: `url(https://image.tmdb.org/t/p/w342${movie.backdrop_path})`,
                  }}
                >
                  <div className="movie-options">
                    <Link to={`/detail/${typeFilm}/${movie.id}`}>
                      <button>
                        <BsPlayCircle />
                      </button>
                    </Link>
                    {isUserLoggedIn ? (
                      user.favorites?.find((e) => e.movieId == movie.id) ? (
                        <button
                          onClick={() =>
                            handleRemFavorites({
                              email: userLogged.user?.email,
                              movieId: movie.id,
                              movieTitle:
                                typeFilm === "movie" ? movie.title : movie.name,
                              movieDate:
                                typeFilm === "movie"
                                  ? movie.release_date
                                  : movie.first_air_date,
                              movieGenre: movie.genre_ids,
                              typeFilm: typeFilm!,
                            })
                          }
                        >
                          <CiBookmarkRemove />
                        </button>
                      ) : (
                        <button
                          onClick={() =>
                            handleAddFavorites({
                              email: userLogged.user?.email,
                              movieId: movie.id,
                              movieTitle:
                                typeFilm === "movie" ? movie.title : movie.name,
                              movieDate:
                                typeFilm === "movie"
                                  ? movie.release_date
                                  : movie.first_air_date,
                              movieGenre: movie.genre_ids,
                              typeFilm: typeFilm!,
                            })
                          }
                        >
                          <BsBookmarkHeart />
                        </button>
                      )
                    ) : null}
                  </div>
                </div>
              )
            )}
          </div>
        </div>

        <button
          role="button"
          id="right-arrow"
          className="right-arrow"
          onClick={next}
        >
          <MdOutlineNavigateNext />
        </button>
      </div>
    </div>
  );
};

export default Carousel;
