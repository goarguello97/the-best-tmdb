import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { AddMovie } from "../../interfaces/movie.interface";

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
  add: {},
} as AddMovie;

export const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addFav.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(addFav.fulfilled, (state, action: PayloadAction<any>) => {
      state.add = action.payload;
    });
    builder.addCase(addFav.rejected, (state, action: PayloadAction<any>) => {
      state.error = action.payload;
    });
    builder.addCase(remFav.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(remFav.fulfilled, (state, action: PayloadAction<any>) => {
      state.add = action.payload;
    });
    builder.addCase(remFav.rejected, (state, action: PayloadAction<any>) => {
      state.error = action.payload;
    });
  },
});

export default movieSlice.reducer;
