import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import AddTaskModal from '../Modal/AddTaskModal';


export default function AddTask({onTaskAdded} : {onTaskAdded: () => void}) {
    const [isHover, setIsHover] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState(false); 
    const handleMouseEnter = () => {
        setIsHover(true);
    }
    const handleMouseExit = () => {
        setIsHover(false);
    }
    const handleAddTaskClick = () => {
        setIsModalOpen(true);
    }
    const handleCloseModal = () => {
        setIsModalOpen(false);
    }
    return(
        <div>
            <button className='text-[14px] flex justify-center items-center'
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseExit}
            onClick={handleAddTaskClick}
            >
                <AddIcon className='mr-0.5 ml-[-5px]'
                sx={{
                    '& .MuiSvgIcon-root': { fontSize: 12 },
                    color: isHover?'rgb(239 68 68)':'black',
                }}/>
                <span className={`text-[14px] ${isHover ? 'text-red-500' : 'text-black'}`}>Add Task</span>
        </button>
        {/* Render the modal if it's open */}
        {isModalOpen && <AddTaskModal onTaskAdded={onTaskAdded} onClose={handleCloseModal} />}
      </div>
    )
}