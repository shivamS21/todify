'use client';

import AddTask from '@/app/components/Cards/AddTask';
import TaskCard from '@/app/components/Cards/TaskCard';

import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
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

const Inbox = () => {
  const {data: session, status } = useSession();

  type TaskList = {
    [key: string]: Task[]; // or you can use a more specific type if needed
  };
  // State to store the fetched tasks
  const [taskList, setTaskList] = useState<TaskList>({});
  const priorities: string[] = ['Priority-1', 'Priority-2', 'Priority-3', 'Priority-4'];

  const createTaskListPriorityWise = (tasks: Task[]) => {
    
    const updatedTaskList: TaskList = {};

    // Initialize each priority in the task list
    priorities.forEach((priority) => {
      updatedTaskList[priority] = [];
    });

    // Distribute tasks based on their priority
    tasks.forEach((task: Task) => {
      const priority = task.priority;
      if (updatedTaskList[priority]) {
        updatedTaskList[priority].push(task);
      }
    });
    setTaskList(updatedTaskList);
  }

  // Function to fetch user tasks
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
      createTaskListPriorityWise(data.userTasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  // Function to handle task deletion
  const handleDelete = (taskId: string) => {
    setTaskList((prevTaskList) => {
      const updatedTaskList: TaskList = {};

      // Iterate over each priority and filter out the deleted task
      Object.keys(prevTaskList).forEach((priority) => {
        updatedTaskList[priority] = prevTaskList[priority].filter(task => task._id !== taskId);
      });

      return updatedTaskList;
    });
  };

  useEffect(()=>{
    fetchUserTasks();
  }, [session?.accessToken])

  return (
    <div>
      <b className="text-[26px] flex pb-1">Inbox</b>
      
      {
        Object.keys(taskList).map(priority => (
          <div key={priority} className={`${taskList[priority].length > 0 ? 'flex flex-col mb-2': ''}`}>
            {taskList[priority].length > 0 && (
              <><b className='flex text-[16px] pb-1 pt-3 border-b border-b-zinc-100'>{priority}</b><ul>
                {taskList[priority].map(task => (
                  <TaskCard key={task._id} task={task} onDelete={handleDelete} />
                ))}
              </ul></>
            )}
            
          </div>
        ))
      }
      <AddTask/>
    </div>
  );
};

export default Inbox;