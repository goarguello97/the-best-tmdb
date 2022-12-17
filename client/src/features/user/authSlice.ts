import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { AuthState } from "../../interfaces/auth.interface";

export const login = createAsyncThunk("LOGIN", async (data: {}, thunkApi) => {
  const login = await axios.post("http://localhost:3000/api/users/login", data);
  return login.data;
});

const initialState = {
  loading: false,
  error: null,
  auth: {},
} as AuthState;

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.auth = action.payload;
    });
  },
});

export default authSlice.reducer;
