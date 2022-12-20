export interface AuthState {
  loading: boolean;
  error: string | null;
  auth: Auth | number;
}

interface Auth {
  payload: { name: string; lastname: string; email: string };
  token: string;
  status: number;
}

interface Status {
  status: number;
}
