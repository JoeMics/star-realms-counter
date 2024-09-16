'use client';

import { useState } from 'react';
import { CircleChevronLeftIcon, CircleChevronRightIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import HealthBar from '@/components/HealthBar';

// Props: title, color
export default function Counter() {
  const [startingHealth, setStartingHealth] = useState(50);
  const [health, setHealth] = useState(startingHealth);
  const [healthModifier, setHealthModifier] = useState(0);
  const [damage, setDamage] = useState(0);
  const [money, setMoney] = useState(0);

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
    setDamage(0);
    setMoney(0);
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

      <h2 className='mx-auto my-0 text-3xl font-semibold opacity-80'>Damage</h2>
      <div className='mx-auto my-0 flex items-center justify-center'>
        <Button
          variant='outline'
          size='icon'
          onClick={() => setDamage(damage - 1)}
        >
          {'<'}
        </Button>
        <h3 className='mx-4 text-8xl text-red-600'>{damage}</h3>
        <Button
          variant='outline'
          size='icon'
          onClick={() => setDamage(damage + 1)}
        >
          {'>'}
        </Button>
      </div>

      <h2 className='mx-auto my-0 text-3xl font-semibold opacity-80'>Money</h2>
      <div className='mx-auto my-0 flex items-center justify-center'>
        <Button
          variant='ghost'
          size='icon'
          onClick={() => setMoney(money - 1)}
        >
          {'<'}
        </Button>
        <h3 className='mx-4 text-8xl text-yellow-600'>{money}</h3>
        <Button
          variant='ghost'
          size='icon'
          onClick={() => setMoney(money + 1)}
        >
          {'>'}
        </Button>
      </div>
    </>
  );
}
