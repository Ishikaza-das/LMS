import { Button } from "@/components/ui/button";
import { PlayCircle } from "lucide-react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import EditLesson from "../instructor/components/EditLesson";

const LessonBox = ({ course }) => {
  const { user } = useSelector((store) => store.auth);
  const [currentVideo, setCurrentVideo] = useState(
    course?.lessons?.[0]?.videoUrl || ""
  );
  const [open, setOpen] = useState(false);

  const edit = () => {
    setOpen(true);
  };

  return (
    <div className="grid grid-cols-1 xl:flex xl:flex-row my-8 items-start">
      <div className="w-full xl:w-1/2 flex items-center">
        {currentVideo ? (
          <video
            controls
            className="w-full object-fill h-[300px]"
            src={currentVideo}
          ></video>
        ) : (
          <div className="w-full h-[300px] flex items-center justify-center bg-gray-200 text-gray-500">
            Select a lesson to play
          </div>
        )}
      </div>

      <div className="space-y-4 mt-4 xl:mt-0 xl:mx-4 xl:w-1/2">
        {course?.lessons?.map((lessons, index) => (
          <div
            key={index}
            className="flex items-center gap-6 cursor-pointer xl:hover:bg-gray-300 xl:p-2 xl:rounded-sm w-full"
            onClick={() => setCurrentVideo(lessons?.videoUrl)}
          >
            <PlayCircle className="w-6 h-6 text-blue-600" />
            <h1 className="text-lg font-medium">{lessons?.title}</h1>
          </div>
        ))}
        <div className="text-right">
          {user?.role === "instructor" ? (
            <Button
              className="w-30 bg-blue-600 hover:bg-blue-700 cursor-pointer"
              onClick={edit}
            >
              Edit
            </Button>
          ) : (
            <></>
          )}
        </div>
        <EditLesson open={open} setOpen={setOpen} course={course}/>
      </div>
    </div>
  );
};

export default LessonBox;
