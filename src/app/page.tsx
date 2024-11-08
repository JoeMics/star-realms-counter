'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import AuthorityBar from '@/components/AuthorityBar';
import CombatBar from '@/components/CombatBar';
import TradeBar from '@/components/TradeBar';
import Header from '@/components/Header';
import WakeScreenSwitch from '@/components/WakeScreenSwitch';

export default function Home() {
  const [startingAuthority, setStartingAuthority] = useState(50);
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
    setAuthorityModifier(authorityModifier - (authority - newAmount));
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

  function resetGame() {
    setAuthority(startingAuthority);
    finishTurn();
  }

  return (
    <>
      <Header
        setStartingAuthority={setStartingAuthority}
        startingAuthority={startingAuthority}
        onResetClick={resetGame}
      />
      <main className='row-start-2 flex flex-col items-center justify-items-center gap-8'>
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
          <div className='flex flex-col'>
            <Button
              variant='outline'
              className='border-2 text-lg'
              onClick={() => setCombat(decrementAmount(5, combat))}
            >
              -5
            </Button>
            <Button
              variant='outline'
              className='my-4 border-2 text-lg'
              onClick={() => setCombat(decrementAmount(3, combat))}
            >
              -3
            </Button>
            <Button
              variant='outline'
              className='border-2 text-lg font-extrabold'
              onClick={() => setCombat(decrementAmount(1, combat))}
            >
              -1
            </Button>
          </div>
          <CombatBar combat={combat}></CombatBar>
          <div className='flex flex-col'>
            <Button
              variant='outline'
              className='border-2 text-lg'
              onClick={() => setCombat(combat + 5)}
            >
              +5
            </Button>
            <Button
              variant='outline'
              className='my-4 border-2 text-lg'
              onClick={() => setCombat(combat + 3)}
            >
              +3
            </Button>
            <Button
              variant='outline'
              className='border-2 text-lg'
              onClick={() => setCombat(combat + 1)}
            >
              +1
            </Button>
          </div>
        </div>

        <div className='mx-auto my-0 flex items-center justify-center'>
          <div className='flex flex-col'>
            <Button
              variant='outline'
              className='border-2 text-lg'
              onClick={() => setTrade(decrementAmount(5, trade))}
            >
              -5
            </Button>
            <Button
              variant='outline'
              className='my-4 border-2 text-lg'
              onClick={() => setTrade(decrementAmount(3, trade))}
            >
              -3
            </Button>
            <Button
              variant='outline'
              className='border-2 text-lg font-extrabold'
              onClick={() => setTrade(decrementAmount(1, trade))}
            >
              -1
            </Button>
          </div>
          <TradeBar trade={trade}></TradeBar>
          <div className='flex flex-col'>
            <Button
              variant='outline'
              className='border-2 text-lg'
              onClick={() => setTrade(trade + 5)}
            >
              +5
            </Button>
            <Button
              variant='outline'
              className='my-4 border-2 text-lg'
              onClick={() => setTrade(trade + 3)}
            >
              +3
            </Button>
            <Button
              variant='outline'
              className='border-2 text-lg font-extrabold'
              onClick={() => setTrade(trade + 1)}
            >
              +1
            </Button>
          </div>
        </div>
        <WakeScreenSwitch />
      </main>
    </>
  );
}
