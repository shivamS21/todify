import React from 'react'
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import ViewSidebarOutlinedIcon from '@mui/icons-material/ViewSidebarOutlined';
import './PlaceHolder.css';
const PlaceHolder = () => {
  return (
    <div className="placeHolder">
        <div className="placeHolder-content">
            <button className="user">
                <div className="avtar">
                    <img src='https://dcff1xvirvpfp.cloudfront.net/4c95d3d4e507474a9bfbf44669d65a51_big.jpg' style={{width:'30px', height:'30px', borderRadius: '50%'}}/>
                </div>
                <div className="username">
                    Shivam
                </div>
            </button>
            <div className="notif-sidebar">
                <button className="notification">
                    <NotificationsNoneOutlinedIcon/>
                </button>
                <button className="interact-sidebar">
                    <ViewSidebarOutlinedIcon/>
                </button>
            </div>
            
        </div>
    </div>
  )
}

export default PlaceHolder