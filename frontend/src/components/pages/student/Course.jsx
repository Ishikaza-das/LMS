import Navbar from "@/components/shared/Navbar";
import { Input } from "@/components/ui/input";
import React from "react";
import Courses from "./components/Courses";
import { useSelector } from "react-redux";

const Course = () => {
  const {allCourses} = useSelector(store => store.course)
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto my-6">
        <Input className="w-fit lg:w-96" placeholder="Search By name" />
        {allCourses.length <= 0 ? (
          <div className="mt-6 flex justify-center">
            <h1 className="font-medium text-xl">No Courses Available</h1>
          </div>
        ) : (
          <div>
            <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-3 mt-6 space-y-2">
              {allCourses.map((course) => (
                <div>
                  <Courses course={course}/>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Course;
