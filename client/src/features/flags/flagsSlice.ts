import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";

export const submitted = createAsyncThunk(
  "SUBMITTED",
  ( thunkApi) => {
    return !false;
  }
);

const initialState = {
  loading: false,
  error: null,
  flag: {},
};

const flagSlice = createSlice({
  name: "flag",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      submitted.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.flag = action.payload;
      }
    );
    builder.addCase(submitted.rejected, (state, action: PayloadAction<any>) => {
      state.error = action.payload;
    });
  },
});

export default flagSlice.reducer;
