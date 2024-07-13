'use client';

import { useEffect } from 'react';
import TopBar from './topbar';
import MessageList from './message-list';
import { useSelectedUser } from '@/store/useSelectedUser';
import BottomBar from './bottom-bar';

const MessageContainer = () => {
  const { setSelectedUser } = useSelectedUser();

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedUser(null);
    };

    document.addEventListener('keydown', handleEscape);

    return () => document.removeEventListener('keydown', handleEscape);
  }, [setSelectedUser]);

  return (
    <div className='flex flex-col justify-between w-full h-full'>
      <TopBar />

      <div className='w-full overflow-y-auto overflow-x-hidden h-full flex flex-col'>
        <MessageList />
        <BottomBar />
      </div>
    </div>
  );
};
export default MessageContainer;
