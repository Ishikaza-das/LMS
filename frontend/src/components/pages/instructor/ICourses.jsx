import Navbar from "@/components/shared/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import React, { useEffect, useState } from "react";
import CourseTable from "./components/CourseTable";
import { useNavigate } from "react-router-dom";
import useGetAllAdminCourse from "@/hooks/useGetAllAdminCourse";
import { useDispatch, useSelector } from "react-redux";
import { setSearchCourseByText } from "@/store/courseSlice";

const ICourses = () => {
  const {user} = useSelector(store => store.auth);
  const userId = user?._id
  useGetAllAdminCourse(userId);
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setSearchCourseByText(input))
  },[input])
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto my-10">
        <div className="flex justify-between">
          <Input
            className="w-fit border border-gray-400"
            placeholder="Filter by course name"
            onChange={(e) => setInput(e.target.value)}
          />
          <Button className="bg-blue-600 hover:bg-blue-800" onClick={() => navigate("/admin/createcourses")}>
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
