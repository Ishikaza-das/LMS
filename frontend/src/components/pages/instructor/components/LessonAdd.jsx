import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Plus } from "lucide-react";
import React, { useRef, useState } from "react";

const LessonAdd = () => {
  const fileInputRef = useRef(null);
  const [selectedVideos, setSelectedVideos] = useState([]);

  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);

    const newVideoPreviews = newFiles.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));

    setSelectedVideos((prev) => [...prev, ...newVideoPreviews]);
  };

  return (
    <div className="max-w-7xl mx-auto my-4">
      <div className="my-6 border border-gray-200 rounded-2xl p-4">
        <form>
          <div className="flex justify-between">
            <p className="text-red-500 font-medium">
              Students will see the file name as Title
            </p>
            <Button type="submit">Upload</Button>
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
                        {video.file.name.replace(/\.[^/.]+$/, "")}
                      </p>
                      <div className="flex items-center gap-2 pt-2">
                        <Switch/>
                        <Label id="public">Public</Label>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default LessonAdd;
