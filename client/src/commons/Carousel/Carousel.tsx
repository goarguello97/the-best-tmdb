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


  const carousel = document.querySelector(`.container-carousel-${idName}`
  )! as HTMLElement ;

  const next = () => {
    carousel.scrollLeft += carousel!.offsetWidth / 2;
  };

  const prev = () => {
    carousel.scrollLeft -= carousel!.offsetWidth / 2;
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

        <div className={`container-carousel-${idName}`}>
          <div className="carousel">
            {data?.map((movie: { backdrop_path: string }, i) => (
              <div
                className="movie"
                key={i}
                style={{
                  backgroundImage: `url(https://image.tmdb.org/t/p/w342${movie.backdrop_path})`,
                }}
              >                
                <div className="movie-options">
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
