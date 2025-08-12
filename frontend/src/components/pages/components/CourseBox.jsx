import { Button } from "@/components/ui/button";
import { setSingleCourse } from "@/store/courseSlice";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const CourseBox = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const {singleCourse} = useSelector(store => store.course);
  const {user} = useSelector(store => store.auth);
 
  useEffect( () => {
    const fetchSingleCourse = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_COURSE_API}/get/course/${params.id}`,{withCredentials: true});
        if(response.data.success){
          dispatch(setSingleCourse(response.data.course));
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchSingleCourse();
  },[params.id, dispatch]);

  return (
    <div className="flex flex-col md:flex-row p-4 gap-10 border border-gray-300 rounded-md">
      <div className="w-full lg:w-1/2">
        <img
          src={singleCourse?.thumbnail}
          alt=""
          className="w-full object-fill md:h-[300px] lg:h-[400px]"
        />
      </div>
      <div className="w-full md:w-1/2">
        <h1 className="text-right font-bold text-3xl lg:text-6xl text-gray-600">
          {singleCourse?.title}
        </h1>
        <h1 className="text-right font-medium text-xl text-gray-500">
          By {singleCourse?.instructor?.fullname}
        </h1>
        <p className="text-justify my-6 md:text-lg text-gray-500">
          {singleCourse?.description}
        </p>
        <div className="text-right">
          {
            user?.role === "instructor" ? <Button className="w-30 bg-blue-600 hover:bg-blue-700">Edit</Button> : <Button className="w-30 bg-blue-600 hover:bg-blue-700">Buy</Button>
          }
        </div>
      </div>
    </div>
  );
};

export default CourseBox;
