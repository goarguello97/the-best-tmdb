import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import { User } from "../../interfaces/user.interface";
import { UserState } from "../../interfaces/users.interface";

export const getUser = createAsyncThunk("GET_USER", async (data:string, thunkApi) => {
  const user = await axios.get<User>(
    "http://localhost:3000/api/users/user/" + data
  );
  return user.data;
});

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
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.user = action.payload;
    });
  },
});

export default userSlice.reducer;
