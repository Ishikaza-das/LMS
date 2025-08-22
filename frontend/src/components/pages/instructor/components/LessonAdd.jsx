import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { VideoIcon } from "lucide-react";
import React from "react";

const lectures = ["Introduction","Setup"];

const LessonAdd = () => {
  return (
    <>
    <div className="max-w-7xl mx-auto mt-6">
      <h1 className="text-2xl font-bold ">Add Lessons</h1>

      <form action="" className="mt-4">
        <div className="space-y-4 pb-4">
          <Label className="font-medium text-xl">Title</Label>
          <Input placeholder="eg: Introduction to abc"/>
        </div>
        <Button variant="destructive">Add</Button>
      </form>

      <div className="mt-6">
      {
        lectures.map((lecture,index) => (
          <div key={index}>
            <div className="flex bg-gray-500">
              <p>{index+1}. </p>
              <h1>{lecture}</h1>
            </div>
          </div>
        ))
      }
    </div>

    </div>
    </>
  );
};

export default LessonAdd;
