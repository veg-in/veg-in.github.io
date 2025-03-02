import { Link } from 'react-router-dom';

export default function AboutNext() {

  return (
    
    <div className='relative'>
      <div className='flex justify-center relative'>
        <img className='w-full max-w-[600px] h-auto' src='landwthpam.png' />
        <p className='absolute mt-65 text-center font-bold'>싱.나.비 과대 독팜희와 함께,<br />이 낯선 친구를 완벽한 연대생으로 만들어보세요!</p>
      </div>

      <Link to='/balancegame'>
        <button className='absolute bottom-280 left-1/2 w-76 h-14 transform -translate-x-1/2 bg-[#FFCE00] border-2 border-black rounded hover:bg-blue-500 text-lg font-bold'>
          연대생 변신 시작! 너의 선택은?
        </button>
      </Link>
      <Link to='/testqr'>
        <button className='absolute bottom-260 left-1/2 w-76 h-14 transform -translate-x-1/2 bg-[#FFCE00] border-2 border-black rounded hover:bg-blue-500 text-lg font-bold'>
          동아리 박람회 이벤트 참여하기
        </button>
      </Link>

      <div className='mt-20'>
      <img className='w-full max-w-[600px] h-auto' src='intro.png' />
      </div>
    </div>
  );
}
