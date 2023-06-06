import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

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
export const loginUser = async (credentials) => {
  try {
    const { data } = await axios.post(`/api/login`, credentials);
    toast.success(data.msg);
    console.log(data)
    return data;
  } catch (error) {
    if (error.response.data.error.error) {
      toast.error(error.response.data.error.error);
    }
    return { error };
  }
};
