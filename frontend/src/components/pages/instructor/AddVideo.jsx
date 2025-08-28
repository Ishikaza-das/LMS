import Navbar from '@/components/shared/Navbar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import React, { useRef } from 'react'

const AddVideo = () => {
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click(); 
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log("Selected video:", file);
    }
  };

  return (
    <div className='min-h-screen'>
      <Navbar />
      <div className='max-w-7xl mx-auto my-8 px-4 sm:px-6 lg:px-8'>
        <div className="mt-6 bg-gray-900 border border-gray-700 p-6 rounded-2xl shadow-md">
          <h1 className='text-white font-bold text-2xl'>Update Lesson</h1>

          <form className='text-white space-y-6 py-8'>
            <div className='grid grid-cols-1 gap-6'>
              <div className='space-y-2'>
                <Label className="text-lg font-medium">Title</Label>
                <Input type="text"/>
              </div>

              <div className='space-x-2 flex items-center'>
                <Switch />
                <Label className="text-lg font-medium">Public</Label>
              </div>

              <div>
                {/* Hidden input for video */}
                <input
                  type="file"
                  accept="video/*"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                />
                <Button type="button" variant="destructive" onClick={handleButtonClick}>
                  Upload Video
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddVideo
