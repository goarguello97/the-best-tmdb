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

export const searchFilm = createAsyncThunk("SEARCH", async (data, thunkApi) => {
  try {
    const results = await axios.post(
      "http://localhost:3000/api/movies/search",
      data
    );
    return results.data;
  } catch (error: any) {
    const { message } = error;
    return thunkApi.rejectWithValue(message);
  }
});

export const reset = createAsyncThunk("RESET", async (_, thunkApi) => {
  return false
});

const initialState = {
  loadingMovie: false,
  loadingSearch: false,
  searchOK: false,
  error: null,
  movies: {},
  search: {},
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
        state.error = true;
      }
    );
    builder.addCase(searchFilm.pending, (state, action) => {
      state.loadingSearch = true;
    });
    builder.addCase(searchFilm.fulfilled, (state, action) => {
      state.loadingSearch = false;
      state.searchOK = true;
      state.search = action.payload;
    });
    builder.addCase(
      searchFilm.rejected,
      (state, action: PayloadAction<any>) => {
        state.error = action.payload;
      }
    );
    builder.addCase(reset.pending, (state, action) => {
      state.loadingSearch = true;
    });
    builder.addCase(reset.fulfilled, (state, action) => {
      state.loadingSearch = false;
      state.searchOK = action.payload;
    });
  },
});

export default moviesSlice.reducer;
