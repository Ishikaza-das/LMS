import { setSingleLesson } from '@/store/lessonSlice';
import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetSingleLesson = (lessonId) => {
  const dispatch = useDispatch();
    useEffect( () => {
        const fetchLesson = async () => {
            try {
             const response = await axios.get(`${import.meta.env.VITE_LESSON_API}/course/get/lesson/${lessonId}`,{withCredentials:true});
            if(response.data.success){
                dispatch(setSingleLesson(response.data.singleLesson))
            }   
            } catch (error) {
               console.error(error); 
            }
        }
        fetchLesson();
    },[lessonId,dispatch]);
}

export default useGetSingleLesson
