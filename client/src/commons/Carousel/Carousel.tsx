import { MdOutlineNavigateNext, MdOutlineNavigateBefore } from "react-icons/md";
import { BsBookmarkHeart, BsPlayCircle } from "react-icons/bs";

import "./Carousel.css";
import { Link } from "react-router-dom";

const Carousel = ({
  idName,
  category,
  data,
}: {
  idName: string;
  category: string | null;
  data: [];
}) => {
  const carousel = document.querySelector(
    `.container-carousel-${idName}`
  )! as HTMLElement;

  const next = () => {
    carousel.scrollLeft += carousel!.offsetWidth / 2;
  };

  const prev = () => {
    carousel.scrollLeft -= carousel!.offsetWidth / 2;
  };

  console.log(data);
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
            {data?.map((movie: { backdrop_path: string; id: string }, i) => (
              <div
                className="movie"
                key={i}
                style={{
                  backgroundImage: `url(https://image.tmdb.org/t/p/w342${movie.backdrop_path})`,
                }}
              >
                <div className="movie-options">
                  <Link to={`/movie-detail/${movie.id}`}>
                    <button>
                      <BsPlayCircle />
                    </button>
                  </Link>
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
