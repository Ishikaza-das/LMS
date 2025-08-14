import { PlayCircle } from "lucide-react";
import React from "react";

const videoArray = [
  "Interduction",
  "Arrays",
  "Objects",
  "OOPs",
  "Threds",
  "Projects",
];

const LessonBox = () => {
  

  return (
  <div className="grid grid-cols-1 xl:flex xl:flex-row my-8 items-start">
    
    <div className="w-full xl:w-1/2 flex items-center">
      <div className="w-full object-fill h-[300px] bg-blue-600"></div>
    </div>

    <div className="space-y-4 mt-4 xl:mt-0 xl:mx-4 xl:w-1/2">
      {videoArray.map((lessons, index) => (
        <div
          key={index}
          className="flex items-center gap-6 cursor-pointer xl:hover:bg-gray-300 xl:p-2 xl:rounded-sm w-full"
        >
          <PlayCircle className="w-6 h-6 text-blue-600" />
          <h1 className="text-lg font-medium">{lessons}</h1>
        </div>
      ))}
    </div>
  </div>
);
};

export default LessonBox;
