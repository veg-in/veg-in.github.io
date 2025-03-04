import { Link } from 'react-router-dom';
import QRHeader from './_QRHeader';

export default function QRLanding() {
  return (
    <div className='bg-[url(/public/background.png)] bg-cover bg-center flex flex-col items-center justify-start min-h-screen w-screen overflow-hidden'>
      {/* 공통 헤더 */}
      <QRHeader />

      <div className='flex flex-col items-center justify-center px-6 pt-10 md:pt-8 pb-32 md:pb-40 mt-0'>
        <div className='text-center mb-6'>
          <h1
            className='text-4xl font-Title md:text-5xl font-bold mb-8 text-blue-500'
            style={{
              textShadow:
                '-2px -2px 0 #fff, 2px -2px 0 #fff, -2px 2px 0 #fff, 2px 2px 0 #fff, 0 -2px 0 #fff, 0 2px 0 #fff, -2px 0 0 #fff, 2px 0 0 #fff',
            }}
          >
            팜쭈의 보물을 찾아라!
          </h1>

          <div className='bg-blue-50 bg-opacity-50 rounded-xl px-2 py-2 shadow-md max-w-md mx-auto'>
            <p className='md:text-xl text-center'>
              동아리 박람회 곳곳에 숨겨진 QR 코드를 찾고
              <br />
              특별한 개강 선물 받아볼래?
            </p>
          </div>
        </div>

        <div className='mt-12 sm:mt-16 md:mt-20 w-full flex justify-center relative z-30'>
          <Link
            to='/qrtreasure/map'
            className='bg-blue-50 bg-opacity-50 border-2 !border-blue-500 font-Jua text-blue-500 text-2xl md:text-3xl font-bold py-2 px-12 sm:px-16 md:px-24 rounded-full shadow-lg hover:bg-blue-600 hover:text-white transition duration-300 ease-in-out'
            style={{
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
              border: '2px solid white',
            }}
          >
            시작하기
          </Link>
        </div>
      </div>

      <div className='absolute bottom-0 z-20 w-full flex justify-center'>
        <img
          src='/pamzzoo_QR.png'
          alt='캐릭터'
          className='w-64 md:w-80'
          style={{
            filter: 'drop-shadow(0 -5px 10px rgba(0, 0, 0, 0.1))',
            transform: 'scale(1.5)',
            transformOrigin: 'bottom center',
          }}
        />
      </div>
    </div>
  );
}
