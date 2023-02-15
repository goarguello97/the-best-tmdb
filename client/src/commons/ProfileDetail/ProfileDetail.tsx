import "./ProfileDetail.css";
import Accordion from "react-bootstrap/Accordion";
import ListGroup from "react-bootstrap/ListGroup";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { CiBookmarkRemove } from "react-icons/ci";
import Swal from "sweetalert2";
import { useAppDispatch, useAppSelector } from "../../hooks/useTypedSelector";
import { useEffect, useState } from "react";
import { getUser, remFav } from "../../features/user/userSlice";
import { Link } from "react-router-dom";

const ProfileDetail = () => {
  const dispatch = useAppDispatch();
  const { userLogged, isUserLoggedIn } = useAppSelector((state) => state.auth);
  const { user, loading } = useAppSelector((state) => state.user);
  const [disabled, setDisabled] = useState(true);

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
        });
      }
    });
  };

  useEffect(() => {
    if (isUserLoggedIn) {
      dispatch(getUser(userLogged.user.id));
    }
  }, [isUserLoggedIn, loading]);

  console.log(user);
  return (
    <div className="container-profile">
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
            <Form.Group className="mb-3 form-info">
              <Form.Label>Nombre</Form.Label>

              <Form.Control
                className="input"
                placeholder={`${user.name} ${user.lastname}`}
                disabled={disabled}
              />
            </Form.Group>
            <Form.Group className="mb-3 form-info">
              <Form.Label>Email</Form.Label>

              <Form.Control
                className="input"
                placeholder={`${user.email}`}
                disabled={disabled}
              />
            </Form.Group>
            <Form.Group className="mb-3 form-info">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                className="input"
                placeholder="******"
                disabled={disabled}
                type="password"
              />
            </Form.Group>
            {disabled ? (
              <Button className="btn-edit" onClick={() => setDisabled(false)}>
                Editar
              </Button>
            ) : (
              <Button className="btn-edit">Modificar</Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetail;
