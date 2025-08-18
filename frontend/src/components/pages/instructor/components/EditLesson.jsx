import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import axios from "axios";
import { PlayCircle, Trash2 } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";

const EditLesson = ({ open, setOpen, course }) => {
  
  const [lessons, setLessons] = useState(course?.lessons || []);
  const [draggedItemIndex, setDraggedItemIndex] = useState(null);

  const handleDragStart = (index) => {
    setDraggedItemIndex(index);
  };

  const handleDragOver = (e) => {
    e.preventDefault(); 
  };

  const handleDrop = (index) => {
    if (draggedItemIndex === null) return;

    const updatedLessons = [...lessons];
    const [removed] = updatedLessons.splice(draggedItemIndex, 1);
    updatedLessons.splice(index, 0, removed);

    setLessons(updatedLessons);
    setDraggedItemIndex(null);
  };

  const handleDelete = async (lessonId) => {
    try {
      const response = await axios.delete(`${import.meta.env.VITE_LESSON_API}/delete/${lessonId}`,{
        withCredentials: true
      })
      if(response.data.success){
        toast.success(response.data.message);
        setLessons((prev) => prev.filter((l) => l._id !== lessonId))
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[500px] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            Update Course
          </DialogTitle>
        </DialogHeader>

        {lessons?.map((lesson, index) => (
          <div
            key={lesson._id || index}
            className={`flex items-center gap-6 xl:hover:bg-gray-300 xl:p-2 xl:rounded-sm w-full border border-gray-300 ${
              draggedItemIndex === index ? "bg-gray-200" : ""
            }`}
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragOver={handleDragOver}
            onDrop={() => handleDrop(index)}
          >
            <PlayCircle className="w-6 h-6 text-blue-600" />
            <h1 className="text-lg font-medium">{lesson?.title}</h1>
            <div className="ml-auto">
              <button className="cursor-pointer" onClick={() => handleDelete(lesson._id)}>
                <Trash2 className="w-5 h-5 text-red-500 hover:text-red-700" />
              </button>
            </div>
          </div>
        ))}
      </DialogContent>
    </Dialog>
  );
};

export default EditLesson;
