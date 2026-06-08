import { createSlice } from "@reduxjs/toolkit";
import coursesData from "./data/courseData";

const courseSlice = createSlice({
  name: "courses",
  initialState: coursesData,
  reducers: {
    addCourse: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const selectAllCourses = (state) => state.courses;

export default courseSlice.reducer;
