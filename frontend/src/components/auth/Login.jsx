import React from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup } from "@/components/ui/radio-group"
import { Button } from '../ui/button'

const Login = () => {
  return (
    <div>
      <form className='border border-slate-300 rounded-md px-2'>
         <h1 className="font-medium text-xl text-blue-500 py-4">Welcome</h1>
         <div className='my-2 space-y-4'>
          <Label>Email</Label>
          <Input placeholder="jhondao@gmail.com"/>
         </div>

         <div className='my-2 space-y-4'>
          <Label>Password</Label>
          <Input placeholder="Jhondao123"/>
         </div>
          <div className="flex items-center justify-between">
            <RadioGroup className='flex items-center gap-4 my-5'>
              <div className="flex items-center space-x-2">
                <Input type="radio" name="role" value="student" className="cursor-pointer"/>
                <Label htmlFor="r1">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input type="radio" name="role" value="instructor" className="cursor-pointer"/>
                <Label htmlFor="r2">Instructor</Label>
              </div>
            </RadioGroup>
          </div>
          <Button className="my-4 w-full h-10 bg-blue-500 hover:bg-blue-700">Signup</Button>
      </form>
    </div>
  )
}

export default Login
