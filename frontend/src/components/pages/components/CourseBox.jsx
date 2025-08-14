import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import EditCourse from "../instructor/components/EditCourse";
import { useSelector } from "react-redux";

const CourseBox = ({course}) => {
  const {user} = useSelector(store => store.auth);
  const [open, setOpen] = useState(false);

  const edit = () => {
    setOpen(true);
  }

  return (
    <div className="flex flex-col xl:flex-row p-4 gap-10 border border-gray-300 rounded-md shadow-md shadow-gray-300">
      <div className="w-full xl:w-1/2">
        <img
          src={course?.thumbnail}
          alt=""
          className="w-full object-fill md:h-[300px] lg:h-[400px]"
        />
      </div>
      <div className="w-full xl:w-1/2">
        <h1 className="text-right font-bold text-3xl lg:text-6xl text-gray-600">
          {course?.title}
        </h1>
        <div className="flex flex-row items-center justify-end gap-4">
          <Badge className="bg-purple-500">{course?.level.toUpperCase()}</Badge>
        <h1 className="text-right font-medium text-xl text-gray-500">
          By {course?.instructor?.fullname}
        </h1>
        </div>
        <p className="text-justify my-6 md:text-lg text-gray-500">
          {course?.description}
        </p>
        <div className="text-right">
          {
            user?.role === "instructor" ? <Button className="w-30 bg-blue-600 hover:bg-blue-700 cursor-pointer" onClick={edit}>Edit</Button> : <Button className="w-30 bg-blue-600 hover:bg-blue-700 cursor-pointer">Buy</Button>
          }
        </div>
      </div>
      <EditCourse open={open} setOpen={setOpen}/>
    </div>
  );
};

export default CourseBox;
