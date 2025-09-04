import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Skeleton } from "@/components/ui/skeleton";
import useGetCourseLesson from "@/hooks/useGetCourseLesson";
import { Edit, Trash2 } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { setSingleCourseLesson } from "@/store/lessonSlice";
import { useNavigate } from "react-router-dom";

const LessonTitle = ({ courseId, refresh }) => {
  const { singleCourseLesson } = useSelector((store) => store.lesson);
  const { loadLesson, count } = useGetCourseLesson(courseId, refresh);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const deleteLesson = async (id) => {
    try {
      const response = await axios.delete(`${import.meta.env.VITE_LESSON_API}/delete/${courseId}`,{
        data: {lessonId: id},
        withCredentials: true
      });
      if(response.data.success){
        toast.success(response.data.message);
        dispatch(setSingleCourseLesson(singleCourseLesson.filter((lecture) => lecture._id != id)));
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  }
  return (
    <div className="mt-6 grid grid-cols-1 gap-y-3 w-96 xl:w-xl">
      {loadLesson
        ? [...Array(count)].map((_, index) => (
            <Skeleton key={index} className="h-12 rounded-md bg-gray-600" />
          ))
        : singleCourseLesson.map((lecture, index) => (
            <div key={index}>
              <div className="flex bg-gray-900 h-12 items-center px-4 rounded-md justify-between">
                <div className="flex font-medium text-lg space-x-1 text-white">
                  <p>{index + 1}.</p>
                  <h1>{lecture?.title}</h1>
                </div>
                <div className="flex gap-x-3">
                  <button className="cursor-pointer text-blue-400" onClick={() => navigate(`/course/${courseId}/addlectures/${lecture._id}`)}>
                    <Edit />
                  </button>
                  <button className="cursor-pointer text-red-500" onClick={() => deleteLesson(lecture._id)}>
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
