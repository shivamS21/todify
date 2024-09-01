'use client';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import './AddTaskModal.css';
import { SetStateAction, useState } from 'react';
const style = {
    position: 'absolute' as 'absolute',
    top: '20%',
    left: '35%',
    width: 550,
    bgcolor: 'background.paper',
  };

  
export default function AddTaskModal({ onClose }: { onClose: () => void }) {
    const [heading, setHeading] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [comment, setComment] = useState('');
    const [priority, setPriority] = useState('priority-4');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    
        const taskData = {
        //   userId,
          dueDate,
          heading,
          description,
          comment,
          priority,
        };
    
        // try {
        //   const response = await fetch('/api/tasks/create-task', {
        //     method: 'POST',
        //     headers: {
        //       'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(taskData),
        //   });
    
        //   if (response.ok) {
        //     const result = await response.json();
        //     console.log('Task created:', result);
        //     onClose(); // Close the modal after successful creation
        //   } else {
        //     console.error('Failed to create task');
        //   }
        // } catch (error) {
        //   console.error('Error:', error);
        // }
        console.log(taskData);
        onClose();
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
                                    <input type="text" placeholder="Task name" className="task-input" value={heading}
                                onChange={(e) => setHeading(e.target.value)}/>
                                </div>
                                <div className="task-editor-description">
                                    <input type="text" placeholder="Description" className="descr-input" value={description}
                                onChange={(e) => setDescription(e.target.value)}/>
                                </div>
                            </div>
                            <div className="task-editor-date-priority">
                                <div className="task-editor-due-date">
                                    <input type="date" placeholder="Due date" className="date-input optional-field" value={dueDate}
                                onChange={(e) => setDueDate(e.target.value)}/>
                                </div>
                                <div className="task-editor-priority">
                                <select className="priority-select optional-field" value={priority} onChange={(e) => setPriority(e.target.value)}>
                                    <option value="" disabled hidden>Select Priority</option>
                                    <option value="priority-1">Priority 1</option>
                                    <option value="priority-2">Priority 2</option>
                                    <option value="priority-3">Priority 3</option>
                                    <option value="priority-4">Priority 4</option>
                                    </select>

                                </div>
                            </div>
                        </div>
                        <div className="task-editor-actions-buttons">
                            <button className={`add-task-button ${heading ? 'filled' : ''}`} type='submit' ><span>Add Task</span></button>
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