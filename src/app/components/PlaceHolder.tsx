import React from 'react'
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import ViewSidebarOutlinedIcon from '@mui/icons-material/ViewSidebarOutlined';
import Image from 'next/image';
import './PlaceHolder.css';
import { useSession } from 'next-auth/react';
const PlaceHolder = () => {
    const session = useSession();
    const user = session?.data?.user;

    const userImage = user?.image ?? '';
    const userName = user?.name?.split(' ')[0] ?? '';
    
  return (
    <div className="placeHolder">
        <div className="placeHolder-content">
            <button className="user">
                <div className="avtar border border-orange-300 rounded-full">
                    <Image src={userImage} width={36} height={36} className="rounded-full" alt="User Avatar"/>
                </div>
                <div className="username">
                    {userName}
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