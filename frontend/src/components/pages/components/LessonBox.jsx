import { PlayCircle } from "lucide-react";
import React, { useState } from "react";

const LessonBox = ({course}) => {
  const [currentVideo, setCurrentVideo] = useState(null);
  return (
    <div className="flex flex-col xl:flex-row gap-10 pt-4">
      <div className="w-full xl:w-1/2 pt-4">
        <video className="w-full md:h-[300px] lg:h-[400px] bg-amber-400">
        </video>
      </div>
      <div className="w-full xl:w-1/2 space-y-8 pt-4">
      {
        course?.lessons?.map((lecture,index) => (
          <div key={index} className="bg-gray-800 p-4 rounded-md">
            <div className="flex gap-4 cursor-pointer">
              <PlayCircle/>
              <h1>{lecture?.title}</h1>
            </div>
          </div>
        ))
      } 
      </div>
    </div>
  );
};
export default LessonBox;
