import { setAdminCourses } from '@/store/courseSlice';
import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const useGetAllAdminCourse = () => {
    const {user} = useSelector(store => store.auth);
    const dispatch = useDispatch();
  useEffect(() => {
    const fetchAllCourses = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_COURSE_API}/get/instructorcourse/${user._id}`, {
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
  },[]);
}

export default useGetAllAdminCourse;
