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

  
export default function AddTaskModal({ onClose }: { onClose: () => void }) {
    const [heading, setHeading] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [priority, setPriority] = useState('Priority-4');

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();

      const session = await getSession();
  
      const taskData = {
        dueDate,
        heading,
        description,
        priority,
      };
      console.log('taskDta', taskData);

      try {
        const response = await fetch('/api/task', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session?.accessToken}`,
          },
          body: JSON.stringify(taskData),
        });
        console.log('response', response);
  
        if (response.ok) {
          const result = await response.json();
          console.log('Task created:', result);
          onClose(); // Close the modal after successful creation
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
                                <PriorityDropdown priority={priority} setPriority={setPriority}/>
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