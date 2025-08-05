import { setAdminCourses } from '@/store/courseSlice';
import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';

const useGetAllAdminCourse = (userId) => {
    const dispatch = useDispatch();
  useEffect(() => {
    const fetchAllCourses = async () => {
        if(!userId) return
        try {
            const response = await axios.get(`${import.meta.env.VITE_COURSE_API}/get/instructorcourse/${userId}`, {
                withCredentials: true
            })
            if(response.data.success){
                dispatch(setAdminCourses(response.data.course))
            }
        } catch (error) {
            console.error(error);
        }
    } 
    fetchAllCourses();
  },[userId]);
}

export default useGetAllAdminCourse;
