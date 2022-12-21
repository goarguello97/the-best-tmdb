export interface AuthState {
  loading: boolean;
  error: string | null;
  auth: Auth | Status;
}

interface Auth {
  payload: { name: string; lastname: string; email: string };
  token: string;
  status: number;
  message: String;
  data: { message: string; status: number };
}

interface Status {
  message: string;
  status: number;
  data: {
    message: string;
    status: number;
  };
}
