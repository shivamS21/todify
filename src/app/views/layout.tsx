'use client';
import { usePathname } from 'next/navigation';
import Navbar from '../components/Navbar';
import { useEffect, useState } from 'react';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const pathName = usePathname();
  const [selectedButton, setSelectedButton] = useState('');

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
      setSelectedButton('/today'); // Default or other state
    }
  }, [pathName]);
  return (
        <div className="main">
            <Navbar selectedButton={selectedButton} setSelectedButton={setSelectedButton} />
            <main>
                {/* Render the children which are the page components */}
                {children}
            </main>
        </div>
  );
}
