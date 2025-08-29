import Navbar from "@/components/shared/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import useGetSingleLesson from "@/hooks/useGetSingleLesson";
import axios from "axios";
import { Loader2 } from "lucide-react";
import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const AddVideo = () => {
  const fileInputRef = useRef(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const { singleLesson } = useSelector((store) => store.lesson);
  const [input, setInput] = useState({
    title: singleLesson.title,
    status: singleLesson.status,
    file: "",
  });
  const params = useParams();
  const { courseId, lessonId } = params;
  const [loading, setLoading] = useState(false);

  useGetSingleLesson(lessonId);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
    const file = e.target.files?.[0];
    if (file) {
      setSelectedVideo(file);
    }
  };

  const handelInputChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const saveVideo = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", input.title);
    formData.append("status", input.status);
    formData.append("file", input.file);
    try {
      setLoading(true);
      const response = await axios.put(
        `${
          import.meta.env.VITE_LESSON_API
        }/course/${courseId}/lesson/${lessonId}`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      if (response.data.success) {
        toast.success(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto my-8 px-4 sm:px-6 lg:px-8">
        <div className="mt-6 bg-gray-900 border border-gray-700 p-6 rounded-2xl shadow-md">
          <h1 className="text-white font-bold text-2xl">Update Lesson</h1>

          <form className="text-white space-y-6 py-8" onSubmit={saveVideo}>
            <div className="grid grid-cols-1 gap-6">
              <div className="space-y-2">
                <Label className="text-lg font-medium">Title</Label>
                <Input
                  type="text"
                  value={input.title}
                  name="title"
                  onChange={handelInputChange}
                />
              </div>

              <div className="space-x-2 flex items-center">
                <Switch
                  checked={input.status === "public"}
                  onCheckedChange={(checked) =>
                    setInput({
                      ...input,
                      status: checked ? "public" : "private",
                    })
                  }
                />
                <Label className="text-lg font-medium">Public</Label>
              </div>

              <div>
                <input
                  type="file"
                  accept="video/*"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                />
                <Button
                  type="button"
                  variant="destructive"
                  onClick={handleButtonClick}
                >
                  Upload Video
                </Button>

                {selectedVideo && (
                  <div className="mt-4 space-y-2">
                    <p className="text-sm text-gray-300">
                      Selected: {selectedVideo.name}
                    </p>
                    <video
                      src={URL.createObjectURL(selectedVideo)}
                      controls
                      className="w-full max-w-md rounded-lg border border-gray-700"
                    />
                  </div>
                )}
              </div>
              {loading ? (
                <Button className="bg-blue-500 text-xl" type="submit">
                  <Loader2 className="animate-spin" />
                  Saving...
                </Button>
              ) : (
                <Button className="bg-blue-500 text-xl" type="submit">
                  Save
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddVideo;
