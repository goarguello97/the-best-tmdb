import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import logo from "../../assets/img/TMDB.svg";
import "./Navbar.css";

const Navbar = () => {
  const [modalShow, setModalShow] = useState(false);
  const [burger, setBurger] = useState("navTrigger");
  const [mainList, setMainList] = useState("main_list");
  const [navClass, setNavClass] = useState("nav");
  const [colorScroll, setColorScroll] = useState("");
  const [colorBurger, setColorBurger] = useState("");

  const mediaButton = () => {
    if (burger === "navTrigger") {
      setBurger("navTrigger active");
      setMainList("main_list show_list");
    }
    if (burger === "navTrigger active") {
      setBurger("navTrigger");
      setMainList("main_list");
    }
  };

  const scrollFunction = () => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        setNavClass("nav affix");
        setColorScroll("affix-letters");
        setColorBurger("affix-burger");
      } else {
        setNavClass("nav");
        setColorScroll("");
        setColorBurger("");
      }
    });
  };

  useEffect(() => {
    scrollFunction();
  }, [modalShow]);

  return (
    <>
      <nav className={navClass}>
        <div className="container">
          <div className="logo">
            <Link to="/">
              <img
                src={logo}
                alt="Logo de TMDB"
                className={`logo ${colorScroll}`}
              />
            </Link>
          </div>

          <div className={mainList} id="mainListDiv">
            <ul>
              <li>
                <a href="#" className={colorScroll}>
                  Home
                </a>
              </li>
              <li>
                <a href="#" className={colorScroll}>
                  Favoritos
                </a>
              </li>
              <li>
                <a href="/profile" className={colorScroll}>
                  Perfil
                </a>
              </li>
              <li>
                <a href="#" className={colorScroll}>
                  Cerrar sesión
                </a>
              </li>
              <li>
                <Link
                  to="/login"
                  className={`${colorScroll} sign-in`}
                >
                  Iniciar sesión
                </Link>
              </li>
            </ul>
          </div>
          <div className={burger} onClick={() => mediaButton()}>
            <i className={colorBurger}></i>
            <i className={colorBurger}></i>
            <i className={colorBurger}></i>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
