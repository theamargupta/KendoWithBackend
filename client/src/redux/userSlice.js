import { createSlice } from "@reduxjs/toolkit";

import { registerUser } from "./api/UserApi";

const userInitialState = {
  users: {
    status: "idle",
    data: [],
    error: {},
  },
};
const userSlice = createSlice({
  name: "user",
  initialState: userInitialState,
  reducers: {
    setUser: (state, action) => {
      state.user.role = action.payload;
      state.user.organisation = action.payload;
    },
  },
  extraReducers: {
    [registerUser.pending]: (state, action) => {
      state.users = {
        status: "loading",
        data: [],
        error: {},
      };
    },
    [registerUser.fulfilled]: (state, action) => {
      state.users = {
        status: "fulfilled",
        data: action.payload,
        error: {},
      };
    },
    [registerUser.rejected]: (state, action) => {
      state.users = {
        status: "idle",
        data: [],
        error: action.payload,
      };
    },
  },
});
export const { setUser } = userSlice.actions;

export default userSlice.reducer;
