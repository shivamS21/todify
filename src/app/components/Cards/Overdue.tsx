import React, { useState } from 'react'
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';

const Overdue = () => {
    const [isExpanded, setIsExpanded] = useState<boolean>(false);
    const toggleButton = () => {
        setIsExpanded(!isExpanded);
    }
  return (
    <div>
        <div className='flex gap-2 items-center mb-4'>
        <div onClick={toggleButton} className='cursor-pointer flex items-center justify-center hover:bg-gray-200 rounded -ml-7 w-5 h-5'>
          {
            isExpanded ? <ChevronRightOutlinedIcon sx={{ fontSize:20 }} className='transition-transform duration-500 ease-in-out transform scale-125'/> :
            <KeyboardArrowDownOutlinedIcon sx={{ fontSize:20 }} className='transition-transform duration-300 ease-in-out transform scale-125'/>
          }
        </div>
        <div className='flex items-center w-full border-b border-solid border-gray-300 pb-1'>
          <span className='text-[16px]'>Overdue</span>
        </div>

      </div>
    </div>
  )
}

export default Overdue