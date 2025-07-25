import React, { useEffect, useState } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup } from "@/components/ui/radio-group"
import { Button } from '../ui/button'
import axios from 'axios'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setUser } from '@/store/authSlice'
import { Loader2 } from 'lucide-react'

const Login = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    email:"",
    password:"",
    role:""
  })

  const {loading, user} = useSelector(store => store.auth);
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({...input, [e.target.name]: e.target.value})
  }
  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", input.email);
    formData.append("password", input.password);
    formData.append("role", input.role);

    try {
      dispatch(setLoading(true));
      const response = await axios.post(`${import.meta.env.VITE_USER_API}/login`,formData,{
        headers:{
          "Content-Type":"application/json"
        },
        withCredentials: true
      })
      if(response.data.success){
        dispatch(setUser(response.data.user))
        response.data.user.role === "instructor" ? navigate("/admin/dashboard") : navigate('/dashboard')
        toast.success(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message);
    } finally{
      dispatch(setLoading(false));
    }
  }
  useEffect( () => {
    if(user){
      navigate("/dashboard")
    }
  },[])
  return (
    <div>
      <form onSubmit={submitHandler} className='border border-slate-300 rounded-md px-2'>
         <h1 className="font-medium text-xl text-blue-500 py-4">Welcome...</h1>
         <div className='my-2 space-y-4'>
          <Label>Email</Label>
          <Input placeholder="jhondao@gmail.com" type="email" name="email" value={input.email} onChange={changeEventHandler}/>
         </div>

         <div className='my-2 space-y-4'>
          <Label>Password</Label>
          <Input placeholder="Jhondao123" type="password" name="password" value={input.password} onChange={changeEventHandler}/>
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
            loading ?  <Button className="w-full my-4 h-10  bg-blue-500 hover:bg-blue-700"><Loader2 className='mr-2 h-4 w-4 animate-spin'/>Please wait...</Button> : <Button className="my-4 w-full h-10 bg-blue-500 hover:bg-blue-700" type="submit">Login</Button>
          }
      </form>
    </div>
  )
}

export default Login
