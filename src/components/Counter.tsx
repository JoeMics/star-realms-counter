'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

// Props: title, color
export default function Counter() {
  const [count, setCount] = useState(50);
  const [damage, setDamage] = useState(0);
  const [money, setMoney] = useState(0);

  return (
    <>
      <h2 className='mx-auto my-0 text-3xl font-semibold opacity-80'>Health</h2>
      <div className='mx-auto my-0 flex items-center justify-center'>
        <Button
          variant='outline'
          size='icon'
          onClick={() => setCount(count - 1)}
        >
          {'<'}
        </Button>
        <h3 className='mx-4 text-8xl text-green-600'>{count}</h3>
        <Button
          variant='outline'
          size='icon'
          onClick={() => setCount(count + 1)}
        >
          {'>'}
        </Button>
      </div>

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

      <h2 className='mx-auto my-0 text-3xl font-semibold opacity-80'>Damage</h2>
      <div className='mx-auto my-0 flex items-center justify-center'>
        <Button
          variant='outline'
          size='icon'
          onClick={() => setMoney(money - 1)}
        >
          {'<'}
        </Button>
        <h3 className='mx-4 text-8xl text-yellow-600'>{money}</h3>
        <Button
          variant='outline'
          size='icon'
          onClick={() => setMoney(money + 1)}
        >
          {'>'}
        </Button>
      </div>
    </>
  );
}
