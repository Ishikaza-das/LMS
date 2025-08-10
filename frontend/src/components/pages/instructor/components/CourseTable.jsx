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
import { Delete, MoreHorizontal, Plus, View } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CourseTable = () => {
  const { adminCourses, searchCourseByText} = useSelector((store) => store.course);
  const [filterCourse, setFilterCourse] = useState(adminCourses);
  const navigate = useNavigate();

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
    <div>
      <Table>
        <TableCaption>A List of Your recent courses</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Course Name</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Price</TableHead>
            <TableHead className="text-right">Actioon</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
            {filterCourse?.map((course) => (
              <tr>
                <TableCell>{course?.title}</TableCell>
                <TableCell>{course?.createdAt.split('T')[0]}</TableCell>
                <TableCell>₹ {course?.price}</TableCell>
                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className="w-32">
                      <div className="flex items-center gap-4 w-fit cursor-pointer" onClick={() => navigate(`/course/${course._id}`)}>
                        <View/>
                        <span>View</span>
                      </div>
                      <br />
                      <div className="flex items-center gap-4 w-fit cursor-pointer" onClick={() => navigate(`/admin/addlessonto/${course._id}`)}>
                        <Plus />
                        <span>Add Lessons</span>
                      </div>
                      <br />
                      <div className="flex items-center gap-4 w-fit cursor-pointer">
                        <Delete />
                        <span>Delete</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </tr>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CourseTable;
