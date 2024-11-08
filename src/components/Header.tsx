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
import { Fullscreen, Rocket, Settings } from 'lucide-react';
import { MouseEventHandler, useEffect, useState } from 'react';
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
  onResetClick: MouseEventHandler<HTMLButtonElement>;
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
  }

  function onReset(event: React.MouseEvent<HTMLButtonElement>) {
    props.onResetClick(event);
    setOpen(false);
  }

  return (
    <nav className='flex justify-between px-4 py-2'>
      <div className='flex items-center py-2'>
        <h1 className='hidden px-2 text-2xl font-extrabold md:block'>
          Star Realms
        </h1>
        <Rocket className='text-center' />
      </div>
      <div>
        <Button
          variant={'ghost'}
          size={'icon'}
          onClick={() => setFullScreen()}
        >
          <Fullscreen />
        </Button>
        <Dialog
          open={open}
          onOpenChange={setOpen}
        >
          <DialogTrigger asChild>
            <Button
              variant={'ghost'}
              size={'icon'}
            >
              <Settings />
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
                  <Button
                    variant={'outline'}
                    onClick={onReset}
                  >
                    New Game
                  </Button>
                  <Button type='submit'>Save changes</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
    </nav>
  );
}
