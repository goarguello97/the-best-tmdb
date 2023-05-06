import "./Principal-Cover.css";
import Carousel from "react-bootstrap/Carousel";
import { BsBookmarkHeart, BsPlayCircle } from "react-icons/bs";
import { useAppSelector } from "../../hooks/useTypedSelector";

const PrincipalCover = () => {
  const { movies } = useAppSelector((state) => state.movies);
  console.log(movies.movies);
  return (
    <Carousel>
      {movies.movies?.map(
        (
          movie: {
            backdrop_path: string;
            id: any;
            title: string;
            overview: string;
          },
          i
        ) => (
          <Carousel.Item>
            <div
              className="principal-cover"
              style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/w500${movie.backdrop_path})`,
                backgroundRepeat: "no-repeat",
                backgroundSize:"cover",
                backgroundPosition: "center",
              }}
            >
              {/* <h3>Logo</h3> */}
              <h1>{movie.title}</h1>

              <p className="description-movie">{movie.overview}</p>
              <div className="buttons-cover">
                <button>
                  <BsPlayCircle />
                </button>
                <button>
                  <BsBookmarkHeart />
                </button>
              </div>
              <div className="buttons-cover-mobile">
                <button>
                  <BsPlayCircle />
                </button>
                <button>
                  <BsBookmarkHeart />
                </button>
              </div>
            </div>
          </Carousel.Item>
        )
      )}
    </Carousel>
  
  );
};

export default PrincipalCover;
