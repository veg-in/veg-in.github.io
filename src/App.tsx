import { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className='min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4'>
      <div className='flex gap-8 mb-8'>
        <div className='text-6xl'>🔥</div>
      </div>
      <h1 className='text-4xl font-bold text-slate-800 mb-8'>Vite + React</h1>
      <div className='bg-white p-8 rounded-xl shadow-lg max-w-md w-full mb-8'>
        <button
          onClick={() => setCount((count) => count + 1)}
          className='w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg mb-4 transition-colors'
        >
          count is {count}
        </button>
        <p className='text-slate-600 text-center'>
          Edit <code className='bg-slate-100 px-2 py-1 rounded text-sm font-mono'>src/App.tsx</code>{' '}
          and save to test HMR
        </p>
      </div>
      <p className='text-slate-500 text-sm'>Click on the Vite and React logos to learn more</p>
    </div>
  );
}

export default App;
