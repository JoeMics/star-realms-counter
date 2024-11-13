'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
} from './ui/dialog';
import { Input } from './ui/input';
import { z } from 'zod';
import { Fullscreen, Rocket, RefreshCcw } from 'lucide-react';
import { useEffect, useState } from 'react';
import { DialogDescription, DialogTitle } from '@radix-ui/react-dialog';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';

export default function Header(props: {
  startingAuthority: number;
  setStartingAuthority: React.Dispatch<React.SetStateAction<number>>;
  setAuthority: React.Dispatch<React.SetStateAction<number>>;
  finishTurn: () => void;
}) {
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

  // Form logic
  const [open, setOpen] = useState(false);
  const formSchema = z.object({
    startingAuthority: z.number().min(1, {
      message: 'Starting authority must be a value of 1 or greater.',
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      startingAuthority: props.startingAuthority,
    },
  });

  function onFormSubmit(values: z.infer<typeof formSchema>) {
    props.setStartingAuthority(values.startingAuthority);
    props.setAuthority(values.startingAuthority);
    setOpen(false);
  }

  return (
    <nav className='mb-6 flex justify-between p-5'>
      <div className='flex items-center py-2'>
        <Rocket className='text-center' />
        <h1 className='px-2 md:text-2xl font-extrabold'>Star Realms</h1>
      </div>
      <div className='flex items-center justify-between gap-2'>
        <Dialog
          open={open}
          onOpenChange={setOpen}
        >
          <DialogTrigger asChild>
            <Button>
              New Game
              <RefreshCcw className='ml-1 size-4' />
            </Button>
          </DialogTrigger>
          <DialogContent
            className='sm:max-w-"[500px]'
            onOpenAutoFocus={(e) => e.preventDefault()}
          >
            <DialogHeader>
              <DialogTitle>Game Settings</DialogTitle>
              <DialogDescription>
                Change the values according to your game.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onFormSubmit)}
                className='space-y-8'
              >
                <FormField
                  control={form.control}
                  name='startingAuthority'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel> Starting Authority </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type='number'
                          onChange={(event) =>
                            field.onChange(+event.target.value || '')
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <Button type='submit'>Start a New Game</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
        <Button
          className='my-auto'
          variant={'secondary'}
          size={'icon'}
          onClick={() => setFullScreen()}
        >
          <Fullscreen />
        </Button>
      </div>
    </nav>
  );
}
