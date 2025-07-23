import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Avatar, AvatarImage } from '../ui/avatar'
import { LogOut, User2 } from 'lucide-react'
import { Button } from '../ui/button'

const Navbar = () => {
  return (
    <div className='bg-white'>
      <div className='flex items-center justify-between mx-auto max-w-7xl h-16'>
        <div>
            <h1 className='text-2xl text-blue-500 font-bold'>Learn<span className='text-blue-900'>Up</span></h1>
        </div>
        <div className='flex items-center gap-12'>
            <ul className='flex font-medium items-center gap-5'>
                <li>Dashboard</li>
                <li>Courses</li>
            </ul>
            <Popover>
                <PopoverTrigger>
                    <Avatar className="cursor-pointer">
                        <AvatarImage src="https://github.com/shadcn.png"/>
                    </Avatar>
                </PopoverTrigger>
                <PopoverContent className="w-70">
                    <div>
                        <div className='flex gap-4 space-y-2'>
                            <Avatar>
                                <AvatarImage src="https://github.com/shadcn.png"/>
                            </Avatar>
                            <div>
                                <h1 className='font-medium'>Ritesh Das</h1>
                            </div>
                        </div>
                        <div className='flex flex-col my-2 text-gray-600'>
                            <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                <User2/>
                                <Button variant="link">View Profile</Button>
                            </div>

                            <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                <LogOut/>
                                <Button variant="link">Logout</Button>
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