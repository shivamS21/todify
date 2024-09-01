'use client';

import { usePathname, useRouter } from 'next/navigation';
import Navbar from '../../components/Navbar';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { CircularProgress } from '@mui/material';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathName = usePathname();
  const [selectedButton, setSelectedButton] = useState('');
  const { data: session, status } = useSession();
  const router = useRouter();

  // Handle redirection for unauthenticated users
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  // Set selected button based on the current path
  useEffect(() => {
    if (pathName.includes('/inbox')) {
      setSelectedButton('inbox');
    } else if (pathName.includes('/today')) {
      setSelectedButton('today');
    } else if (pathName.includes('/upcoming')) {
      setSelectedButton('upcoming');
    } else if (pathName.includes('/filters-labels')) {
      setSelectedButton('filters-label');
    } else {
      setSelectedButton('today'); // Default or other state
    }
  }, [pathName]);

  // Show loading spinner while session status is loading
  if (status === 'loading') {
    return <div className='flex justify-center items-center w-screen h-screen'><CircularProgress /></div>;
  }

  // Render nothing if the user is unauthenticated (to prevent flashing of protected content)
  if (status === 'unauthenticated') {
    return null;
  }

  // Only render content if the user is authenticated
  return (
    <div className="main">
      <Navbar selectedButton={selectedButton} setSelectedButton={setSelectedButton} />
      <main>
        {children}
      </main>
    </div>
  );
}
