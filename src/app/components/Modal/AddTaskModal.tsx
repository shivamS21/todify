'use client';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import './AddTaskModal.css';
import { useState } from 'react';
import { getSession } from 'next-auth/react';
import PriorityDropdown from './PriorityDropdown';
const style = {
    position: 'absolute' as 'absolute',
    top: '20%',
    left: '35%',
    width: 550,
    bgcolor: 'background.paper',
  };

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

type taskModalProps = {
  task?: Task;
  onClose : () => void;
  interactionButton?: string
  onTaskAdded?: () => void

}

  
export default function AddTaskModal({ onClose , task, interactionButton, onTaskAdded }: taskModalProps) {
    const taskId = task?._id;
    const [heading, setHeading] = useState(task?.heading || '');
    const [description, setDescription] = useState(task?.description || '');
    const [priority, setPriority] = useState(task?.priority || 'Priority-4');
    
    const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
    const [dueDate, setDueDate] = useState(task?.dueDate ? new Date(task?.dueDate).toISOString().split('T')[0] : today);

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();

      const session = await getSession();
  
      const newTask = {
        taskId,
        dueDate,
        heading,
        description,
        priority,
      };

      try {
        const response = await fetch('/api/task', {
          method: interactionButton==='Update'?'PUT':'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session?.accessToken}`,
          },
          body: JSON.stringify(newTask),
        });
  
        if (response.ok) {
          const result = await response.json();
          onClose(); // Close the modal after successful creation
          onTaskAdded?.(); // refetches the tasks
        } else {
          throw new Error("Request failed");
        }
      } catch (error) {
        console.error('Error:', error);
      }
  };
  
    return (
      <div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={true}
          onClose={onClose}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Fade in={true}>
            <Box sx={style}>
                <form onSubmit={handleSubmit}>
                    <div className="task-editor">
                        <div className="task-editor-input-area">
                            <div className="task-editor-input-fields">
                                <div className="task-editor-content">
                                    <input 
                                      type="text" 
                                      placeholder="Task name" 
                                      className="task-input" 
                                      value={heading}
                                      onChange={(e) => setHeading(e.target.value)}
                                    />
                                </div>
                                <div className="task-editor-description">
                                    <input 
                                      type="text" 
                                      placeholder="Description" 
                                      className="descr-input" 
                                      value={description}
                                      onChange={(e) => setDescription(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="task-editor-date-priority">
                                <div className="task-editor-due-date">
                                <input 
                                  type="date" 
                                  placeholder="Due date" 
                                  className="date-input optional-field" 
                                  value={dueDate}
                                  min={new Date().toISOString().split('T')[0]} // Prevent selection of dates before today
                                  onChange={(e) => setDueDate(e.target.value)} 
                                />
                                </div>
                                <PriorityDropdown priority={priority} setPriority={setPriority}/>
                            </div>
                        </div>
                        <div className="task-editor-actions-buttons">
                            <button className={`add-task-button ${heading ? 'filled' : ''}`} type='submit' ><span>{interactionButton||"Add"} Task</span></button>
                            <button className='cancel-button' onClick={onClose}><span>Cancel</span></button>
                        </div>
                    </div>
                </form>
            </Box>
          </Fade>
        </Modal>
      </div>
    );
  }