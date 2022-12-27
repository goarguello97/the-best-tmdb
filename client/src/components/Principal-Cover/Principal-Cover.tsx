import './Principal-Cover.css'
import { BsBookmarkHeart, BsPlayCircle } from 'react-icons/bs'

const PrincipalCover = () => {
  return (
    <div className="principal-cover">
        <h3>Logo</h3>
        <h1>Movie title</h1>
        <span>
          <ul>
            <li>Category</li>
          </ul>
        </span>
        <p className="description-movie">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptate
          explicabo ut nostrum quod quibusdam voluptatibus, porro cumque nemo
          hic at. Dicta ipsa eveniet numquam facere aut distinctio. Ipsa,
          nostrum officia?
        </p>
        <p className="see-more">Trama</p>
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
  )
}

export default PrincipalCover