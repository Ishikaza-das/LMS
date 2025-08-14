import Navbar from '@/components/shared/Navbar'
import React, { useEffect } from 'react'
import CourseBox from './CourseBox'
import LessonBox from './LessonBox'
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axios from 'axios';
import { setSingleCourse } from '@/store/courseSlice';

const CourseView = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const {singleCourse} = useSelector(store => store.course);

  useEffect( () => {
    const fetchSingleCourse = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_COURSE_API}/get/course/${params.id}`,{withCredentials: true});
        if(response.data.success){
          dispatch(setSingleCourse(response.data.course));
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchSingleCourse();
  },[params.id, dispatch]);
  return (
    <div>
        <Navbar/>
        <div className='max-w-7xl mx-auto px-4 my-2'>
            <CourseBox course={singleCourse}/>
            <LessonBox course={singleCourse}/>
        </div>
    </div>
  )
}

export default CourseView
