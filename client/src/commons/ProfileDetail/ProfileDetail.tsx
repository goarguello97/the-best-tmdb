import "./ProfileDetail.css";
import Accordion from "react-bootstrap/Accordion";
import ListGroup from "react-bootstrap/ListGroup";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { CiBookmarkRemove } from "react-icons/ci";
import Swal from "sweetalert2";
import { useAppDispatch, useAppSelector } from "../../hooks/useTypedSelector";
import React from "react";
import { useEffect, useState } from "react";
import { getUser, remFav, updateUser } from "../../features/user/userSlice";
import { Link } from "react-router-dom";
import useForm from "../../hooks/useForm";
import { validationUpdate } from "../../helpers/validations";

const ProfileDetail = () => {
  const dispatch = useAppDispatch();

  const { userLogged, isUserLoggedIn, isLoading } = useAppSelector(
    (state) => state.auth
  );
  const initialUpdateValues = useAppSelector((state) => state.user.user);

  const { user, loading, flag, dataOk, message } = useAppSelector(
    (state) => state.user
  );

  //Flag para habilitar el formulario de edición
  const [disabled, setDisabled] = useState(true);

  const { values, handleChange, handleSubmit, errors } = useForm(
    { ...initialUpdateValues, password: "" },
    updateUser,
    validationUpdate,
    dataOk
  );

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
          dispatch(getUser(userLogged.user.id));
        });
      }
    });
  };

  const handle = (e: any) => {
    handleSubmit(e);
    if (message && !loading) {
      dispatch(getUser(userLogged.user.id));
    }
  };

  useEffect(() => {
    if (isUserLoggedIn && !flag) {
      dispatch(getUser(userLogged.user.id));
    }
    if (message && !loading) {
      dispatch(getUser(userLogged.user.id));
      setDisabled(true);
    }
  }, [isLoading, loading, message, user]);

  return (
    <div className="container-profile">
      {isUserLoggedIn ? (
        <div className="profile-detail">
          <h2 className="name">{`${user.name} ${user.lastname}`}</h2>
          <hr />
          <div className="list">
            <Accordion className="accordion" defaultActiveKey="0">
              <Accordion.Item eventKey="0">
                <Accordion.Header>Mis favoritos</Accordion.Header>
                <Accordion.Body>
                  <ListGroup variant="flush">
                    {user.favorites?.map((movie, i) => (
                      <>
                        <div className="item">
                          <Link
                            key={i}
                            to={`/detail/${movie.typeFilm}/${movie.movieId}`}
                          >
                            <ListGroup.Item>
                              <h3>{movie.movieTitle}</h3>
                            </ListGroup.Item>
                          </Link>
                          <button>
                            <CiBookmarkRemove
                              onClick={() => {
                                handleRemFavorites({
                                  email: user.email,
                                  movieId: movie.movieId,
                                  movieTitle: movie.movieTitle,
                                  movieDate: movie.movieDate,
                                  movieGenre: movie.movieGenre,
                                  typeFilm: movie.typeFilm,
                                });
                                dispatch(getUser(userLogged.user.id));
                              }}
                            />
                          </button>
                        </div>
                        <hr className="hr" />
                      </>
                    ))}
                  </ListGroup>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
            <div className="info">
              {disabled ? (
                <>
                  <ul>
                    <li>Email: {user.email}</li>
                  </ul>
                  <Button
                    className="btn-edit"
                    onClick={() => setDisabled(false)}
                  >
                    Editar datos
                  </Button>
                </>
              ) : (
                <Form onSubmit={handle}>
                  <Form.Group className="mb-3 form-info">
                    <Form.Label>Nombre</Form.Label>

                    <Form.Control
                      className="input"
                      placeholder={user.name}
                      name="name"
                      onChange={handleChange}
                      value={values.name}
                      disabled={disabled}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3 form-info">
                    <Form.Label>Apellido</Form.Label>

                    <Form.Control
                      className="input"
                      placeholder={user.lastname}
                      name="lastname"
                      value={values.lastname}
                      onChange={handleChange}
                      disabled={disabled}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3 form-info">
                    <Form.Label>Email</Form.Label>

                    <Form.Control
                      className="input"
                      placeholder={user.email}
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      disabled={disabled}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3 form-info">
                    <Form.Label>Nueva contraseña(Opcional)</Form.Label>
                    <Form.Control
                      className="input"
                      name="password"
                      onChange={handleChange}
                      value={values.password}
                      placeholder="******"
                      disabled={disabled}
                      type="password"
                    />
                  </Form.Group>
                  <Button className="btn-edit" type="submit">
                    Modificar
                  </Button>
                </Form>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div>Cargando...</div>
      )}
    </div>
  );
};

export default ProfileDetail;
