import { Link } from 'react-router-dom';
import QRHeader from './_QRHeader';

export default function QRLanding() {
  return (
    <div className='flex flex-col justify-between w-full h-screen bg-[url(@/assets/background.png)] bg-center bg-cover'>
      {/* 공통 헤더 */}
      <QRHeader />

      {/* 메인 콘텐츠 */}
      <div className='z-10 flex-grow flex flex-col items-center justify-evenly px-6 '>
        <h1
          className='text-4xl font-Title md:text-5xl font-bold text-blue-500'
          style={{
            textShadow:
              '3px 3px 3px white, -3px -3px -3px white, 3px -3px 3px white, -3px 3px -3px white',
          }}
        >
          팜쭈의 보물을 찾아라!
        </h1>
        <div className='text-center'>
          <div className='bg-blue-50 bg-opacity-70 rounded-xl px-6 py-4 shadow-md max-w-md mx-auto'>
            <p className='text-sm md:text-lg text-center font-bold'>
              동아리 박람회 곳곳에 숨겨진 QR 코드를 찾고
              <br />
              특별한 개강 선물 받아볼래?
            </p>
          </div>
        </div>

        {/* 시작하기 버튼 */}
        <div className='w-full mx-auto flex justify-center'>
          <Link
            to='/qrtreasure/map'
            className='w-3/4 text-center bg-white/75 text-[#0080FF] border-[3px] border-[#0080FF] text-2xl md:text-3xl font-bold py-4 px-12 rounded-full shadow-lg hover:bg-blue-600 transition duration-300 ease-in-out'
          >
            시작하기
          </Link>
        </div>
      </div>

      {/* 하단 캐릭터 */}
      <div className='z-20 w-full flex justify-center'>
        <img
          src='src/assets/pamzzoo_QR.png'
          alt='캐릭터'
          className='w-full h-auto'
          style={{
            filter: 'drop-shadow(0 -5px 10px rgba(0, 0, 0, 0.1))',
          }}
        />
      </div>
    </div>
  );
}
