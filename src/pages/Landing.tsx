import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <>
      <div className='flex gap-8 mb-12 mt-8'>
        <div className='text-7xl'>🦅</div>
      </div>
      <h1 className='text-4xl font-bold mb-8'>DOKPAMI</h1>
      <div className='flex gap-4'>
        <Link
          to='/about'
          className='px-4 py-2 bg-[#FFCE00] text-black rounded-lg border-2 border-gray-950 hover:bg-[#E6B800] transition-colors'
        >
          소개 페이지
        </Link>
        <Link
          to='/balancegame'
          className='px-4 py-2 bg-[#FF0000] text-white rounded-lg hover:bg-[#CC0000] transition-colors'
        >
          밸런스 게임
        </Link>
      </div>
      <div className='flex gap-4 pt-2'>
        <Link
          to='/test-be'
          className='px-4 py-2 bg-[#000000] text-white rounded-lg hover:bg-[#333333] transition-colors'
        >
          test-be
        </Link>
        <Link
          to='/test-qr'
          className='px-4 py-2 bg-[#000000] text-white rounded-lg hover:bg-[#333333] transition-colors'
        >
          test-qr
        </Link>

        <Link
          to='/result'
          className='px-4 py-2 bg-[#FF0000] text-white rounded-lg hover:bg-[#CC0000] transition-colors'
        >
          퀴즈 결과 페이지
        </Link>
        <Link
          to='/aboutnext'
          className='px-4 py-2 bg-[#FF0000] text-white rounded-lg hover:bg-[#CC0000] transition-colors'
        >
          AboutNext 페이지
        </Link>
      </div>
    </>
  );
};

export default Landing;
