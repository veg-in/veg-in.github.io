import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <>
      <div className='flex gap-8 mb-12 mt-8 '>
        <div className='text-7xl'>🦅</div>
      </div>
      <h1 className='text-4xl font-bold mb-8'>DOKPAMI</h1>
      <div className='flex flex-col gap-4 w-full max-w-md text-center'>
        <Link
          to='/about'
          className='px-4 py-2 bg-[#FFCE00] text-black rounded-lg border-2 border-gray-950 hover:bg-[#E6B800] transition-colors'
        >
          소개 페이지
        </Link>
        <Link
          to='/aboutnext'
          className='px-4 py-2 bg-[#FFCE00] text-black rounded-lg border-2 border-gray-950 hover:bg-[#E6B800] transition-colors'
        >
          AboutNext 페이지
        </Link>
        <Link
          to='/balancegame'
          className='px-4 py-2 bg-[#ff0000] text-white rounded-lg hover:bg-[#CC0000] transition-colors'
        >
          밸런스 게임
        </Link>
        <Link
          to='/qrtreasure'
          className='px-4 py-2 bg-[#0088ff] text-white rounded-lg hover:bg-[#0077ff] transition-colors'
        >
          QR 보물찾기
        </Link>
        <Link
          to='/qrtreasure/admin'
          className='px-4 py-2 bg-[#0088ff] text-white rounded-lg hover:bg-[#0077ff] transition-colors'
        >
          QR 보물찾기 테스트
        </Link>
        <Link
          to='/test-be'
          className='px-4 py-2 bg-[#000000] text-white rounded-lg hover:bg-[#333333] transition-colors'
        >
          test-be
        </Link>
      </div>
    </>
  );
};

export default Landing;
