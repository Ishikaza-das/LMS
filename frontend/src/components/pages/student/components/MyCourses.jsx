import React from 'react'

const randomCourse = [1,2,3,4,5,6]

const MyCourses = () => {
  return (
    <div className='max-w-7xl mx-auto py-4 my-4'>
      <h1 className='font-medium text-xl'>My Course</h1>
      <div className='grid grid-cols-4 gap-5 my-5'>
        {
            randomCourse.length <=0 ? <span>No course register</span> : randomCourse.map((course , index) => (<div key={index} className='bg-blue-500 h-45'>{course}</div>) )
        }
      </div>
    </div>
  )
}

export default MyCourses