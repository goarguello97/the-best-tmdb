import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../features/user/usersSlice";
import userReducer from "../features/user/userSlice";
import authSlice from "../features/user/authSlice";
import movieSlice from "../features/movies/movieSlice";
import flagsSlice from "../features/flags/flagsSlice";

const store = configureStore({
  reducer: {
    users: usersReducer,
    user: userReducer,
    auth: authSlice,
    addOrRemove: movieSlice,
    flag: flagsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
