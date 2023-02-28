import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Movie } from "../../interfaces/movie.interface";

export const getOne = createAsyncThunk(
  "GET_ONE",
  async (data: string, thunkApi) => {
    try {
      const result = await axios.get(
        `http://localhost:3000/api/movies/movie/${data}`
      );
      return result.data;
    } catch (error: any) {
      const { message } = error;
      return thunkApi.rejectWithValue(message);
    }
  }
);

const initialState = {
  loadingMovie: false,
  error: false,
  movie: {},
} as Movie;

export const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getOne.pending, (state, action) => {
      state.loadingMovie = true;
      state.error = false;
    });
    builder.addCase(getOne.fulfilled, (state, action) => {
      state.loadingMovie = false;
      state.movie = action.payload;
    });
    builder.addCase(getOne.rejected, (state, action: PayloadAction<any>) => {
      state.error = true;
    });
  },
});

export default movieSlice.reducer;
