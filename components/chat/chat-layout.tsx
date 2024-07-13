'use client';
import { useCallback, useEffect, useState } from 'react';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';
import { cn } from '@/lib/utils';
import Sidebar from '@/components/sidebar';
import MessageContainer from './message-container';
import { useSelectedUser } from '@/store/useSelectedUser';
import { User } from '@/app/page';

interface ChatLayoutProps {
  defaultLayout: number[] | undefined;
  users: User[];
}
const ChatLayout = ({ defaultLayout = [320, 480], users }: ChatLayoutProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { selectedUser } = useSelectedUser();

  const checkScreenWidth = useCallback(() => {
    const mobile = window.innerWidth <= 768;
    if (mobile !== isMobile) {
      setIsMobile(mobile);
    }
  }, [isMobile]);

  useEffect(() => {
    checkScreenWidth();
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(checkScreenWidth, 1000);
    };

    let timeoutId: ReturnType<typeof setTimeout>;

    window.addEventListener('resize', handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', handleResize);
    };
  }, [checkScreenWidth]);

  return (
    <ResizablePanelGroup
      direction='horizontal'
      className='h-full items-stretch bg-background rounded-lg'
      onLayout={(sizes: number[]) => {
        document.cookie = `react-resizable-panels:layout=${JSON.stringify(
          sizes
        )}; `;
      }}
    >
      <ResizablePanel
        defaultSize={defaultLayout[0]}
        collapsedSize={8}
        collapsible={true}
        minSize={isMobile ? 0 : 24}
        maxSize={isMobile ? 8 : 30}
        onCollapse={() => {
          setIsCollapsed(true);
          document.cookie = `react-resizable-panels:collapsed=true;`;
        }}
        onExpand={() => {
          setIsCollapsed(false);
          document.cookie = `react-resizable-panels:collapsed=false;`;
        }}
        className={cn(
          isCollapsed && 'min-w-[80px] transition-all duration-300 ease-in-out'
        )}
      >
        <Sidebar isCollapsed={isCollapsed} users={users} />
      </ResizablePanel>

      <ResizableHandle withHandle />

      <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
        {!selectedUser && (
          <div className='flex justify-center items-center h-full w-full px-10'>
            <div className='flex flex-col justify-center items-center gap-4'>
              <p className='text-muted-foreground text-center'>
                Click on a chat to view the messages
              </p>
            </div>
          </div>
        )}
        {selectedUser && <MessageContainer />}
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};
export default ChatLayout;
