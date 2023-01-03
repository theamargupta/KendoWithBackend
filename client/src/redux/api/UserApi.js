import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

export const getUser = createAsyncThunk(
  "user/registerUser",
  async ({ email }) => {
    try {
      const { data } = await axios.get(`/api/user/${email}`);
      return { data };
    } catch (error) {
      return { error: "email doesn't Match...!" };
    }
  }
);
export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (credentials) => {
    try {
      const {
        data: { msg },
      } = await axios.post(`/api/register`, credentials);
      toast.success(msg);
      return Promise.resolve(msg);
    } catch (error) {
      if (error.response.data.error.error) {
        toast.error(error.response.data.error.error);
      }
      return Promise.reject({ error });
    }
  }
);
