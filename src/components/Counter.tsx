'use client';

import { useState } from 'react';
import { CircleChevronLeftIcon, CircleChevronRightIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AuthorityBar from '@/components/AuthorityBar';
import CombatBar from '@/components/CombatBar';
import TradeBar from '@/components/TradeBar';

export default function Counter() {
  const startingAuthority = 50;

  const [authority, setAuthority] = useState(startingAuthority);
  const [authorityModifier, setAuthorityModifier] = useState(0);
  const [combat, setCombat] = useState(0);
  const [trade, setTrade] = useState(0);

  /**
   * Returns value of a counter after being reduced by a certain amount.
   * Prevents the returned value from going into the negative
   */
  function decrementAmount(amount: number, currentCounterAmount: number) {
    if (currentCounterAmount < amount) {
      return 0;
    }

    return currentCounterAmount - amount;
  }

  function decrementHealth(amount: number) {
    const newAmount = decrementAmount(amount, authority);
    setAuthority(newAmount);
    setAuthorityModifier(newAmount);
  }

  function incrementHealth(amount: number) {
    setAuthority(authority + amount);
    setAuthorityModifier(authorityModifier + amount);
  }

  function finishTurn() {
    setAuthorityModifier(0);
    setCombat(0);
    setTrade(0);
  }

  return (
    <>
      <div className='mx-auto my-0 flex items-center justify-center'>
        <div className='flex flex-col'>
          <Button
            variant='outline'
            className='border-2 text-lg'
            onClick={() => decrementHealth(5)}
          >
            -5
          </Button>
          <Button
            variant='outline'
            className='my-4 border-2 text-lg'
            onClick={() => decrementHealth(3)}
          >
            -3
          </Button>
          <Button
            variant='outline'
            className='border-2 text-lg font-extrabold'
            onClick={() => decrementHealth(1)}
          >
            -1
          </Button>
        </div>
        <AuthorityBar
          authority={authority}
          startingAuthority={startingAuthority}
          authorityModifier={authorityModifier}
        ></AuthorityBar>
        <div className='flex flex-col'>
          <Button
            variant='outline'
            className='border-2 text-lg'
            onClick={() => incrementHealth(5)}
          >
            +5
          </Button>
          <Button
            variant='outline'
            className='my-4 border-2 text-lg'
            onClick={() => incrementHealth(3)}
          >
            +3
          </Button>
          <Button
            variant='outline'
            className='border-2 text-lg'
            onClick={() => incrementHealth(1)}
          >
            +1
          </Button>
        </div>
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
          onClick={() => setCombat(decrementAmount(1, combat))}
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
          onClick={() => setTrade(decrementAmount(1, trade))}
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
