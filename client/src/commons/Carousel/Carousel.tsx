import { BiLeftArrow, BiRightArrow } from "react-icons/bi";
import image1 from "../../assets/img/Caratulas/1.jpg";
import image2 from "../../assets/img/Caratulas/2.jpg";
import image3 from "../../assets/img/Caratulas/3.jpg";
import image4 from "../../assets/img/Caratulas/4.jpg";
import image5 from "../../assets/img/Caratulas/5.jpg";
import image6 from "../../assets/img/Caratulas/6.jpg";
import image7 from "../../assets/img/Caratulas/7.jpg";
import image8 from "../../assets/img/Caratulas/8.jpg";
import image9 from "../../assets/img/Caratulas/9.jpg";
import image10 from "../../assets/img/Caratulas/10.jpg";
import Glider from "react-glider";
import "glider-js/glider.min.css";
import "./Carousel.css";

const Carousel = ({
  category,
  data,
}: {
  category: string | null;
  data: [];
}) => {
  console.log(data);
  return (
    <div className="carousel-container">
      <h1>{category}</h1>
      <Glider
        className="glider-container"
        hasArrows
        hasDots={false}
        iconLeft={<BiLeftArrow />}
        iconRight={<BiRightArrow />}
        slidesToShow={1}
        slidesToScroll={1}
        rewind
        responsive={[
          {
            breakpoint: 775,
            settings: {
              slidesToShow: "auto",
              slidesToScroll: "auto",
              itemWidth: 250,

              duration: 0.25,
            },
          },
        ]}
      >
        {data?.map((movie: { backdrop_path: string }, i) => (
          <div className="carousel_item">
            <img
              src={`https://image.tmdb.org/t/p/w342${movie.backdrop_path}`}
              alt=""
            />
          </div>
        ))}
      </Glider>
    </div>
  );
};

export default Carousel;
