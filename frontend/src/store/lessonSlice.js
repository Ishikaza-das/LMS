import { createSlice } from "@reduxjs/toolkit";

const lessonSlice = createSlice({
    name:"lesson",
    initialState:{
        singleCourseLesson:[]
    },
    reducers:{
        setSingleCourseLesson:(state, action) => {
            state.singleCourseLesson = action.payload;
        },
        resetLessonState:(state) => {
            state.singleCourseLesson = []
        }
    }
});

export const {setSingleCourseLesson, resetLessonState} = lessonSlice.actions;
export default lessonSlice.reducer;