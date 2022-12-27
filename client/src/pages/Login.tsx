import { useAppDispatch, useAppSelector } from "../hooks/useTypedSelector";
import useForm from "../hooks/useForm";
import { LOGIN_INITIAL_VALUES } from "../constants/constants";
import { login, persist } from "../features/user/authSlice";
import { validationLogin } from "../helpers/validations";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const { isUserLoggedIn } = useAppSelector((state) => state.auth);
  const { values, handleChange, handleSubmit, errors } = useForm(
    LOGIN_INITIAL_VALUES,
    login,
    validationLogin
  );

  useEffect(() => {
    if (isUserLoggedIn) {
      navigate("/");
    }
  }, [isUserLoggedIn]);

  return (
    <div className="login-background">
      <div className="login-container">
        <div className="login-card">
          <h2>Iniciar Sesión</h2>
          <h3>Ingresa tus datos</h3>
          <form onSubmit={handleSubmit} className="login-form">
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
            {Object.keys(errors).length !== 0
              ? Object.values(errors).map((error: any, i) => (
                  <div key={i} className="login-form-error">
                    {error}
                  </div>
                ))
              : null}
            <a href="https://website.com">¿Olvidaste tu contraseña?</a>
            <button type="submit">INGRESAR</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
