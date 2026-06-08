import { createSlice } from "@reduxjs/toolkit";

// Safe JSON parse
const safeParse = (value) => {
  if (!value) return null; // handles null or undefined
  try {
    return JSON.parse(value);
  } catch {
    return null; // handles invalid JSON
  }
};

const initialState = {
  user: safeParse(localStorage.getItem("user")),
  token: localStorage.getItem("token") || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;

      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
