import { ErrorInterface } from "../interfaces/error.interface";
import { User } from "../interfaces/user.interface";

export const validationRegister = (values: User) => {
  let errors = {} as ErrorInterface;
  let nameRegex = new RegExp(
    /^([A-Za-zÑñÁáÉéÍíÓóÚú]+['\-]{0,1}[A-Za-zÑñÁáÉéÍíÓóÚúÜü]+)(\s+([A-Za-zÑñÁáÉéÍíÓóÚú]+['\-]{0,1}[A-Za-zÑñÁáÉéÍíÓóÚú]+))*$/
  );
  let lastnameRegex = new RegExp(
    /^([A-Za-zÑñÁáÉéÍíÓóÚú]+['\-]{0,1}[A-Za-zÑñÁáÉéÍíÓóÚúÜü]+)(\s+([A-Za-zÑñÁáÉéÍíÓóÚú]+['\-]{0,1}[A-Za-zÑñÁáÉéÍíÓóÚú]+))*$/
  );
  let emailRegex = new RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i);
  let passwordRegex = new RegExp(
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
  );
  if (!values.name) {
    errors.name = "El nombre es obligatorio.";
  } else if (values.name.length < 2) {
    errors.name = "El nombre debe tener mínimo 3 caracteres.";
  } else if (values.name.length > 30) {
    errors.name = "El nombre no puede tener más de 30 caracteres.";
  } else if (!nameRegex.test(values.name)) {
    errors.name = "El nombre solo puede poseer letras o números.";
  }

  if (!values.lastname) {
    errors.lastname = "El apellido es obligatorio.";
  } else if (values.lastname.length < 2) {
    errors.lastname = "El apellido debe tener mínimo 3 caracteres.";
  } else if (values.lastname.length > 30) {
    errors.lastname = "El apellido no puede tener más de 30 caracteres.";
  } else if (!lastnameRegex.test(values.lastname)) {
    errors.lastname = "El apellido solo puede poseer letras o números.";
  }

  if (!values.email) {
    errors.email = "El email es obligatorio.";
  } else if (!emailRegex.test(values.email)) {
    errors.email = "El email no es válido.";
  } else if (values.email.length > 50) {
    errors.email = "El email no debe poseer más de 50 caracteres.";
  }

  if (!values.password) {
    errors.password = "La contraseña es obligatoria.";
  } else if (!passwordRegex.test(values.password)) {
    errors.password =
      "La contraseña no es válida. Debe contener una mayuscula, un número y un caracter especial.";
  } else if (values.password.length < 8) {
    errors.password = "La contraseña debe tener como mínimo 8 caracteres.";
  } else if (values.password.length > 30) {
    errors.password = "La contraseña no debe poseer más de 30 caracteres.";
  } else if (values.password !== values.password2) {
    errors.password = "Las contraseñas no coinciden.";
  }

  return errors;
};

export const validationLogin = (values: User) => {
  let errors = {} as ErrorInterface;
  let emailRegex = new RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i);
  let passwordRegex = new RegExp(
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
  );

  if (!values.email) {
    errors.email = "El email es obligatorio.";
  } else if (!emailRegex.test(values.email)) {
    errors.email = "El email no es válido.";
  } else if (values.email.length > 50) {
    errors.email = "El email no debe poseer más de 50 caracteres.";
  }

  if (!values.password) {
    errors.password = "La contraseña es obligatoria.";
  } else if (!passwordRegex.test(values.password)) {
    errors.password =
      "La contraseña no es válida. Debe contener una mayuscula, un número y un caracter especial.";
  } else if (values.password.length < 8) {
    errors.password = "La contraseña debe tener como mínimo 8 caracteres.";
  } else if (values.password.length > 30) {
    errors.password = "La contraseña no debe poseer más de 30 caracteres.";
  } 

  return errors;
};
