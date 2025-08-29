import { createSlice } from "@reduxjs/toolkit";

const lessonSlice = createSlice({
    name:"lesson",
    initialState:{
        singleCourseLesson:[],
        singleLesson:null
    },
    reducers:{
        setSingleCourseLesson:(state, action) => {
            state.singleCourseLesson = action.payload;
        },
        setSingleLesson:(state, action) => {
            state.singleLesson = action.payload;
        },
        resetLessonState:(state) => {
            state.singleCourseLesson = []
            state.singleLesson = null
        }
    }
});

export const {setSingleCourseLesson, setSingleLesson, resetLessonState} = lessonSlice.actions;
export default lessonSlice.reducer;