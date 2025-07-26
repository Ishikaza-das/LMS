import Navbar from "@/components/shared/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MoveLeft, Plus } from "lucide-react";
import React from "react";

const CreateCourse = () => {
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto my-10">
        <div className="flex justify-between">
          <Button variant="outline">
            <MoveLeft />
            <span>Back</span>
          </Button>
          <Button variant="outline">
            <Plus />
            <span>Add Lecture</span>
          </Button>
        </div>
        <div className="my-6">
          <form>
            <div className="space-y-3">
              <Label className="text-xl font-medium">Course Name</Label>
              <Input />
            </div>

            <div className="space-y-3">
              <Label className="text-xl font-medium">Description</Label>
              <Textarea />
            </div>

            <div className="space-y-3">
              <Label className="text-xl font-medium">Price (in Rupess)</Label>
              <Input  />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateCourse;
