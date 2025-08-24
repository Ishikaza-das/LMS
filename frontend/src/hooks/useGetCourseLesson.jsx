import { setSingleCourseLesson } from '@/store/lessonSlice'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetCourseLesson = (courseId) => {
  const dispatch = useDispatch()
    useEffect(() => {
        const fetchLesson = async () => {
            if(!courseId){
                dispatch(setSingleCourseLesson([]))
                return
            }
            try {
                const response = await axios.get(`${import.meta.env.VITE_LESSON_API}/course/lesson/${courseId}`,
                    {
                        withCredentials: true
                    }
                )
                if(response.data.success){
                    console.log(response.data);
                    dispatch(setSingleCourseLesson(response.data.lesson));
                }
            } catch (error) {
                console.error(error)
            }
        }
        fetchLesson();
    },[courseId, dispatch])
}

export default useGetCourseLesson
