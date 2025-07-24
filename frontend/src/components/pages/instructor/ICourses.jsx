import Navbar from "@/components/shared/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import React from "react";
import CourseTable from "./components/CourseTable";

const ICourses = () => {
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto my-10">
        <div className="flex justify-between">
          <Input
            className="w-fit border border-gray-400"
            placeholder="Filter by course name"
          />
          <Button className="bg-blue-600">
            <Plus />
            Add Course
          </Button>
        </div>
      <CourseTable/>
      </div>
    </div>
  );
};

export default ICourses;
