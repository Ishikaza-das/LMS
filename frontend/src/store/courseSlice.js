import { createSlice } from "@reduxjs/toolkit";
import { steps } from "framer-motion";

const courseSlice = createSlice({
    name:"course",
    initialState:{
        adminCourses:[],
        searchCourseByText:"",
        singleCourse:null,
        allCourses:[]
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
        setAllCourses:(state,action) => {
            state.allCourses = action.payload;
        },
        resetCourseState:(state) => {
            state.adminCourses = [];
            state.searchCourseByText = "";
            state.singleCourse = null;
            steps.allCourses = []
        }
    }
});

export const {setAdminCourses, setSearchCourseByText, setSingleCourse,setAllCourses, resetCourseState} = courseSlice.actions;
export default courseSlice.reducer;