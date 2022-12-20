import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { AuthState } from "../../interfaces/auth.interface";

export const login = createAsyncThunk("LOGIN", async (data: {}, thunkApi) => {
  try {
    const login = await axios.post(
      "http://localhost:3000/api/users/login",
      data,
      { withCredentials: true }
    );
    return login.data;
  } catch (error: any) {
    const { message } = error;
    return thunkApi.rejectWithValue(message);
  }
});

export const register = createAsyncThunk(
  "REGISTER",
  async (data: {}, thunkApi) => {
    try {
      const newUser = await axios.post(
        "http://localhost:3000/api/users/",
        data
      );
      
      return newUser.status;
    } catch (error: any) {
      const { message } = error;
      return thunkApi.rejectWithValue(message);
    }
  }
);

export const persist = createAsyncThunk("ME", async (data, thunkApi) => {
  try {
    const persist = await axios.get("http://localhost:3000/api/users/secret", {
      withCredentials: true,
    });
    return persist.data;
  } catch (error: any) {
    const { message } = error;
    return thunkApi.rejectWithValue(message);
  }
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
    builder.addCase(login.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.auth = action.payload;
    });
    builder.addCase(login.rejected, (state, action: PayloadAction<any>) => {
      state.error = action.payload;
    });
    builder.addCase(register.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(register.fulfilled, (state, action: PayloadAction<any>) => {
      state.auth = action.payload;
    });
    builder.addCase(register.rejected, (state, action: PayloadAction<any>) => {
      state.error = action.payload;
    });
    builder.addCase(persist.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(persist.fulfilled, (state, action) => {
      state.auth = action.payload;
    });
    builder.addCase(persist.rejected, (state, action: PayloadAction<any>) => {
      state.error = action.payload;
    });
  },
});

export default authSlice.reducer;
