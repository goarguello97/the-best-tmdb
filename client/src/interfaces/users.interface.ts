import { User } from "./user.interface";

export interface UsersState {
  loading: boolean;
  error: string | null;
  users: User[];
  message: { message: string } | null;
}

export interface UserState {
  loading: boolean;
  error: string | null;
  user: User;
  message: { message: string } | null;
}
