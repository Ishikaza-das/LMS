import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useGetCourseLesson from "@/hooks/useGetCourseLesson";
// import { setSingleCourseLesson } from "@/store/lessonSlice";
import axios from "axios";
import React, { useState } from "react";
// import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import LessonTitle from "./LessonTitle";

const LessonAdd = () => {
  const params = useParams();
  const courseId = params.id;
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   return () => {
  //     dispatch(setSingleCourseLesson([]));
  //   };
  // }, [dispatch]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  useGetCourseLesson(courseId, refresh);

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
      <div className="max-w-7xl mx-auto mt-6 px-1 xl:px-0">
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
        
        <LessonTitle courseId={courseId} refresh={refresh}/>
      </div>
    </>
  );
};

export default LessonAdd;
