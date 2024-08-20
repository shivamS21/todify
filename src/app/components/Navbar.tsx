import React from 'react'
import './Navbar.css';
import Actions from './Actions';
import PlaceHolder from './PlaceHolder';
const Navbar = () => {
  return (
    <div className='app-sidebar-container'>
        <PlaceHolder/>
        <Actions/>
    </div>
  )
}

export default Navbar