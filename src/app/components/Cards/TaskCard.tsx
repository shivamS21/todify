import { Checkbox } from "@mui/material";
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
  };
  
export default function TaskCard ({task}: TaskCardProps) {
    return (
        <div className='flex items-start p-2 pl-0 border-b border-b-zinc-100 cursor-pointer'>

            <Checkbox sx={{ '& .MuiSvgIcon-root': { fontSize: 20 }, ml: '-10px', mt: '-4px', color: 'orange', 
    '&.Mui-checked': {
      color: 'orange',  // Changes the color when checked
    } }}/>
            <div className="flex flex-col gap-0.5">
                <div className="text-[18px]">{task.heading}</div>
                {task.description && <div className="text-[14px]">{task.description}</div>}
                <div className="text-[14px] text-red-400">{new Date(task.dueDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                })}</div>
            </div>
        </div>
    )
}