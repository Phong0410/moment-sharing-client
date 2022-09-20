import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import auth from "../utils/apis/auth";

export const login = createAsyncThunk("auth/login", async (data) => {
  const result = await auth.login(data);
  return result;
});

export const register = createAsyncThunk("auth/register", async (data) => {
  const result = await auth.register(data);

  return result;
});

const profile = JSON.parse(localStorage.getItem("profile"));

const initialState = {
  user: profile?.user,
  token: profile?.token,
  loading: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    googleLogin: (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem("profile", JSON.stringify(action?.payload));
    },
    logout: (state) => {
      state.user = undefined;
      state.token = undefined;
      localStorage.clear("profile");
    },
  },
  extraReducers: {
    [login.pending]: (state) => {
      state.loading = true;
    },
    [login.fulfilled]: (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem("profile", JSON.stringify(action?.payload));
    },
    [login.rejected]: (state) => {
      state.loading = false;
    },
    [register.pending]: (state) => {
      state.loading = true;
    },
    [register.fulfilled]: (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem("profile", JSON.stringify(action?.payload));
    },
    [register.rejected]: (state) => {
      state.loading = false;
    },
  },
});

export const { googleLogin, logout } = authSlice.actions;

export default authSlice.reducer;
