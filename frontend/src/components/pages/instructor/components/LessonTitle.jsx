import React from "react";
import { useSelector } from "react-redux";
import { Skeleton } from "@/components/ui/skeleton";
import useGetCourseLesson from "@/hooks/useGetCourseLesson";
import { Edit, Trash2 } from "lucide-react";

const LessonTitle = ({ courseId, refresh }) => {
  const { singleCourseLesson } = useSelector((store) => store.lesson);
  const { loadLesson, count } = useGetCourseLesson(courseId, refresh);
  return (
    <div className="mt-6 grid grid-cols-1 gap-y-3 w-96 xl:w-xl overflow-scroll">
      {loadLesson
        ? [...Array(count)].map((_, index) => (
            <Skeleton key={index} className="h-12 rounded-md" />
          ))
        : singleCourseLesson.map((lecture, index) => (
            <div key={index}>
              <div className="flex bg-gray-900 h-12 items-center px-4 rounded-md justify-between">
                <div className="flex font-medium text-lg space-x-1 text-white">
                  <p>{index + 1}.</p>
                  <h1>{lecture?.title}</h1>
                </div>
                <div className="flex gap-x-3">
                  <button className="cursor-pointer text-blue-400">
                    <Edit />
                  </button>
                  <button className="cursor-pointer text-red-500">
                    <Trash2 />
                  </button>
                </div>
              </div>
            </div>
          ))}
    </div>
  );
};

export default LessonTitle;
