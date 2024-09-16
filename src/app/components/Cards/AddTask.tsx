import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';

export default function AddTask() {
    const [isHover, setIsHover] = useState<boolean>(false);
    const handleMouseEnter = () => {
        setIsHover(true);
    }
    const handleMouseExit = () => {
        setIsHover(false)
    }
    return(
        <button className='text-[14px] flex justify-center items-center'
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseExit}
        >
            <AddIcon className='mr-0.5 ml-[-2px]'
            sx={{
                '& .MuiSvgIcon-root': { fontSize: 16 },
                color: isHover?'rgb(239 68 68)':'black',
              }}/>
            <span className={`text-[16px] ${isHover ? 'text-red-500' : 'text-black'}`}>Add Task</span>
      </button>
    )
}