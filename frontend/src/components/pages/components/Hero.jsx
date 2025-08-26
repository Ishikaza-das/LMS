import React from 'react'
import { motion } from "framer-motion";
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();

  const navigation = () => {
    navigate("/account");
  }
  return (
    <div className="max-w-7xl mx-auto px-6 py-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center h-fit">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col space-y-6"
        >
          <span className="text-blue-600 text-lg font-semibold">
            Learn Anytime, Anywhere.
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-blue-400 leading-tight">
            Build skills for the future with our interactive online courses.
          </h1>
          <p className="text-white text-lg">
            Join thousands of learners and take control of your education with self-paced lessons, engaging videos, and expert instructors.
          </p>
          <div>
            <Button className="px-6 h-10 py-3 bg-blue-600 text-white rounded-xl shadow-md hover:bg-blue-700 transition" onClick={navigation}>
              Login
            </Button>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="w-full flex justify-center"
        >
          <img
            src="../../../public/lms-concept-shown-man-background-235752361.webp"
            alt="Online Courses"
            className="w-full max-w-md"
          />
        </motion.div>
      </div>
      <div className="pt-10">
      </div>
    </div>
  )
}

export default Hero
