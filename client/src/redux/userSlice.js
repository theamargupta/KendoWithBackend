import { createSlice } from "@reduxjs/toolkit";

import { registerUser, loginUser } from "./api/UserApi";

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
      state.users.role = action.payload;
      state.users.organisation = action.payload;
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
    [loginUser.pending]: (state, action) => {
      state.users = {
        status: "loading",
        data: [],
        error: {},
      };
    },
    [loginUser.fulfilled]: (state, action) => {
      state.users = {
        status: "fulfilled",
        data: action.payload,
        error: {},
      };
    },
    [loginUser.rejected]: (state, action) => {
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
