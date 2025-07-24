import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Avatar, AvatarImage } from '../ui/avatar'
import { LogOut, User2 } from 'lucide-react'
import { Button } from '../ui/button'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'sonner'
import { setUser } from '@/store/authSlice'

const Navbar = () => {
    const {user} = useSelector(store => store.auth)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logOutHandler = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_USER_API}/logout`,{
                withCredentials: true
            })
            if(response.data.success){
                dispatch(setUser(null));
                toast.success(response.data.message);
                navigate("/")
            }
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <div className='bg-white'>
      <div className='flex items-center justify-between mx-auto max-w-7xl h-16'>
        <div>
            <h1 className='text-2xl text-blue-500 font-bold'>Learn<span className='text-blue-900'>Up</span></h1>
        </div>
        <div className='flex items-center gap-12'>
            <ul className='flex font-medium items-center gap-5'>
                <li><Link to="/dashboard">Dashboard</Link></li>
                <li><Link to="/course">Courses</Link></li>
            </ul>
            <Popover>
                <PopoverTrigger>
                    <Avatar className="cursor-pointer">
                        <AvatarImage className='w-full object-cover' src={user.profilephoto || "https://github.com/shadcn.png"}/>
                    </Avatar>
                </PopoverTrigger>
                <PopoverContent className="w-70">
                    <div>
                        <div className='flex gap-4 space-y-2'>
                            <Avatar>
                                <AvatarImage className='w-full object-cover' src={user.profilephoto || "https://github.com/shadcn.png"}/>
                            </Avatar>
                            <div>
                                <h1 className='font-medium'>{user.fullname}</h1>
                            </div>
                        </div>
                        <div className='flex flex-col my-2 text-gray-600'>
                            <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                <User2/>
                                <Button variant="link"><Link to="/profile">View Profile</Link></Button>
                            </div>

                            <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                <LogOut/>
                                <Button variant="link" onClick={logOutHandler}>Logout</Button>
                            </div>
                        </div>
                    </div>
                </PopoverContent>
            </Popover>
        </div>
      </div>
    </div>
  )
}

export default Navbar