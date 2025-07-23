import Navbar from '@/components/shared/Navbar'
import React from 'react'
import NewCarousel from './components/NewCarousel'
import MyCourses from './components/MyCourses'

const Dashboard = () => {
  return (
    <div>
        <Navbar/>
        <NewCarousel/>
        <MyCourses/>
    </div>
  )
}

export default Dashboard
