import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Delete, Edit2, MoreHorizontal } from 'lucide-react'
import React from 'react'

const CourseTable = () => {
  return (
    <div>
      <Table>
        <TableCaption>A List of Your recent courses</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Course Name</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Price</TableHead>
            <TableHead className="text-right">Actioon</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <tr>
            <TableCell>Gen AI Full course</TableCell>
            <TableCell>2025-11-10</TableCell>
            <TableCell>₹ 250</TableCell>
            <TableCell className="text-right">
              <Popover>
                <PopoverTrigger><MoreHorizontal/></PopoverTrigger>
                <PopoverContent className="w-32">
                  <div className='flex items-center gap-4 w-fit cursor-pointer'>
                    <Edit2/>
                    <span>Edit</span>
                  </div>
                  <br />
                  <div className='flex items-center gap-4 w-fit cursor-pointer'>
                    <Delete/>
                    <span>Delete</span>
                  </div>
                </PopoverContent>
              </Popover>
            </TableCell>
          </tr>
        </TableBody>
      </Table>
    </div>
  )
}

export default CourseTable
