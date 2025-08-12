import Navbar from '@/components/shared/Navbar'
import React from 'react'
import CourseBox from './CourseBox'
import LessonBox from './LessonBox'

const CourseView = () => {
  return (
    <div>
        <Navbar/>
        <div className='max-w-7xl mx-auto px-4 my-2'>
            <CourseBox/>
            <LessonBox/>
        </div>
    </div>
  )
}

export default CourseView
