import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { setAdminCourses } from "@/store/courseSlice";
import axios from "axios";
import { Delete, MoreHorizontal, Plus, View } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const CourseTable = () => {
  const { adminCourses, searchCourseByText} = useSelector((store) => store.course);
  const [filterCourse, setFilterCourse] = useState(adminCourses);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const deleteCourse = async (id) => {
    try {
      const response = await axios.delete(`${import.meta.env.VITE_COURSE_API}/delete/${id}`,{withCredentials: true});
      if(response.data.success){
        toast.success(response.data.message);
        dispatch(setAdminCourses(adminCourses.filter((course) => course._id !== id)));
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message);
    }
  }

  useEffect(() => {
    const filteredCourse = adminCourses?.length >=0 && adminCourses?.filter((courses) => {
      if(!searchCourseByText){
        return true;
      }
      return courses?.title?.toLowerCase().includes(searchCourseByText.toLowerCase());
    });
    setFilterCourse(filteredCourse);
  },[adminCourses, searchCourseByText]);
  
 return (
  <div className="w-full overflow-x-auto">
    <Table className="min-w-[600px] text-white">
      <TableCaption className="text-white">A List of Your recent courses</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="text-white">Course Name</TableHead>
          <TableHead className="text-white">Created At</TableHead>
          <TableHead className="text-white">Price</TableHead>
          <TableHead className="text-white">Status</TableHead>
          <TableHead className="text-right text-white">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filterCourse?.map((course) => (
          <TableRow key={course?._id}>
            <TableCell>{course?.title}</TableCell>
            <TableCell>{course?.createdAt.split("T")[0]}</TableCell>
            <TableCell>₹ {course?.price}</TableCell>
            <TableCell>
              {
              course?.status === "published" ?  <Badge className="bg-green-500">{course?.status.toUpperCase()}</Badge> : <Badge className="bg-red-500">{course?.status.toUpperCase()}</Badge> 
            } 
            </TableCell>
            <TableCell className="text-right">
              <Popover>
                <PopoverTrigger>
                  <MoreHorizontal />
                </PopoverTrigger>
                <PopoverContent className="w-32 bg-black text-white">
                  <div
                    className="flex items-center gap-4 w-fit cursor-pointer"
                    onClick={() => navigate(`/course/${course._id}`)}
                  >
                    <View className="text-blue-600"/>
                    <span>View</span>
                  </div>
                  <br />
                  <div
                    className="flex items-center gap-4 w-fit cursor-pointer"
                    onClick={() =>
                      navigate(`/admin/addlessonto/${course._id}`)
                    }
                  >
                    <Plus className="text-cyan-400"/>
                    <span>Add Lessons</span>
                  </div>
                  <br />
                  <div className="flex items-center gap-4 w-fit cursor-pointer" onClick={() => deleteCourse(course._id)}>
                    <Delete className="text-red-500"/>
                    <span>Delete</span>
                  </div>
                </PopoverContent>
              </Popover>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>
);

};

export default CourseTable;
