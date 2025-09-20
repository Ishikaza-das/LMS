import Navbar from "@/components/shared/Navbar";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import Courses from "./components/Courses";
import { useDispatch, useSelector } from "react-redux";
import { setSearchCourseByText } from "@/store/courseSlice";

const Course = () => {
  const {allCourses, searchCourseByText} = useSelector(store => store.course);
  const dispatch = useDispatch();
  const [filterCourse, setFilterCourse] = useState(allCourses);

  useEffect( () => {
    const filteredCourse = allCourses?.length >=0 && allCourses?.filter((c) => {
      if(!searchCourseByText){
        return true
      }
      const searchText = searchCourseByText.toLowerCase();
      return (
        c?.title?.toLowerCase().includes(searchText) ||
        c?.category?.toLowerCase().includes(searchText)
      )
    });
    setFilterCourse(filteredCourse); 
  },[allCourses,searchCourseByText])
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto my-6">
        <Input className="w-fit lg:w-96" placeholder="Search By name" onChange={(e) => dispatch(setSearchCourseByText(e.target.value))}/>
        {filterCourse.length <= 0 ? (
          <div className="mt-6 flex justify-center">
            <h1 className="font-medium text-xl">No Courses Available</h1>
          </div>
        ) : (
          <div>
            <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-3 mt-6 space-y-2">
              {filterCourse.map((course) => (
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
