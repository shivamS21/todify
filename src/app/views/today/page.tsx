'use client';
import AddTask from '@/app/components/Cards/AddTask';
import TaskCard from '@/app/components/Cards/TaskCard';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'

type Task = {
  _id: string;
  userId: string;
  dueDate: string;
  heading: string;
  description: string;
  comment: string;
  priority: string;
  createdAt: string;
  updatedAt: string;
};
const Today = () => {
  const { data: session, status} = useSession();
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const toggleButton = () => {
    setIsExpanded(!isExpanded);
  }

  type TaskList = {
    [key: string] : Task[];
  }
  const [taskList, setTaskList] = useState<TaskList>({});

  const fetchUserTasks = async () => {
    try {
      const response = await fetch('/api/task', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${session?.accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch tasks');
      }

      const data = await response.json();
      setTaskList(data.userTasks)
    } catch (error) {
      console.error('Error fetching tasks', error); // Find if consoling errors really important for production apps
    }
  }

  const handleDelete = (taskId: string) => {
    setTaskList((prevTaskList) => {
      const updatedTasks = Object.values(prevTaskList).flat().filter((task) => 
        task._id !== taskId
      );
      const updatedTaskList: TaskList = {
        tasks: updatedTasks // Assuming you want the filtered tasks in 'tasks' key
      };
      console.log(taskId, updatedTaskList)
      return updatedTaskList
    });
  };

  const getFormattedDate = () => {
    const today = new Date();
    const day = today.getDate();
    const month = today.toLocaleString('default', { month: 'short' });
    const dayOfWeek = today.toLocaleString('default', { weekday: 'long' });
    const formattedDate = `${day} ${month} ‧ Today ‧ ${dayOfWeek}`;

    return formattedDate;
  };
  const isToday = (dueDate: string) => {
    const today = new Date();
    const taskDate = new Date(dueDate);

    return (
      today.getDate() === taskDate.getDate() &&
      today.getMonth() === taskDate.getMonth() &&
      today.getFullYear() === taskDate.getFullYear()
    );
  };

  useEffect(() => {
    fetchUserTasks(); 
  }, [session?.accessToken])

  return (
    <div className='mt-5 flex flex-col gap-1'>
      <b className="text-[26px] flex pb-1">Today</b>
      <div className='flex items-center gap-1 pb-4'>
        <CheckCircleOutlinedIcon sx={{ fontSize:16, color: 'gray'}}/>
        <div className='flex items-center text-gray-500'>
          <span className='text-[14px]'>{taskList && taskList.userTasks ? taskList.userTasks.length : 0} Tasks</span>
        </div>
        
      </div>
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
      <b className="flex text-[16px] pb-1 pt-3 border-b border-b-zinc-100">{getFormattedDate()}</b>

      {
        // find data, put its div and filter those which are having today's date
        Object.values(taskList).flat().filter((task: Task) => {
          return isToday(task.dueDate);
        }).map((task: Task) => {
          return <TaskCard onTaskAdded={fetchUserTasks} key={task._id} task={task} onDelete={handleDelete} dateNeeded={false}/>
        })
      }
      <AddTask onTaskAdded={fetchUserTasks}/>
    </div>
  )
}

export default Today