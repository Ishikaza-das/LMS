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
import store from "@/store/store";
import { Delete, Edit2, MoreHorizontal } from "lucide-react";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const CourseTable = () => {
  const { adminCourses } = useSelector((store) => store.course);
  const [filterCourse, setFilterCourse] = useState(adminCourses);
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
            {filterCourse.map((course) => (
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
                      <div className="flex items-center gap-4 w-fit cursor-pointer">
                        <Edit2 />
                        <span>Edit</span>
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
