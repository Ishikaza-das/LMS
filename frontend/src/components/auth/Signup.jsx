import React, { useEffect, useState } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup } from "@/components/ui/radio-group"
import { Button } from '../ui/button'
import axios from 'axios'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '@/store/authSlice'
import { Loader2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const Signup = ({switchToLogin}) => {
  const [input, setInput] = useState({
    file:"",
    fullname:"",
    email:"",
    password:"",
    role:""
  });

  const {loading, user} = useSelector(store => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({...input,[e.target.name]: e.target.value});
  }
  const changeFileHandler = (e) => {
    setInput({...input, file: e.target.files?.[0]});
  }
  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData(); 
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("password", input.password);
    formData.append("role", input.role);
    if(input.file){
      formData.append("file",input.file);
    }
    try {
      dispatch(setLoading(true))
      const response = await axios.post(`${import.meta.env.VITE_USER_API}/register`, formData,{
        headers:{
          "Content-Type":"multipart/form-data"
        },
        withCredentials:true
      })
      if(response.data.success){
        toast.success(response.data.message);
        switchToLogin();
        console.log(response.data);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally{
      dispatch(setLoading(false));
    }
  }

  useEffect(() => {
  if (user && user.role === "instructor") {
    navigate("/admin/dashboard");
  } else if (user && user.role === "student") {
    navigate("/dashboard");
  }
}, [user, navigate]);

  return (
    <div className='text-white'>
      <form className='border border-slate-300 rounded-md px-2' onSubmit={submitHandler}>
         <h1 className="font-medium text-xl text-blue-500 py-4">Create a new account</h1>
         <div className='flex items-center gap-2'>
          <Label>Profile</Label>
          <Input accept="image/*" type="file" className="cursor-pointer" onChange={changeFileHandler}/>
         </div>

         <div className='my-2 space-y-4'>
          <Label>Full Name</Label>
          <Input type="text" placeholder="Jhon Dao" name="fullname" value={input.fullname} onChange={changeEventHandler}/>
         </div>

         <div className='my-2 space-y-4'>
          <Label>Email</Label>
          <Input type="email" placeholder="jhondao@gmail.com" name="email" value={input.email} onChange={changeEventHandler}/>
         </div>

         <div className='my-2 space-y-4'>
          <Label>Password</Label>
          <Input type="password" placeholder="Jhondao123" name="password" value={input.password} onChange={changeEventHandler}/>
         </div>
          <div className="flex items-center justify-between">
            <RadioGroup className='flex items-center gap-4 my-5'>
              <div className="flex items-center space-x-2">
                <Input type="radio" name="role" value="student" className="cursor-pointer" onChange={changeEventHandler}/>
                <Label htmlFor="r1">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input type="radio" name="role" value="instructor" className="cursor-pointer" onChange={changeEventHandler}/>
                <Label htmlFor="r2">Instructor</Label>
              </div>
            </RadioGroup>
          </div>
          {
            loading ? <Button className="w-full my-4 h-10  bg-blue-500 hover:bg-blue-700"><Loader2 className='mr-2 h-4 w-4 animate-spin'/>Please wait...</Button> : <Button className="my-4 w-full h-10 bg-blue-500 hover:bg-blue-700" type="submit">Signup</Button>
          }
      </form> 
    </div>
  )
}

export default Signup
