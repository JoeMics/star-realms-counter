'use client';

import { useState } from 'react';
import { CircleChevronLeftIcon, CircleChevronRightIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import HealthBar from '@/components/HealthBar';
import CombatBar from '@/components/CombatBar';
import TradeBar from '@/components/TradeBar';

// Props: title, color
export default function Counter() {
  const [startingHealth, setStartingHealth] = useState(50);
  const [health, setHealth] = useState(startingHealth);
  const [healthModifier, setHealthModifier] = useState(0);
  const [combat, setCombat] = useState(0);
  const [trade, setTrade] = useState(0);

  function decrementOnce(number: number) {
    return number > 0 ? number - 1 : number;
  }

  function decrementHealth() {
    if (health > 0) {
      setHealth(decrementOnce(health));
      setHealthModifier(healthModifier - 1);
    }
  }

  function incrementHealth() {
    setHealth(health + 1);
    setHealthModifier(healthModifier + 1);
  }

  function finishTurn() {
    setHealthModifier(0);
    setCombat(0);
    setTrade(0);
  }

  return (
    <>
      <div className='mx-auto my-0 flex items-center justify-center'>
        <Button
          variant='ghost'
          size='icon'
          onClick={() => decrementHealth()}
        >
          <CircleChevronLeftIcon className='h-8 w-8' />
        </Button>
        <HealthBar
          health={health}
          startingHealth={startingHealth}
          healthModifier={healthModifier}
        ></HealthBar>
        <Button
          variant='ghost'
          size='icon'
          onClick={() => incrementHealth()}
        >
          <CircleChevronRightIcon className='h-8 w-8' />
        </Button>
      </div>

      <Button
        className='mx-auto my-0'
        variant={'outline'}
        onClick={finishTurn}
      >
        Finish Turn
      </Button>

      <div className='mx-auto my-0 flex items-center justify-center'>
        <Button
          variant='ghost'
          size='icon'
          onClick={() => setCombat(decrementOnce(combat))}
        >
          <CircleChevronLeftIcon className='h-8 w-8' />
        </Button>
        <CombatBar combat={combat}></CombatBar>
        <Button
          variant='ghost'
          size='icon'
          onClick={() => setCombat(combat + 1)}
        >
          <CircleChevronRightIcon className='h-8 w-8' />
        </Button>
      </div>

      <div className='mx-auto my-0 flex items-center justify-center'>
        <Button
          variant='ghost'
          size='icon'
          onClick={() => setTrade(decrementOnce(trade))}
        >
          <CircleChevronLeftIcon className='h-8 w-8' />
        </Button>
        <TradeBar trade={trade}></TradeBar>
        <Button
          variant='ghost'
          size='icon'
          onClick={() => setTrade(trade + 1)}
        >
          <CircleChevronRightIcon className='h-8 w-8' />
        </Button>
      </div>
    </>
  );
}
