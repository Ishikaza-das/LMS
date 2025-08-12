import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React from 'react'

const EditCourse = ({open, setOpen}) => {
    const close = () => {
        setOpen(false);
    }
  return (
    <div>
      <Dialog open={open}>
        <DialogContent className="sm:max-w[500px]" onInteractOutside={close}>
            <DialogHeader>
                <DialogTitle>Update Course</DialogTitle>
            </DialogHeader>
            <form action="">
                <div className='grid gap-4 py-4'>
                    <div className='grid grid-cols-4 items-center gap-4'>
                        <Label>Thumbnail</Label>
                        <Input/>
                    </div>

                    <div className='grid grid-cols-4 items-center gap-4'>
                        <Label>Course Name</Label>
                        <Input/>
                    </div>

                    <div className='grid grid-cols-4 items-center gap-4'>
                        <Label>Description</Label>
                        <Input/>
                    </div>
                    
                    <div className='grid grid-cols-4 items-center gap-4'>
                        <Label>Category</Label>
                        <Input/>
                    </div>

                    <div className='grid grid-cols-4 items-center gap-4'>
                        <Label>Level</Label>
                        <Input/>
                    </div>

                    <div className='grid grid-cols-4 items-center gap-4'>
                        <Label>Price</Label>
                        <Input/>
                    </div>
                </div>
            </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default EditCourse
