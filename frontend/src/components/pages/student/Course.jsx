import Navbar from "@/components/shared/Navbar";
import { Input } from "@/components/ui/input";
import React from "react";
import Courses from "./components/Courses";

const noCourses = [1,2,3,4,5,6,7,8,9];

const Course = () => {
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto my-6">
        <Input className="w-fit lg:w-96" placeholder="Search By name" />
        {noCourses.length <= 0 ? (
          <div className="animate-pulse">
            <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-3 mt-6 space-y-2">
              <Courses/>
              <Courses/>
              <Courses/>
              <Courses/>
              <Courses/>
              <Courses/>
              <Courses/>
              <Courses/>
              <Courses/>
            </div>
          </div>
        ) : (
          <div>
            <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-3 mt-6 space-y-2">
              {noCourses.map((index) => (
                <div key={index}>
                  <Courses />
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
