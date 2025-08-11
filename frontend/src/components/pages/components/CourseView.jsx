import Navbar from '@/components/shared/Navbar'
import React from 'react'
import CourseBox from './CourseBox'

const CourseView = () => {
  return (
    <div>
        <Navbar/>
        <div className='max-w-7xl mx-auto border border-gray-200 px-4 rounded-md'>
            <CourseBox/>
        </div>
    </div>
  )
}

export default CourseView
