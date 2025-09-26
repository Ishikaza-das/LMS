import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import EditCourse from "../instructor/components/EditCourse";
import { useSelector } from "react-redux";
import axios from "axios";

const CourseBox = ({ course }) => {
  const { user } = useSelector((store) => store.auth);
  const [open, setOpen] = useState(false);

  const edit = () => {
    setOpen(true);
  };

  const handelBuyCourse = async () => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_PAYMENT_API}/create-checkout-session`,{
        courseId: course._id,
        instructorId: course.instructor._id,
        amount: course.price,
      },{withCredentials:true})

      if(response.data.url){
        window.location.href = response.data.url;
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex flex-col xl:flex-row gap-10">
      <div className="w-full xl:w-1/2">
        <img
          src={course?.thumbnail}
          alt=""
          className="w-full object-cover rounded-md md:h-[300px] lg:h-[400px]"
        />
      </div>

      <div className="w-full xl:w-1/2 bg-accent-foreground rounded-md space-y-4 p-4">
        <h1 className="font-bold text-3xl lg:text-5xl text-white">
          {course?.title}
        </h1>

        <div className="flex flex-wrap items-center gap-4">
          <h1 className="font-medium text-lg text-gray-400">
            By {course?.instructor?.fullname}
          </h1>
          <Badge className="bg-purple-500">
            {course?.level?.toUpperCase()}
          </Badge>
        </div>

        <p className="text-justify my-4 md:text-lg text-gray-300">
          {course?.description}
        </p>

        <div className="flex justify-end">
          {user?.role === "instructor" ? (
            <Button
              className="w-28 bg-blue-600 hover:bg-blue-700"
              onClick={edit}
            >
              Edit
            </Button>
          ) : (
            <Button className="w-28 bg-blue-600 hover:bg-blue-700" onClick={handelBuyCourse}>
              Buy ₹ {course?.price}
            </Button>
          )}
        </div>
      </div>

      <EditCourse open={open} setOpen={setOpen} />
    </div>
  );
};

export default CourseBox;
