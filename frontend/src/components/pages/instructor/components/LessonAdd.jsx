import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import axios from "axios";
import { Loader2, Plus } from "lucide-react";
import React, { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import GetLessons from "./GetLessons";
import useGetCourseLessons from "@/hooks/useGetCourseLessons";

const LessonAdd = () => {
  const fileInputRef = useRef(null);
  const [selectedVideos, setSelectedVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const params = useParams();

  const courseId = params.id;
  useGetCourseLessons(courseId);

  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const newVideoPreviews = files.map((file) => ({
      file: file,
       url: URL.createObjectURL(file),
      isPublic: false,
      name: file.name,
    }));
    setSelectedVideos((prev) => [...prev, ...newVideoPreviews]);
  };

  const togglePublic = (index) => {
    setSelectedVideos((prev) =>
      prev.map((video, i) =>
        i === index ? { ...video, isPublic: !video.isPublic } : video
      )
    );
  };

  const lectureHandler = async (e) => {
    e.preventDefault();
    if (selectedVideos.length === 0) {
      toast.error("Please select at least one video file");
      return;
    }
    const formData = new FormData();
    selectedVideos.forEach((video, index) => {
      if (!video.file) return;
      formData.append('files', video.file); 
      formData.append(`status${index}`, video.isPublic ? "public" : "private");
    });
    try {
      setLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_LESSON_API}/add/${params.id}`,
        formData,
        {
          withCredentials: true,
        }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        setSelectedVideos([]);
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast.error(error.response?.data?.message || "Failed to upload videos");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto my-4">
      <div className="my-6 border border-gray-200 rounded-2xl p-4">
        <form onSubmit={lectureHandler}>
          <div className="flex justify-between">
            <p className="text-red-500 font-medium">
              Students will see the file name as Title. The Order you add the
              order you see.
            </p>
            {loading ? (
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Loader2 className="animate-spin" />
                <span>Uploading...</span>
              </Button>
            ) : (
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                Upload
              </Button>
            )}
          </div>

          <div className="flex flex-col pt-4 gap-4">
            <Input
              type="file"
              multiple
              accept="video/*"
              onChange={handleFileChange}
              ref={fileInputRef}
              className="hidden"
            />

            <Button type="button" variant="outline" onClick={handleFileClick}>
              <Plus />
              <span className="ml-2">Add Video(s)</span>
            </Button>

            {selectedVideos.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {selectedVideos.map((video, index) => (
                  <div key={index} className="border rounded-lg p-2">
                    <video
                      controls
                      width="100%"
                      className="rounded-md"
                      src={video.url}
                    />
                    <div className="flex justify-between items-center">
                      <p className="mt-1 text-sm text-gray-700 truncate">
                        {video?.name.replace(/\.[^/.]+$/, "")}
                      </p>
                      <div className="flex items-center gap-2 pt-2">
                        <Switch
                          checked={video.isPublic}
                          onCheckedChange={() => togglePublic(index)}
                        />
                        <Label>Public</Label>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </form>
      </div>
      <GetLessons />
    </div>
  );
};

export default LessonAdd;
