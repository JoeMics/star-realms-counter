'use client';

import { Button } from '@/components/ui/button';
import { Fullscreen, Settings } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Header() {
  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    function onFullScreenChange() {
      setIsFullScreen(!!document.fullscreenElement);
    }

    document.addEventListener('fullscreenchange', onFullScreenChange);

    return () =>
      document.removeEventListener('fullscreenchange', onFullScreenChange);
  }, []);

  function setFullScreen() {
    if (!isFullScreen) {
      return document.body.requestFullscreen();
    }

    return document.exitFullscreen();
  }

  return (
    <nav className='flex justify-between px-4 py-2'>
      <h1 className='text-center text-2xl font-extrabold'>Star Realms</h1>
      <div>
        <Button
          variant={'ghost'}
          size={'icon'}
          onClick={() => setFullScreen()}
        >
          <Fullscreen />
        </Button>
        <Button
          variant={'ghost'}
          size={'icon'}
        >
          <Settings />
        </Button>
      </div>
    </nav>
  );
}
