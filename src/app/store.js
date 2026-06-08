import { configureStore } from "@reduxjs/toolkit";
import coursesReducer from "../features/courseSlice";
import authReducer from "../features/auth/authSlice";

export const store = configureStore({
  reducer: {
    courses: coursesReducer,
    auth: authReducer,
  },
});
 