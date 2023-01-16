import { MdOutlineNavigateNext, MdOutlineNavigateBefore } from "react-icons/md";
import { BsBookmarkHeart, BsPlayCircle } from "react-icons/bs";

import "./Carousel.css";

const Carousel = ({
  idName,
  category,
  data,
}: {
  idName: string;
  category: string | null;
  data: [];
}) => {
  const fila = document.querySelector(
    ".container-carousel"
  ) as HTMLElement | null;

  const next = () => {
    fila!.scrollLeft += fila!.offsetWidth / 2;
  };

  const prev = () => {
    fila!.scrollLeft -= fila!.offsetWidth / 2;
  };

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

        <div className="container-carousel">
          <div className="carousel">
            {data?.map((movie: { backdrop_path: string }, i) => (
              <div
                className="movie"
                key={i}
                style={{
                  backgroundImage: `url(https://image.tmdb.org/t/p/w342${movie.backdrop_path})`,
                }}
              >
                {/* <img
                  src={`https://image.tmdb.org/t/p/w342${movie.backdrop_path}`}
                  alt=""
                /> */}
                <div className="pelicula-options">
                  <button>
                    <BsPlayCircle />
                  </button>
                  <button>
                    <BsBookmarkHeart />
                  </button>
                </div>
              </div>
            ))}
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
