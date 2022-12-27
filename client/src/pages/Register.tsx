import { useAppDispatch, useAppSelector } from "../hooks/useTypedSelector";
import useForm from "../hooks/useForm";
import { REGISTER_INITIAL_VALUES } from "../constants/constants";
import { register, setAuth } from "../features/user/authSlice";
import { validationRegister } from "../helpers/validations";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { auth } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { values, handleChange, handleSubmit, errors } = useForm(
    REGISTER_INITIAL_VALUES,
    register,
    validationRegister
  );

  useEffect(() => {
    if (auth.status === 201) {
      navigate("/");
    }
  }, [dispatch]);

  console.log(auth);
  return (
    <div className="login-background">
      <div className="login-container">
        <div className="login-card">
          <h2>Iniciar Sesión</h2>
          <h3>Ingresa tus datos</h3>
          <form onSubmit={handleSubmit} className="login-form">
            <input
              type="text"
              name="name"
              placeholder="Nombre"
              onChange={handleChange}
              value={values.name}
            />
            <input
              type="text"
              name="lastname"
              placeholder="Apellido"
              onChange={handleChange}
              value={values.lastname}
            />
            <input
              type="text"
              name="email"
              placeholder="Correo electrónico"
              onChange={handleChange}
              value={values.email}
            />
            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              onChange={handleChange}
              value={values.password}
            />
            <input
              type="password"
              name="password2"
              placeholder="Repita su contraseña"
              onChange={handleChange}
              value={values.password2}
            />
            {auth.message ? (
              <div className="login-form-success">{auth.message}</div>
            ) : null}
            {Object.keys(errors).length !== 0
              ? Object.values(errors).map((error: any, i) => (
                  <div key={i} className="login-form-error">
                    {error}
                  </div>
                ))
              : null}
            <button type="submit">REGISTRARSE</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
