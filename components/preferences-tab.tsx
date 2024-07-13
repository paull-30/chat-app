'use client';

import { MoonIcon, SunIcon, Volume2, VolumeX } from 'lucide-react';
import { Button } from './ui/button';
import { useTheme } from 'next-themes';
import { usePreferences } from '@/store/usePreferences';
import { useSound } from 'use-sound';

const PreferencesTab = () => {
  const { setTheme } = useTheme();
  const { soundEnabled, setSoundEnabled } = usePreferences();
  const [playMouseClick] = useSound('/sounds/click.mp3');
  const [playSoundOn] = useSound('/sounds/open.mp3');
  const [playSoundOff] = useSound('/sounds/close.mp3');

  return (
    <div className='flex flex-wrap gap-2 px-1 md:px-2'>
      <Button
        variant='outline'
        size='icon'
        onClick={() => {
          soundEnabled && playMouseClick();
          setTheme('light');
        }}
      >
        <SunIcon className='size-[1.2rem] text-muted-foreground' />
      </Button>

      <Button
        variant='outline'
        size='icon'
        onClick={() => {
          soundEnabled && playMouseClick();
          setTheme('dark');
        }}
      >
        <MoonIcon className='size-[1.2rem] text-muted-foreground' />
      </Button>

      <Button
        variant='outline'
        size='icon'
        onClick={() => {
          setSoundEnabled(!soundEnabled);
          soundEnabled ? playSoundOff() : playSoundOn();
        }}
      >
        {soundEnabled ? (
          <Volume2 className='size-[1.2rem] text-muted-foreground' />
        ) : (
          <VolumeX className='size-[1.2rem] text-muted-foreground' />
        )}
      </Button>
    </div>
  );
};

export default PreferencesTab;
