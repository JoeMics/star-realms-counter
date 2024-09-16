import Counter from '@/components/Counter';

export default function Home() {
  return (
    <div className='min-h-screen grid-rows-1 items-center justify-items-center gap-16 px-0 py-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:px-8'>
      <main className='row-start-2 flex flex-col items-center gap-8'>
        <h1 className='text-4xl font-extrabold text-center'>Star Realms Counter</h1>
        <Counter />
      </main>
    </div>
  );
}
