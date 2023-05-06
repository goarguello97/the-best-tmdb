import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../features/user/usersSlice";
import userReducer from "../features/user/userSlice";
import authSlice from "../features/user/authSlice";
import moviesSlice from "../features/movies/moviesSlice";
import flagsSlice from "../features/flags/flagsSlice";
import movieSlice from "../features/movie/movieSlice";

const store = configureStore({
  reducer: {
    users: usersReducer,
    user: userReducer,
    auth: authSlice,
    movie: movieSlice,
    movies: moviesSlice,
    flag: flagsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
