import { createSlice } from "@reduxjs/toolkit";

const lessonSlice = createSlice({
    name:"lesson",
    initialState:{
        courseLessons:[],
    },
    reducers:{
        setCourseLessons:(state, action) => {
            state.courseLessons = action.payload;
        }
    }
});

export const {setCourseLessons} = lessonSlice.actions;
export default lessonSlice.reducer;