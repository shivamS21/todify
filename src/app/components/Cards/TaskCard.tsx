import { Checkbox } from "@mui/material";
import { useSession } from "next-auth/react";
import { useState } from "react";
import CustomizeTask from "./CustomizeTask";

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

type TaskCardProps = {
  task: Task;
  onDelete: (taskId: string) => void;
};

export default function TaskCard({ task, onDelete }: TaskCardProps) {
  const { data: session } = useSession();
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const deleteTask = async () => {
    if (!session) {
      console.error("User is not authenticated");
      return;
    } 

    const response = await fetch('/api/task', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session?.accessToken}`,
      },
      body: JSON.stringify({taskId: task._id}),
    });

    if (response.ok) {
      onDelete(task._id); // Call onDelete to update the task list in Inbox
    } else {
      console.error('Failed to delete task');
    }
  };

  return (
    <div
      className="relative flex p-2 justify-stretch border-b border-b-zinc-100 cursor-pointer pl-0"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex items-start">
        <Checkbox
          onChange={deleteTask}
          sx={{
            '& .MuiSvgIcon-root': { fontSize: 20 },
            ml: '-10px',
            mt: '-4px',
            color: 'orange',
            '&.Mui-checked': {
              color: 'orange',
            },
          }}
        />
        <div className="flex flex-col gap-0.5">
          <div className="text-[18px]">{task.heading}</div>
          {task.description && <div className="text-[14px]">{task.description}</div>}
          <div className="text-[14px] text-red-400">
            {new Date(task.dueDate).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </div>
        </div>
      </div>

      {isHovered && (
        <div className="absolute top-0 right-0 pt-2">
          <CustomizeTask />
        </div>
      )}
    </div>
  );
}
