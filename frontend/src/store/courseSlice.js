import { createSlice } from "@reduxjs/toolkit";

const courseSlice = createSlice({
    name:"course",
    initialState:{
        adminCourses:[],
        searchCourseByText:"",
        singleCourse:null
    },
    reducers:{
        setAdminCourses:(state, action) => {
            state.adminCourses = action.payload;
        },
        setSearchCourseByText:(state, action) => {
            state.searchCourseByText = action.payload;
        },
        setSingleCourse:(state, action) => {
            state.singleCourse = action.payload;
        },
        resetCourseState:(state) => {
            state.adminCourses = [];
            state.searchCourseByText = "";
            state.singleCourse = null;
        }
    }
});

export const {setAdminCourses, setSearchCourseByText, setSingleCourse, resetCourseState} = courseSlice.actions;
export default courseSlice.reducer;