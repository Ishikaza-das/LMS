import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { setSingleCourse } from "@/store/courseSlice";
import axios from "axios";
import { Loader2 } from "lucide-react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const EditCourse = ({ open, setOpen }) => {
  const {singleCourse} = useSelector(store => store.course);
  const [input, setInput] = useState({
    file: singleCourse?.thumbnail,
    title: singleCourse?.title,
    description: singleCourse?.description,
    category: singleCourse?.category,
    level: singleCourse?.level,
    price: singleCourse?.price,
  });
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const inputHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const fileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const selectHandler = (value) => {
    setInput({ ...input, level: value });
  };

  const updateCourseHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", input.file);
    formData.append("title", input.title);
    formData.append("description", input.description);
    formData.append("category", input.category);
    formData.append("level", input.level);
    formData.append("price", input.price);

    try {
      setLoading(true);
      const response = await axios.put(
        `${import.meta.env.VITE_COURSE_API}/update/${params.id}`,
        formData,
        { withCredentials: true }
      );
      if (response.data.success) {
        dispatch(setSingleCourse(response.data.course));
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
    setOpen(false)
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[500px] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            Update Course
          </DialogTitle>
        </DialogHeader>

        <form className="space-y-4" onSubmit={updateCourseHandler}>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="thumbnail" className="text-right">
              Thumbnail
            </Label>
            <Input
              accpect="image/*"
              type="file"
              className="col-span-3"
              onChange={fileHandler}
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Course Name
            </Label>
            <Input
              type="text"
              name="title"
              className="col-span-3"
              value={input.title}
              onChange={inputHandler}
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Textarea
              type="text"
              name="description"
              className="col-span-3"
              value={input.description}
              onChange={inputHandler}
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="category" className="text-right">
              Category
            </Label>
            <Input
              type="text"
              name="category"
              className="col-span-3"
              value={input.category}
              onChange={inputHandler}
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="level" className="text-right">
              Level
            </Label>
            <Select value={input.value} onChange={selectHandler}>
              <SelectTrigger className="w-full col-span-3">
                <SelectValue placeholder={singleCourse?.level} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advance">Advance</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="price" className="text-right">
              Price
            </Label>
            <Input
              name="price"
              type="number"
              className="col-span-3"
              value={input.price}
              onChange={inputHandler}
            />
          </div>
          <DialogFooter>
            {loading ? (
              <Button className="bg-blue-600 hover:bg-blue-700 my-4 h-10">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Updating...
              </Button>
            ) : (
              <Button
                className="bg-blue-600 hover:bg-blue-700  my-4 h-10"
                type="submit"
              >
                Update
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditCourse;
