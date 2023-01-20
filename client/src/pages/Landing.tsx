import logo from "../assets/img/TMDB.svg";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/useTypedSelector";
import { useEffect } from "react";
import { persist } from "../features/user/authSlice";
const Landing = () => {
  const { isUserLoggedIn } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(persist());
    if (isUserLoggedIn) {
      navigate("/home");
    }
  }, [isUserLoggedIn]);
  return (
    <div className="landing">
      <div className="content">
        <img src={logo} alt="Logo" className="logo-landing" />
        <div className="content-landing">
          <h3 className="title-landing">
            Tus peliculas favoritas en un solo lugar.
          </h3>
          <Link to="register" className="button-landing">
            Registrate ahora
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Landing;
