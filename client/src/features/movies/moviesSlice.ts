import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Movies } from "../../interfaces/movie.interface";

export const getPopular = createAsyncThunk("GET_POP", async (_, thunkApi) => {
  try {
    const results = await axios.get("http://localhost:3000/api/movies/");
    return results.data;
  } catch (error: any) {
    const { message } = error;
    return thunkApi.rejectWithValue(message);
  }
});

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
  loadingMovie: false,
  error: null,
  movies: {},
} as Movies;

export const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPopular.pending, (state, action) => {
      state.loadingMovie = true;
    });
    builder.addCase(getPopular.fulfilled, (state, action) => {
      state.loadingMovie = false;
      state.movies = action.payload;
    });
    builder.addCase(
      getPopular.rejected,
      (state, action: PayloadAction<any>) => {
        state.error = true
      }
    );
  },
});

export default moviesSlice.reducer;
