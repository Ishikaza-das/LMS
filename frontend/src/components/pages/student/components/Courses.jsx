import { Card, CardContent } from '@/components/ui/card'
import React from 'react'

const Courses = () => {
  return (
    <Card
      className="w-96 p-0 border-none bg-gray-900 text-white cursor-pointer 
      hover:shadow-[0_0_30px_rgba(255,255,255,0.6)] 
      transition-shadow duration-300 rounded-xl"
    >
      <CardContent className="p-0">
        <div className="flex flex-col">
          <div>
            <div className="bg-gray-400 h-48 rounded-t-xl"></div>
          </div>
          <div className="flex justify-between items-center p-3">
            <h1 className="font-bold text-xl">Course Name</h1>
            <p className="text-base font-medium text-gray-300">By Ritesh</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default Courses
