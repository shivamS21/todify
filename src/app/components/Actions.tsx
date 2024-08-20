'use client';
import React, { useState } from 'react';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import TodayOutlinedIcon from '@mui/icons-material/TodayOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import './Actions.css';

type ButtonName = 'add-task' | 'search' | 'inbox' | 'today' | 'upcoming' | 'filters-label';

const Actions = () => {
  const [selectedButton, setSelectedButton] = useState<ButtonName | null>(null);

  const handleButtonClick = (buttonName: ButtonName) => {
    setSelectedButton(buttonName);
  };
  const handleAddTaskClick = () => {
    console.log('task model opened');
  }
  const handleSearchClick = () => {
    console.log('search button clicked');
  }

  return (
    <div className="user-action">
        <button
            className={`add-task ${selectedButton === 'add-task' ? 'selected' : ''}`}
            onClick={() => handleAddTaskClick()}
        >
            <AddCircleOutlineOutlinedIcon className='ml-1.5 mr-1.5'/>
            <span> Add Task</span>
        </button>
        <button
            className={`search ${selectedButton === 'search' ? 'selected' : ''}`}
            onClick={() => handleSearchClick()}
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
    </div>
  );
};

export default Actions;
