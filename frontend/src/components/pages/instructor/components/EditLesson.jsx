import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import React from "react";

const EditLesson = ({ open, setOpen }) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[500px] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            Update Course
          </DialogTitle>
        </DialogHeader>
        
      </DialogContent>
    </Dialog>
  );
};

export default EditLesson;