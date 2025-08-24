import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useGetCourseLesson from "@/hooks/useGetCourseLesson";
import { setSingleCourseLesson } from "@/store/lessonSlice";
import { Edit, Trash2 } from "lucide-react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const LessonAdd = () => {
  const params = useParams();
  const courseId = params.id;
  const dispatch = useDispatch();
  useGetCourseLesson(courseId);
  const {singleCourseLesson} = useSelector(store => store.lesson);
  useEffect(() => {
    return () => {
      dispatch(setSingleCourseLesson([]))
    }
  },[dispatch])
  return (
    <>
      <div className="max-w-7xl mx-auto mt-6 px-2 xl:px-0">
        <h1 className="text-2xl font-bold ">Add Lessons</h1>

        <form action="" className="mt-4">
          <div className="space-y-4 pb-4">
            <Label className="font-medium text-xl">Title</Label>
            <Input placeholder="eg: Introduction to abc" />
          </div>
          <Button variant="destructive" className="w-20 cursor-pointer">Add</Button>
        </form>

        <div className="mt-6 grid grid-cols-1 gap-y-3 w-xl">
          {singleCourseLesson.map((lecture, index) => (
            <div key={index}>
              <div className="flex bg-gray-100 h-12 items-center px-4 rounded-md justify-between">
                <div className="flex font-medium text-lg space-x-1">
                  <p>{index + 1}.</p>
                  <h1>{lecture?.title}</h1>
                </div>
                <div className="flex gap-x-3">
                <button className="cursor-pointer text-blue-400"><Edit /></button>
                <button className="cursor-pointer text-red-500"><Trash2/></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default LessonAdd;
