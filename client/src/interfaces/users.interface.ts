import { User } from "./user.interface";

export interface UsersState {
  loading: boolean;
  error: string | null;
  users: User[];
}

export interface UserState {
  loading: boolean;
  error: string | null;
  user: {};
}
