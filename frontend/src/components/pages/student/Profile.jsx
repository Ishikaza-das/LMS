import Navbar from "@/components/shared/Navbar";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Mail, Pen } from "lucide-react";
import React from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const { user } = useSelector(store => store.auth);
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto my-4 p-2 bg-white border border-gray-300 rounded-2xl">
        <div className=" flex justify-between">
          <div className="flex items-center gap-10">
            <Avatar className="h-30 w-30">
              <AvatarImage
                className="w-full object-cover"
                src={user?.profilephoto || "https://github.com/shadcn.png"}
              />
            </Avatar>
            <div>
              <h1 className="font-medium text-xl">{user?.fullname}</h1>
            </div>
          </div>
          <Button className="text-right border border-blue-600" variant="outline"><Pen/></Button>
        </div>
        <div className="my-6 px-4">
          <div className="flex items-center gap-4">
            <Mail/>
            <p>{user?.email}</p>
          </div>
        </div>
      </div>
      {/* Purchase */}
    </div>
  );
};

export default Profile;
