import React from 'react';
import './Navbar.css';
import Actions from './Actions';
import PlaceHolder from './PlaceHolder';

const Navbar = ({ selectedButton, setSelectedButton }: { selectedButton: string, setSelectedButton: React.Dispatch<React.SetStateAction<string>> }) => {
  return (
    <div className='app-sidebar-container'>
        <PlaceHolder />
        <Actions selectedButton={selectedButton} setSelectedButton={setSelectedButton} />
    </div>
  );
};

export default Navbar;
