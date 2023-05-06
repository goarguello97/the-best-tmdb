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
    const { response } = error;
    return { message: response.data.message, status: response.status };
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

      return { status: newUser.status, message: newUser.data.message };
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

export const setAuth = createAsyncThunk("SET_AUTH", (data: {}, thunkApi) => {
  try {
    return data;
  } catch (error: any) {
    const { message } = error;
    return thunkApi.rejectWithValue(message);
  }
});

export const logOut = createAsyncThunk("LOG_OUT", async (_, thunkApi) => {
  try {
    const logout = await axios.post(
      "http://localhost:3000/api/users/logout",{},{withCredentials:true}
    );
    return logout;
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

const initialState = {
  error: null,
  userLogged: {},
  isUserLoggedIn: false,
  isLoading: true,
} as AuthState;

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.userLogged = action.payload;
      state.isUserLoggedIn = true;
      state.isLoading = false;
    });
    builder.addCase(login.rejected, (state, action: PayloadAction<any>) => {
      state.error = action.payload;
    });
    builder.addCase(register.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(register.fulfilled, (state, action: PayloadAction<any>) => {
      state.userLogged = action.payload;
    });
    builder.addCase(register.rejected, (state, action: PayloadAction<any>) => {
      state.error = action.payload;
    });
    builder.addCase(persist.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(persist.fulfilled, (state, action: PayloadAction<any>) => {
      state.userLogged = action.payload;
      state.isUserLoggedIn = true;
      state.isLoading = false;
    });
    builder.addCase(persist.rejected, (state, action: PayloadAction<any>) => {
      state.isLoading = false;
    });
    builder.addCase(setAuth.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(setAuth.fulfilled, (state, action: PayloadAction<any>) => {
      state.userLogged = action.payload;
    });
    builder.addCase(setAuth.rejected, (state, action: PayloadAction<any>) => {
      state.error = action.payload;
    });
    builder.addCase(logOut.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(logOut.fulfilled, (state, action) => {
      state.isUserLoggedIn = false;
    });
    builder.addCase(logOut.rejected, (state, action: PayloadAction<any>) => {
      state.error = action.payload;
    });
  },
});

export default authSlice.reducer;
