import { createSlice } from "@reduxjs/toolkit";

const courseSlice = createSlice({
    name:"course",
    initialState:{
        adminCourses:[],
        searchCourseByText:""
    },
    reducers:{
        setAdminCourses:(state, action) => {
            state.adminCourses = action.payload;
        },
        setSearchCourseByText:(state, action) => {
            state.searchCourseByText = action.payload;
        },
        resetCourseState:(state) => {
            state.adminCourses = [];
            state.searchCourseByText = "";
        }
    }
});

export const {setAdminCourses, setSearchCourseByText, resetCourseState} = courseSlice.actions;
export default courseSlice.reducer;