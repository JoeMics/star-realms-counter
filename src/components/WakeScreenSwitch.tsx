'use client';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useRef, useState } from 'react';

export default function WakeScreenSwitch() {
  const [wakeScreen, setWakeScreen] = useState(false);
  const wakeLock = useRef<WakeLockSentinel | null>(null);

  const handleCheckChange = async (e: boolean) => {
    if (e) {
      try {
        wakeLock.current = await navigator.wakeLock.request('screen');
      } catch (e) {
        console.error(e);
      }
    } else {
      try {
        await wakeLock.current?.release();
      } catch (e) {
        console.error(e);
      }
    }

    setWakeScreen(e);
  };
  return (
    <div className='flex items-center space-x-2'>
      <Switch
        id='wake-screen'
        checked={wakeScreen}
        onCheckedChange={handleCheckChange}
      />
      <Label htmlFor='wake-screen'>Keep Screen Awake</Label>
    </div>
  );
}
