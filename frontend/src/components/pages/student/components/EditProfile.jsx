import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import axios from 'axios';
import { toast } from 'sonner';
import { useDispatch } from 'react-redux';
import { setUser } from '@/store/authSlice';
import { Loader2 } from 'lucide-react';

const EditProfile = ({ open, setOpen }) => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const [input, setInput] = useState({
        file:"",
        fullname:""
    });

    const inputHandler = (e) => {
        setInput({ ...input, [e.target.name] : e.target.value })
    }

    const fileHandler = (e) => {
        setInput({...input, file: e.target.files?.[0]})
    }

    const updateProfile = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        if (input.fullname) formData.append("fullname", input.fullname);
        if (input.file) formData.append("file", input.file);
        try {
            setLoading(true);
            const response = await axios.put(`${import.meta.env.VITE_USER_API}/profile/update`,formData,{withCredentials:true})
            if(response.data.success){
                toast.success(response.data.message);
                dispatch(setUser(response.data.user));
                setOpen(false);
            }
        } catch (error) {
            console.log(error);
        } finally{
            setLoading(false);
        }
    }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[500px] overflow-y-auto bg-accent-foreground text-white">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            Update Profile
          </DialogTitle>
        </DialogHeader>

        <form className="space-y-4" onSubmit={updateProfile}>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="thumbnail" className="text-right">
              Profile Pic
            </Label>
            <Input
              accpect="image/*"
              type="file"
              className="col-span-3"
              onChange={fileHandler}
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
               Full Name
            </Label>
            <Input
              type="text"
              name="fullname"
              className="col-span-3"
              value={input.fullname}
              onChange={inputHandler}
            />
          </div>

          <DialogFooter>
            {loading ? (
              <Button className="bg-blue-600 hover:bg-blue-700 my-4 h-10">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Updating...
              </Button>
            ) : 
            (
              <Button
                className="bg-blue-600 hover:bg-blue-700  my-4 h-10"
                type="submit"
              >
                Update
              </Button>
            )
            }
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default EditProfile
