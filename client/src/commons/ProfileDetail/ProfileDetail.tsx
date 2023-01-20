import "./ProfileDetail.css";
import Accordion from "react-bootstrap/Accordion";
import ListGroup from "react-bootstrap/ListGroup";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useAppDispatch, useAppSelector } from "../../hooks/useTypedSelector";
import { useEffect, useState } from "react";
import { getUser } from "../../features/user/userSlice";
import { Link } from "react-router-dom";

const ProfileDetail = () => {
  const dispatch = useAppDispatch();
  const { userLogged, isUserLoggedIn } = useAppSelector((state) => state.auth);
  const { user } = useAppSelector((state) => state.user);
  const [edit, setEdit] = useState(true);

  useEffect(() => {
    if (isUserLoggedIn) {
      dispatch(getUser(userLogged.user.id));
    }
  }, [isUserLoggedIn]);

  console.log(user);
  return (
    <div className="container-profile">
      <div className="profile-detail">
        <h2 className="name">{`${user.name} ${user.lastname}`}</h2>
        <div className="list">
          <Accordion className="accordion" defaultActiveKey="0">
            <Accordion.Item eventKey="0">
              <Accordion.Header>Mis favoritos</Accordion.Header>
              <Accordion.Body>
                <ListGroup variant="flush">
                  {user.favorites?.map((movie, i) => (
                    <Link to={`/detail/${movie.typeFilm}/${movie.movieId}`}>
                      <ListGroup.Item key={i}>
                        {movie.movieTitle}
                      </ListGroup.Item>
                    </Link>
                  ))}
                </ListGroup>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
          <div className="info">
            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>

              <Form.Control className="input"
                placeholder={`${user.name} ${user.lastname}`}
                disabled={edit}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>

              <Form.Control className="input" placeholder={`${user.email}`} disabled={edit} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control className="input"
                placeholder="******"
                disabled={edit}
                type="password"
              />
            </Form.Group>
            <Button className="btn-edit" onClick={() => setEdit(false)}>Editar</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetail;
