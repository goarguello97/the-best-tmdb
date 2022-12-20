import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { User } from "../../interfaces/user.interface";
import { UsersState } from "../../interfaces/users.interface";

export const getUsers = createAsyncThunk(
  "GET_USERS",
  async (data, thunkApi) => {
    try {
      const users = await axios.get<User[]>("http://localhost:3000/api/users/");
      return users.data;
    } catch (error: any) {
      const { message } = error;
      return thunkApi.rejectWithValue(message);
    }
  }
);

const initialState = {
  loading: false,
  error: null,
  users: [],
} as UsersState;

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUsers.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.users = action.payload;
    });
    builder.addCase(getUsers.rejected, (state, action: PayloadAction<any>) => {
      state.error = action.payload;
    });
  },
});

export default usersSlice.reducer;
