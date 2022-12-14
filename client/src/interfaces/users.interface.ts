import { User } from "./user.interface";

export interface UsersState {
  loading: boolean;
  error: string | null;
  users: User[];
}
