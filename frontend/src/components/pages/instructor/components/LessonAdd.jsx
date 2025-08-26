import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import useGetCourseLesson from "@/hooks/useGetCourseLesson";
import { setSingleCourseLesson } from "@/store/lessonSlice";
import axios from "axios";
import { Edit, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const LessonAdd = () => {
  const params = useParams();
  const courseId = params.id;
  const dispatch = useDispatch();
  const { singleCourseLesson } = useSelector((store) => store.lesson);
  useEffect(() => {
    return () => {
      dispatch(setSingleCourseLesson([]));
    };
  }, [dispatch]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const { loadLesson, count} = useGetCourseLesson(courseId, refresh);

  const addLesson = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_LESSON_API}/post/${courseId}`,
        { title },
        { withCredentials: true }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        setTitle("");
        setRefresh((prev) => !prev);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="max-w-7xl mx-auto mt-6 px-2 xl:px-0">
        <h1 className="text-2xl font-bold text-white">Add Lessons</h1>

        <form action="" className="mt-4" onSubmit={addLesson}>
          <div className="space-y-4 pb-4 text-white">
            <Label className="font-medium text-xl">Title</Label>
            <Input
              placeholder="eg: Introduction to abc"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          {loading ? (
            <Button
              variant="destructive"
              className="w-20 cursor-pointer"
              type="submit"
            >
              Adding..
            </Button>
          ) : (
            <Button
              variant="destructive"
              className="w-20 cursor-pointer"
              type="submit"
            >
              Add
            </Button>
          )}
        </form>

        <div className="mt-6 grid grid-cols-1 gap-y-3 w-96 xl:w-xl">
          {loadLesson ? (
            [...Array(count)].map((_,index) => (
              <Skeleton key={index} className="h-12 rounded-md" />
            ))
          ) : (
            singleCourseLesson.map((lecture, index) => (
              <div key={index}>
                <div className="flex bg-gray-900 h-12 items-center px-4 rounded-md justify-between ring ring-gray-400">
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
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default LessonAdd;
