'use client';

// type issues in this file. Still to debug

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
    [key: string]: string[]; // or you can use a more specific type if needed
  };
  // State to store the fetched tasks
  const [taskList, setTaskList] = useState<TaskList>({});
  const priorities: string[] = ['Priority-1', 'Priority-2', 'Priority-3', 'Priority-4'];

  
  
  const createTaskListPriorityWise = (tasks: []) => {
    
    const updatedTaskList: TaskList = {};

    // Initialize each priority in the task list
    priorities.forEach((priority) => {
      updatedTaskList[priority] = [];
    });

    // Distribute tasks based on their priority
    console.log(tasks)
    tasks.forEach((task: Task) => {
      const priority = task.priority;
      if (updatedTaskList[priority]) {
        updatedTaskList[priority].push(task);
      }
    });
    setTaskList(updatedTaskList);
    console.log('chacha', updatedTaskList)
    console.log('papa', taskList)

  }

  // Function to fetch user tasks
  const fetchUserTasks = async () => {
    try {
      const response = await fetch('/api/task', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${session?.accessToken}`, // Adding JWT token in request header
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch tasks');
      }

      const data = await response.json();
      console.log(data.userTasks);
      createTaskListPriorityWise(data.userTasks);
      console.log(taskList);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  useEffect(()=>{
    fetchUserTasks();
  }, [])

  return (
    <div>
      <b className="my-1.5 mx-14 text-[32px]">Inbox</b>
       {/* {updatedTaskList.length > 0 ? (
        <ul>
          {updatedTaskList.map((task: any) => (
            <li key={task._id}>{task.heading}</li>
          ))}
        </ul>
      ) : (
        <p>No tasks found</p>
      )} */}
    </div>
  );
};

export default Inbox;