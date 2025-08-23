import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Edit } from "lucide-react";
import React from "react";

const lectures = ["Introduction", "Setup"];

const LessonAdd = () => {
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
          {lectures.map((lecture, index) => (
            <div key={index}>
              <div className="flex bg-gray-100 h-12 items-center px-4 rounded-md justify-between">
                <div className="flex">
                  <p>{index + 1}.</p>
                  <h1>{lecture}</h1>
                </div>
                <button className="cursor-pointer"><Edit /></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default LessonAdd;
