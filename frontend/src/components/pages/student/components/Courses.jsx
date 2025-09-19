import { Card, CardContent } from '@/components/ui/card'
import React from 'react'

const Courses = ({course}) => {
  return (
    <Card
      className="w-96 p-0 border-none bg-gray-900 text-white cursor-pointer 
      lg:hover:shadow-[0_0_30px_rgba(255,255,255,0.6)] 
      lg:transition-shadow lg:duration-300 rounded-xl"
    >
      <CardContent className="p-0">
        <div className="flex flex-col">
          <div>
            <img className="h-50 rounded-t-xl w-full object-fill" src={course?.thumbnail}/>
          </div>
          <div className="flex justify-between items-center p-3">
            <h1 className="font-bold text-xl">{course?.title}</h1>
            <p className="text-base font-medium text-gray-300">By {course?.instructor?.fullname}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default Courses
