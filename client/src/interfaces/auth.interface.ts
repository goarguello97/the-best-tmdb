export interface AuthState {
  error: string | null;
  auth: Auth | Status;
  userLogged: Auth | Status;
  isUserLoggedIn: null | boolean;
  isLoading: boolean;
}

interface Auth {
  payload: Payload;
  user: {
    email: string;
    lastname: string;
    name: string;
    id: string;
  };
  token: string;
  status: number;
  message: String;
  data: { message: string; status: number };
}

interface Status {
  payload: Payload;
  message: string;
  status: number;
  user: {
    email: string;
    lastname: string;
    name: string;
    id: string;
  };
  data: {
    message: string;
    status: number;
  };
}

interface Payload {
  email: string;
  lastname: string;
  name: string;
  id: string;
}
