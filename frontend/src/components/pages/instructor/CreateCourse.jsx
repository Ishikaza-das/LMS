import Navbar from "@/components/shared/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { Loader2, MoveLeft, Plus } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const CreateCourse = () => {
  const [input, setInput] = useState({
    file:"",
    title:"",
    description:"",
    category:"",
    level:"",
    price:""
  })

  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();

  const inputHandler = (e) => {
    setInput({...input, [e.target.name]: e.target.value})
  };

  const fileHandler = (e) => {
    setInput({...input,file: e.target.files?.[0]})
  }

  const selectHandler = (value) => {
    setInput({...input, level: value})
  }

  const createCourseHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData()
    formData.append("title", input.title);
    formData.append("description", input.description);
    formData.append("category", input.category);
    formData.append("level", input.level);
    formData.append("price", input.price);
    formData.append("file", input.file);

    try {
      setLoading(true);
      const response = await axios.post(`${import.meta.env.VITE_COURSE_API}/createcourse`, formData,{
        headers:{
          "Content-Type":"multipart/form-data"
        }, withCredentials: true
      })
      console.log(response.data);
      if(response.data.success){
        toast.success(`${response.data.message}", Now you can add lectures"`);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message);
    } finally{
      setLoading(false);
    }
  }

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto my-10">
        <div className="flex justify-between">
          <Button variant="outline" onClick={() => navigate("/admin/courses")}>
            <MoveLeft />
            <span>Back</span>
          </Button>
          <Button variant="outline">
            <Plus />
            <span>Add Lecture</span>
          </Button>
        </div>
        <div className="my-6 border border-gray-200 p-4 rounded-2xl">
          <form onSubmit={createCourseHandler}>
            <div className="grid grid-cols-2 gap-4">
            <div className="space-y-3">
              <Label className="text-xl font-medium">Thumbnail</Label>
              <Input  type="file" accept="image/*" onChange={fileHandler}/>
            </div>

            <div className="space-y-3">
              <Label className="text-xl font-medium">Course Name</Label>
              <Input type="text" value={input.title} name="title" onChange={inputHandler}/>
            </div>

            <div className="space-y-3">
              <Label className="text-xl font-medium">Description</Label>
              <Textarea type="text" value={input.description} name="description" onChange={inputHandler}/>
            </div>

            <div className="space-y-3">
              <Label className="text-xl font-medium">Category</Label>
              <Input  type="text" value={input.category} name="category" onChange={inputHandler}/>
            </div>

            <div className="space-y-3">
              <Label className="text-xl font-medium">Level</Label>
              <Select value={input.value} onValueChange={selectHandler}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="level"/>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner" >Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advance">Advance</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label className="text-xl font-medium">Price (in Rupess)</Label>
              <Input type="number" value={input.price} name="price" onChange={inputHandler}/>
            </div>
            </div>
            <div className="text-right">
              {
                loading ?  <Button className="bg-blue-600 hover:bg-blue-700  my-4 h-10"><Loader2 className='mr-2 h-4 w-4 animate-spin'/></Button> :  <Button className="bg-blue-600 hover:bg-blue-700  my-4 h-10" type="submit">Create</Button>
              }
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateCourse;
