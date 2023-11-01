import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

const initialState = {
  isLoggedIn: localStorage.getItem("isLoggedIn") || false,
  role: localStorage.getItem("role") || "",
  data: localStorage.getItem("data"),
};

export const login = createAsyncThunk("/login", async (data) => {
  try {
    const res = await axios.post(`${window.apiURL}/user/login`, data);
    if (res.status === 200) {
      toast.success(res.data.message);
    }
    return (await res).data;
  } catch (error) {
    if (error.response) {
      toast.error(error.response.data.message);
    } else {
      toast.error(error.message);
    }
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      //   localStorage.setItem(
      //     "data",
      //     JSON.stringify(action?.payload?.user || "Not Set Data")
      //   );
      localStorage.setItem("data", action?.payload?.user || "Not Set Data");
      localStorage.setItem("isLoggedIn", true);
      localStorage.setItem(
        "role",
        action?.payload?.user?.usertype || "Role Not Set"
      );
      localStorage.setItem("accessToken", action?.payload?.access_token);
      state.isLoggedIn = true;
      state.data = action?.payload?.user;
      state.role = action?.payload?.user?.usertype;
    });
  },
});

export const {} = authSlice.actions;
export default authSlice.reducer;
