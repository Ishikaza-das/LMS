import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { setSingleCourse } from "@/store/courseSlice";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import EditCourse from "../instructor/components/EditCourse";

const CourseBox = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const {singleCourse} = useSelector(store => store.course);
  const {user} = useSelector(store => store.auth);
  const [open, setOpen] = useState(false);

  const edit = () => {
    setOpen(true);
  }
 
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
    <div className="flex flex-col xl:flex-row p-4 gap-10 border border-gray-300 rounded-md shadow-md shadow-gray-300">
      <div className="w-full xl:w-1/2">
        <img
          src={singleCourse?.thumbnail}
          alt=""
          className="w-full object-fill md:h-[300px] lg:h-[400px]"
        />
      </div>
      <div className="w-full xl:w-1/2">
        <h1 className="text-right font-bold text-3xl lg:text-6xl text-gray-600">
          {singleCourse?.title}
        </h1>
        <div className="flex flex-row items-center justify-end gap-4">
          <Badge className="bg-purple-500">{singleCourse?.level.toUpperCase()}</Badge>
        <h1 className="text-right font-medium text-xl text-gray-500">
          By {singleCourse?.instructor?.fullname}
        </h1>
        </div>
        <p className="text-justify my-6 md:text-lg text-gray-500">
          {singleCourse?.description}
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
