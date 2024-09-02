import React from 'react';
import './Navbar.css';
import Actions from './Actions';
import PlaceHolder from './PlaceHolder';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';

const Navbar = ({ selectedButton, setSelectedButton }: { selectedButton: string, setSelectedButton: React.Dispatch<React.SetStateAction<string>> }) => {
  const router = useRouter();
  return (
    <div className='app-sidebar-container'>
        <div className="action-space">
          <PlaceHolder />
          <Actions selectedButton={selectedButton} setSelectedButton={setSelectedButton} />
        </div>
        
        <button
          className="border border-solid border-black rounded-full bg-orange-400 mb-2 ml-1 w-[94%] h-10 shadow-md"
          onClick={() => {
            signOut({ redirect: false }).then(() => {
              router.push("/");
            });

          }}
        >
          Sign Out
        </button>
    </div>
  );
};

export default Navbar;
