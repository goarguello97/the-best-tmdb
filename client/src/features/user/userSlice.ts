import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { User } from "../../interfaces/user.interface";
import { UsersState } from "../../interfaces/users.interface";

export const getUsers = createAsyncThunk("GET_USERS", async () => {
  const users = await axios.get<User[]>("http://localhost:3000/api/users/");
  return users.data;
});

const initialState = {
  loading: false,
  error: null,
  users: [],
} as UsersState;

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUsers.fulfilled, (state, action: PayloadAction<any>) => {
      state.users = action.payload;
    });
  },
});

export default userSlice.reducer;
