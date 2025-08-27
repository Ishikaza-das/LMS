import { setSingleCourseLesson } from '@/store/lessonSlice'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

const useGetCourseLesson = (courseId, refresh) => {
  const dispatch = useDispatch()
  const [count, setCount] = useState();
  const [loadLesson, setLoadLesson] = useState(false);
    useEffect(() => {
        const fetchLesson = async () => {
            if(!courseId){
                dispatch(setSingleCourseLesson([]))
                return
            }
            try {
                setLoadLesson(true);
                const response = await axios.get(`${import.meta.env.VITE_LESSON_API}/course/lesson/${courseId}`,
                    {
                        withCredentials: true
                    }
                )
                if(response.data.success){
                    setCount(response.data.lesson.length);
                    dispatch(setSingleCourseLesson(response.data.lesson));
                }
            } catch (error) {
                console.error(error)
            }finally{
                setLoadLesson(false);
            }
        }
        fetchLesson();
    },[courseId, dispatch, refresh])
    return {loadLesson, count};
}

export default useGetCourseLesson
