import { createSlice } from "@reduxjs/toolkit";

const lessonSlice = createSlice({
    name:"lesson",
    initialState:{
        courseLessons:[],
    },
    reducers:{
        setCourseLessons:(state, action) => {
            state.courseLessons = action.payload;
        },
        resetLessonState:(state) => {
            state.courseLessons = [];
        }
    }
});

export const {setCourseLessons, resetLessonState} = lessonSlice.actions;
export default lessonSlice.reducer;