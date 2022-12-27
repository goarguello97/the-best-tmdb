export interface AuthState {
  error: string | null;
  auth: Auth | Status;
  user: Auth | Status;
  isUserLoggedIn: null | boolean;
  isLoading: boolean;
}

interface Auth {
  payload: { name: string; lastname: string; email: string };
  user: {};
  token: string;
  status: number;
  message: String;
  data: { message: string; status: number };
}

interface Status {
  message: string;
  status: number;
  user: {};
  data: {
    message: string;
    status: number;
  };
}
