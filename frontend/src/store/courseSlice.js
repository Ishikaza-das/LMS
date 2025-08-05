import { createSlice } from "@reduxjs/toolkit";

const courseSlice = createSlice({
    name:"course",
    initialState:{
        allCourses:null,
        adminCourses:[],
        searchCourseByText:""
    },
    reducers:{
        setAllCourses:(state, action) => {
            state.allCourses = action.payload;
        },
        setAdminCourses:(state, action) => {
            state.adminCourses = action.payload;
        },
        setSearchCourseByText:(state, action) => {
            state.searchCourseByText = action.payload;
        }
    }
});

export const {setAllCourses, setAdminCourses, setSearchCourseByText} = courseSlice.actions;
export default courseSlice.reducer;