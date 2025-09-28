import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Link2, LogOut, User2 } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { setUser } from "@/store/authSlice";
import { resetCourseState } from "@/store/courseSlice";
import { resetLessonState } from "@/store/lessonSlice";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logOutHandler = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_USER_API}/logout`,
        {
          withCredentials: true,
        }
      );
      if (response.data.success) {
        dispatch(setUser(null));
        dispatch(resetCourseState());
        dispatch(resetLessonState());
        toast.success(response.data.message);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const connectStripe = async() => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_STRIPE_API}/connect`,{},{withCredentials:true})

      if(response.data.success){
        window.location.href = response.data.url;
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16">
        <div className="px-2 md:px-0">
          <h1 className="text-2xl text-blue-500 font-bold">
            Learn<span className="text-blue-300">Up</span>
          </h1>
        </div>
        <div className="flex items-center gap-12 px-2 md:px-0">
          <ul className="flex font-medium items-center gap-5 text-white">
            {user && user?.role === "instructor" ? (
              <>
                <li>
                  <Link to="/admin/dashboard">Dashboard</Link>
                </li>
                <li>
                  <Link to="/admin/courses">Courses</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/dashboard">Dashboard</Link>
                </li>
                <li>
                  <Link to="/course">Courses</Link>
                </li>
              </>
            )}
          </ul>
          <Popover>
            <PopoverTrigger>
              <Avatar className="cursor-pointer">
                <AvatarImage
                  className="w-full object-cover"
                  src={user?.profilephoto}
                />
              </Avatar>
            </PopoverTrigger>
            <PopoverContent className="w-70 bg-black text-white">
              <div>
                <div className="flex gap-4 space-y-2">
                  <Avatar>
                    <AvatarImage
                      className="w-full object-cover"
                      src={user?.profilephoto}
                    />
                  </Avatar>
                  <div>
                    <h1 className="font-medium">{user?.fullname}</h1>
                  </div>
                </div>
                <div className="flex flex-col my-2">
                  {user && user.role === "student" ? (
                    <div className="flex w-fit items-center gap-2 cursor-pointer">
                      <User2 />
                      <Button variant="link">
                        <Link to="/profile" className="text-white">View Profile</Link>
                      </Button>
                    </div>
                  ) : (
                     <div className="flex w-fit items-center gap-2 cursor-pointer">
                      <Link2 />
                      <Button variant="link" onClick={connectStripe}>
                        <Link className="text-white">Connect Stripe Account</Link>
                      </Button>
                    </div>
                  )}
                  <div className="flex w-fit items-center gap-2 cursor-pointer">
                    <LogOut />
                    <Button variant="link" onClick={logOutHandler} className="text-white">
                      Logout
                    </Button>
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
