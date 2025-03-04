import { Link } from 'react-router-dom';
import QRHeader from './_QRHeader';

export default function QRLanding() {
  return (
    <div className='bg-[url(/src/assets/background.png)] bg-cover bg-center flex flex-col items-center justify-center min-h-screen'>
      {/* 공통 헤더 */}
      <QRHeader />

      {/* 메인 콘텐츠 */}
      <div className='flex-grow flex flex-col items-center justify-center px-6 pt-8 pb-32 md:pb-40'>
        <div className='text-center mb-8'>
          <h1
            className='text-4xl font-Title  md:text-5xl font-bold mb-12 text-blue-500'
            style={{
              textShadow:
                '3px 3px 3px white, -3px -3px -3px white, 3px -3px 3px white, -3px 3px -3px white',
            }}
          >
            팜쭈의 보물을 찾아라!
          </h1>

          <div className='bg-blue-50 bg-opacity-70 rounded-xl px-6 py-4 shadow-md max-w-md mx-auto'>
            <p className='text-lg md:text-xl text-center'>
              동아리 박람회 곳곳에 숨겨진 QR 코드를 찾고
              <br />
              특별한 개강 선물 받아볼래?
            </p>
          </div>
        </div>

        {/* 시작하기 버튼 */}
        <div className='mt-6 w-full flex justify-center'>
          <Link
            to='/qrtreasure/map'
            className='bg-blue-500 text-white text-2xl md:text-3xl font-bold py-4 px-12 rounded-full shadow-lg hover:bg-blue-600 transition duration-300 ease-in-out'
            style={{
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
              border: '2px solid white',
            }}
          >
            시작하기
          </Link>
        </div>
      </div>

      {/* 하단 캐릭터 */}
      <div className='absolute bottom-0 z-20 w-full flex justify-center'>
        <img
          src='/src/assets/pamzzoo_QR.png'
          alt='캐릭터'
          className='w-48 md:w-56 h-auto'
          style={{
            filter: 'drop-shadow(0 -5px 10px rgba(0, 0, 0, 0.1))',
          }}
        />
      </div>
    </div>
  );
}
