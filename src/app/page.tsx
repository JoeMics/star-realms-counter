import Counter from '@/components/Counter';
import Header from '@/components/Header';

export default function Home() {
  return (
    <>
      <Header />
      <main className='row-start-2 flex flex-col items-center justify-items-center gap-8'>
        <Counter />
      </main>
    </>
  );
}
