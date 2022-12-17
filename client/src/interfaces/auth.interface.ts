export interface AuthState {
  loading: boolean;
  error: string | null;
  auth: Auth;
}

interface Auth {
  payload: { name: string; lastname: string; email: string };
  token: string;
}
