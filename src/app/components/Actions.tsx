'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import TodayOutlinedIcon from '@mui/icons-material/TodayOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import './Actions.css';
import AddTaskModal from './Modal/AddTaskModal';

type ButtonName = 'add-task' | 'search' | 'inbox' | 'today' | 'upcoming' | 'filters-label';

const Actions = ({ selectedButton, setSelectedButton }: { selectedButton: string, setSelectedButton: React.Dispatch<React.SetStateAction<string>> }) => {
  const router = useRouter(); // Initialize useRouter
  const [isModalOpen, setIsModalOpen] = useState(false); // Initialize as false

  const handleButtonClick = (buttonName: ButtonName) => {
    setSelectedButton(buttonName);
    switch (buttonName) {
      case 'inbox':
        router.push('/views/inbox');
        break;
      case 'today':
        router.push('/views/today');
        break;
      case 'upcoming':
        router.push('/views/upcoming');
        break;
      case 'filters-label':
        router.push('/views/filters-labels');
        break;
      default:
        break;
    }
  };

  const handleAddTaskClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="user-action">
      <button
        className={`add-task ${selectedButton === 'add-task' ? 'selected' : ''}`}
        onClick={handleAddTaskClick}
      >
        <AddCircleOutlineOutlinedIcon className='ml-1.5 mr-1.5'/>
        <span> Add Task</span>
      </button>
      <button
        className={`search ${selectedButton === 'search' ? 'selected' : ''}`}
        onClick={() => handleButtonClick('search')}
      >
        <SearchOutlinedIcon className='ml-1.5 mr-1.5'/>
        <span> Search</span>
      </button>
      <button
        className={`inbox ${selectedButton === 'inbox' ? 'selected' : ''}`}
        onClick={() => handleButtonClick('inbox')}
      >
        <MailOutlinedIcon className='ml-1.5 mr-1.5'/>
        <span> Inbox</span>
      </button>
      <button
        className={`today ${selectedButton === 'today' ? 'selected' : ''}`}
        onClick={() => handleButtonClick('today')}
      >
        <TodayOutlinedIcon className='ml-1.5 mr-1.5'/>
        <span> Today</span>
      </button>
      <button
        className={`upcoming ${selectedButton === 'upcoming' ? 'selected' : ''}`}
        onClick={() => handleButtonClick('upcoming')}
      >
        <CalendarMonthOutlinedIcon className='ml-1.5 mr-1.5'/>
        <span> Upcoming</span>
      </button>
      <button
        className={`filters-label ${selectedButton === 'filters-label' ? 'selected' : ''}`}
        onClick={() => handleButtonClick('filters-label')}
      >
        <FilterAltOutlinedIcon className='ml-1.5 mr-1.5'/>
        <span> Filters & Labels</span>
      </button>
      {/* Render the modal if it's open */}
      {isModalOpen && <AddTaskModal onClose={handleCloseModal} />}
    </div>
  );
};

export default Actions;
