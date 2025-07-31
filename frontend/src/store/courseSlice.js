import { createSlice } from "@reduxjs/toolkit";

const courseSlice = createSlice({
    name:"course",
    initialState:{
        allCourses:null,
        adminCourses:null
    },
    reducers:{
        setAllCourses:(state, action) => {
            state.allCourses = action.payload;
        },
        setAdminCourses:(state, action) => {
            state.adminCourses = action.payload;
        }
    }
});

export const {setAllCourses, setAdminCourses} = courseSlice.actions;
export default courseSlice.reducer;