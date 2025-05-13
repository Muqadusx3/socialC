'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import ProfileCard from './ProfileCard';

const Sidebar = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push('/');
  };

  return (
    <div className="bg-blue-40 flex flex-col justify-center items-center p-2">
      <h1
        onClick={handleClick}
        className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 text-5xl font-bold mb-6 p-3 cursor-pointer"
        style={{ fontFamily: 'Ballet, sans-serif' }}
      >
        Connect
      </h1>
      {/* Profile Card */}
      <ProfileCard />
    </div>
  );
};

export default Sidebar;
