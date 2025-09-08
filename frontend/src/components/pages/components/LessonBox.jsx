import React from "react";

const LessonBox = () => {
  return (
    <div className="flex flex-col xl:flex-row gap-10 pt-4">
      {" "}
      <div className="w-full xl:w-1/2">
        {" "}
        <div className="w-full md:h-[300px] lg:h-[400px] bg-amber-400"></div>{" "}
      </div>{" "}
      <div className="w-full xl:w-1/2 space-y-4 bg-purple-500 h-[400px]"> </div>{" "}
    </div>
  );
};
export default LessonBox;
