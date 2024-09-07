'use client';

import { usePathname, useRouter } from 'next/navigation';
import Navbar from '../components/Navbar';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Loading from '../components/Loading';

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

  if (status === 'loading') {
    return <Loading/>
  }

  // Render nothing if the user is unauthenticated (to prevent flashing of protected content)
  if (status === 'unauthenticated') {
    return null; // push login page here
  }

  // Only render content if the user is authenticated
  return (
    <div className="main">
      <Navbar selectedButton={selectedButton} setSelectedButton={setSelectedButton} />
      <main className='w-screen my-1.5 px-[150px] h-[calc(100vh-3rem)] overflow-y-auto'>
        {children}
      </main>
    </div>
  );
}
