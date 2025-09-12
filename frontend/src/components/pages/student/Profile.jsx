import Navbar from "@/components/shared/Navbar";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Pen } from "lucide-react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import EditProfile from "./components/EditProfile";

const Profile = () => {
  const { user } = useSelector((store) => store.auth);
  const [open , setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-7xl mx-auto my-6 px-4">
        <div className="p-6 bg-accent-foreground rounded-2xl shadow-lg">
          <div className="flex justify-between">
            <div className="flex items-center gap-6">
              <Avatar className="h-20 w-20 xl:h-28 xl:w-28 shadow-md">
                <AvatarImage
                  className="w-full h-full object-cover rounded-full"
                  src={user?.profilephoto || "https://github.com/shadcn.png"}
                />
              </Avatar>
              <div>
                <h1 className="font-bold text-2xl text-white">{user?.fullname}</h1>
                <p className="text-gray-300">{user?.email}</p>
              </div>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md" onClick={() => setOpen(true)}>
              <Pen />
            </Button>
          </div>
        </div>
      </div>
      <EditProfile open={open} setOpen={setOpen}/>
    </div>
  );
};

export default Profile;
