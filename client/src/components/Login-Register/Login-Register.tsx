import "./Login-Register.css";
import { REGISTER_INITIAL_VALUES } from "../../constants/constants";
import { validationLogin, validationRegister } from "../../helpers/validations";
import useForm from "../../hooks/useForm";
import { login, register, setAuth } from "../../features/user/authSlice";
import { useEffect, useState } from "react";
import { afterRegister, resetForm } from "../../helpers/functions";
import { useAppDispatch, useAppSelector } from "../../hooks/useTypedSelector";

const Login = () => {
  const dispatch = useAppDispatch();
  const { auth } = useAppSelector((state) => state.auth);
  const [loginCheck, setLoginCheck] = useState(true);
  const [registerCheck, setRegisterCheck] = useState(false);
  const submit = loginCheck ? login : register;
  const validations = loginCheck ? validationLogin : validationRegister;
  const { values, handleChange, handleSubmit, setValues, errors } = useForm(
    REGISTER_INITIAL_VALUES,
    submit,
    validations
  );

  const success = () => {
    if (auth.status === 201) {
      setTimeout(() => {
        dispatch(setAuth({}));
        window.location.reload();
      }, 5000);
    }else if(auth.status === 401 ){
      setTimeout(() => {
        dispatch(setAuth({}));
      }, 5000);
    }
  };

  useEffect(() => {
    resetForm(REGISTER_INITIAL_VALUES, setValues);
    success();
  }, [loginCheck, auth]);
  return (
    <>
      <div
        className={
          Object.keys(errors).length !== 0 && registerCheck
            ? "login-wrap2"
            : "login-wrap"
        }
      >
        <div className="login-html">
          <input
            id="tab-1"
            type="radio"
            name="tab"
            className="sign-in"
            onClick={() => {
              setLoginCheck(true);
              setRegisterCheck(false);
            }}
            defaultChecked={loginCheck}
          />
          <label htmlFor="tab-1" className="tab">
            Iniciar sesión
          </label>
          <input
            id="tab-2"
            type="radio"
            name="tab"
            className="sign-up"
            onClick={() => {
              setLoginCheck(false);
              setRegisterCheck(true);
            }}
            defaultChecked={registerCheck}
          />
          <label htmlFor="tab-2" className="tab">
            Registrarse
          </label>
          <div className="login-form">
            <form onSubmit={handleSubmit}>
              <div className="sign-in-htm">
                <div className="group">
                  <label htmlFor="email" className="label">
                    Correo electrónico
                  </label>
                  <input
                    id="user"
                    name="email"
                    onChange={handleChange}
                    type="text"
                    className="input"
                    value={values.email}
                  />
                </div>
                <div className="group">
                  <label htmlFor="pass" className="label">
                    Contraseña
                  </label>
                  <input
                    id="pass-login"
                    name="password"
                    onChange={handleChange}
                    type="password"
                    className="input"
                    data-type="password"
                    value={values.password}
                  />
                </div>
                <div className="group">
                  <input
                    type="submit"
                    className="button"
                    value="Iniciar sesión"
                  />
                </div>
                {Object.keys(errors).length !== 0
                  ? Object.values(errors).map((error: any, i) => (
                      <div key={i} className="group groupError">
                        {error}
                      </div>
                    ))
                  : null}
                {auth.status === 401 ? (
                  <div className="group groupError">{auth.message}</div>
                ) : null}
                <div className="hr"></div>
                {/* <div className="foot-lnk">
                  <a href="#forgot">¿Olvidaste tu contraseña?</a>
                </div> */}
              </div>
            </form>
            <form onSubmit={handleSubmit}>
              <div className="sign-up-htm">
                <div className="group">
                  <label htmlFor="name" className="label">
                    Nombre
                  </label>
                  <input
                    id="name"
                    name="name"
                    onChange={handleChange}
                    type="text"
                    className="input"
                    value={values.name}
                  />
                </div>
                <div className="group">
                  <label htmlFor="lastname" className="label">
                    Apellido
                  </label>
                  <input
                    id="lastname"
                    name="lastname"
                    onChange={handleChange}
                    type="text"
                    className="input"
                    value={values.lastname}
                  />
                </div>
                <div className="group">
                  <label htmlFor="pass" className="label">
                    Contraseña
                  </label>
                  <input
                    id="pass-1"
                    name="password"
                    onChange={handleChange}
                    type="password"
                    className="input"
                    data-type="password"
                    value={values.password}
                  />
                </div>
                <div className="group">
                  <label htmlFor="pass" className="label">
                    Repite tu contraseña
                  </label>
                  <input
                    id="pass-2"
                    name="password2"
                    onChange={handleChange}
                    type="password"
                    className="input"
                    data-type="password"
                    value={values.password2}
                  />
                </div>
                <div className="group">
                  <label htmlFor="pass" className="label">
                    Correo electrónico
                  </label>
                  <input
                    id="pass"
                    name="email"
                    onChange={handleChange}
                    type="text"
                    className="input"
                    value={values.email}
                  />
                </div>
                <div className="group">
                  <input type="submit" className="button" value="Registrarse" />
                </div>
                {auth.message ? (
                  <div className="group groupSuccess">{auth.message}</div>
                ) : (
                  ""
                )}
                {Object.keys(errors).length !== 0
                  ? Object.values(errors).map((error: any, i) => (
                      <div key={i} className="group groupError">
                        {error}
                      </div>
                    ))
                  : null}
                <div className="hr"></div>
                <div className="foot-lnk">
                  <label htmlFor="tab-1" className="member">¿Ya eres miembro?</label>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
