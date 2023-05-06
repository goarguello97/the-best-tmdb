import { Link } from "react-router-dom";
import logo from "../../assets/img/TMDB.svg";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import useForm from "../../hooks/useForm";
import "./Navbar.css";
import { SEARCH_INITIAL_VALUES } from "../../constants/constants";
import { searchValidation } from "../../helpers/validations";
import { reset, searchFilm } from "../../features/movies/moviesSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/useTypedSelector";
import { useEffect } from "react";
import { logOut } from "../../features/user/authSlice";

const NavbarComponent = () => {
  const dispatch = useAppDispatch();
  const { isUserLoggedIn, isLoading, userLogged } = useAppSelector(
    (state) => state.auth
  );
  const { search, loadingSearch, searchOK } = useAppSelector(
    (state) => state.movies
  );
  const { values, handleChange, handleSubmit, errors } = useForm(
    SEARCH_INITIAL_VALUES,
    searchFilm,
    searchValidation,
    null
  );

  useEffect(() => {}, [searchOK]);

  return (
    <Navbar bg="transparent" expand="lg" className="nav">
      <Container>
        <Link to="/" onClick={() => dispatch(reset())}>
          <img src={logo} alt="Logo de TMDB" className="logo" />
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Form className="d-flex form-search" onSubmit={handleSubmit}>
              {searchOK ? (
                <Button
                  className="button-x"
                  onClick={() => {
                    dispatch(reset());
                    values.search = "";
                  }}
                >
                  X
                </Button>
              ) : null}
              {isUserLoggedIn ? (
                <>
                  <Form.Control
                    placeholder="Buscar"
                    className="me-2"
                    aria-label="Search"
                    name="search"
                    value={values.search}
                    onChange={handleChange}
                  />
                  <Button type="submit" className="btn btn-light">
                    <HiOutlineMagnifyingGlass />
                  </Button>
                </>
              ) : null}
            </Form>
            <Link to="/">Home</Link>
            <Link to="/profile">Perfil</Link>
            {isUserLoggedIn ? (
              <Button className="log-out" onClick={()=>dispatch(logOut())}>Log out</Button>
            ) : (
              <Link to="/login" className="sign-in">
                Iniciar sesión
              </Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
