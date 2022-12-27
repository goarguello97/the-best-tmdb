import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { User } from "../../interfaces/user.interface";
import { UserState } from "../../interfaces/users.interface";

export const getUser = createAsyncThunk(
  "GET_USER",
  async (data: string, thunkApi) => {
    try {
      const user = await axios.get<User>(
        "http://localhost:3000/api/users/user/" + data
      );
      return user.data;
    } catch (error: any) {
      const { message } = error;
      return thunkApi.rejectWithValue(message);
    }
  }
);

export const addFav = createAsyncThunk(
  "ADD_FAV",
  async (data: {}, thunkApi) => {
    try {
      const addFav = await axios.post(
        "http://localhost:3000/api/movies/add",
        data
      );
      return addFav.data;
    } catch (error: any) {
      const { message } = error;
      return thunkApi.rejectWithValue(message);
    }
  }
);

export const remFav = createAsyncThunk(
  "REMOVE_FAV",
  async (data: {}, thunkApi) => {
    try {
      const addFav = await axios.post(
        "http://localhost:3000/api/movies/remove",
        data
      );
      return addFav.data;
    } catch (error: any) {
      const { message } = error;
      return thunkApi.rejectWithValue(message);
    }
  }
);

const initialState = {
  loading: false,
  error: null,
  user: {},
} as UserState;

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUser.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.user = action.payload;
    });
    builder.addCase(getUser.rejected, (state, action: PayloadAction<any>) => {
      state.error = action.payload;
    });
    builder.addCase(addFav.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(addFav.fulfilled, (state, action: PayloadAction<any>) => {
      state.user.Favorites = action.payload;
    });
    builder.addCase(addFav.rejected, (state, action: PayloadAction<any>) => {
      state.error = action.payload;
    });
    builder.addCase(remFav.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(remFav.fulfilled, (state, action: PayloadAction<any>) => {
      state.user.Favorites = action.payload;
    });
    builder.addCase(remFav.rejected, (state, action: PayloadAction<any>) => {
      state.error = action.payload;
    });
  },
});

export default userSlice.reducer;
