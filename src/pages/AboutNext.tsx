import { Link } from 'react-router-dom';

export default function AboutNext() {
  
    return (
      <div className='relative'>
        <div className="font-bold text-center">소개문구 (남들과 다르다는건 알겠는데 난 대체 누구지? 싱나비 과대 독팜희와 함께, 이 낯선 친구를 연대생으로 만들어보세요!)</div>
        <div className='flex justify-center items-end'>
            <img className='w-full h-auto' src='grassland.png' />
        </div>

        <Link to='/quiz'>
            <button className="absolute bottom-28 left-1/2 w-76 h-14 transform -translate-x-1/2 bg-[#FFCE00] border-2 border-black rounded hover:bg-blue-500 text-lg font-bold">
            연대생 변신 시작! 너의 선택은?
            </button>
        </Link>
      </div>
    );
  }
  