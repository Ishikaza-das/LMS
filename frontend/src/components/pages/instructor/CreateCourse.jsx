import Navbar from "@/components/shared/Navbar";
import { Button } from "@/components/ui/button";
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
import axios from "axios";
import { Loader2, MoveLeft } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const CreateCourse = () => {
  const [input, setInput] = useState({
    file: "",
    title: "",
    description: "",
    category: "",
    level: "",
    price: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const inputHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const fileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const selectHandler = (value) => {
    setInput({ ...input, level: value });
  };

  const createCourseHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", input.title);
    formData.append("description", input.description);
    formData.append("category", input.category);
    formData.append("level", input.level);
    formData.append("price", input.price);
    formData.append("file", input.file);

    try {
      setLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_COURSE_API}/createcourse`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );
      if (response.data.success) {
        toast.success(`${response.data.message}", Now you can add lectures"`);
        const courseId = response.data.course._id;
        navigate(`/admin/addlessonto/${courseId}`);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <div className="max-w-4xl mx-auto my-8 px-4 sm:px-6 lg:px-8">
       
        <div className="flex justify-start">
          <Button
            variant="destructive"
            onClick={() => navigate("/admin/courses")}
            className="flex items-center gap-2"
          >
            <MoveLeft className="w-4 h-4" />
            <span>Back</span>
          </Button>
        </div>

       
        <div className="mt-6 bg-gray-900 border border-gray-700 p-6 rounded-2xl shadow-md">
          <form onSubmit={createCourseHandler} className="text-white space-y-6">
          
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-lg font-medium">Thumbnail</Label>
                <Input type="file" accept="image/*" onChange={fileHandler} />
              </div>

              <div className="space-y-2">
                <Label className="text-lg font-medium">Course Name</Label>
                <Input
                  type="text"
                  value={input.title}
                  name="title"
                  onChange={inputHandler}
                  placeholder="Enter course title"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label className="text-lg font-medium">Description</Label>
                <Textarea
                  value={input.description}
                  name="description"
                  onChange={inputHandler}
                  placeholder="Enter course description"
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label className="text-lg font-medium">Category</Label>
                <Input
                  type="text"
                  value={input.category}
                  name="category"
                  onChange={inputHandler}
                  placeholder="e.g. Web Development"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-lg font-medium">Level</Label>
                <Select value={input.level} onValueChange={selectHandler}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 text-white">
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advance">Advance</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-lg font-medium">Price (in Rupees)</Label>
                <Input
                  type="number"
                  value={input.price}
                  name="price"
                  onChange={inputHandler}
                  placeholder="e.g. 499"
                />
              </div>
            </div>

            <div className="flex justify-center md:justify-end">
              {loading ? (
                <Button className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 my-2 h-10">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </Button>
              ) : (
                <Button
                  className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 my-2 h-10"
                  type="submit"
                >
                  Create
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateCourse;
