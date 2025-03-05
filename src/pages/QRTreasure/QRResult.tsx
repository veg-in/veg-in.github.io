import { useEffect, useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import QRHeader from './_QRHeader';
import captureAndShare from '@/lib/share';
import { QRLocations } from '@/data/QRMapData';

export default function QRResult() {
  const navigate = useNavigate();
  const location = useLocation();
  const [foundMarkers, setFoundMarkers] = useState(0);
  const [totalMarkers, setTotalMarkers] = useState(6); // Set the default total markers to 6
  const [, setMarkerName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [, setIsDirectAccess] = useState(false);

  useEffect(() => {
    const processQRData = () => {
      // QRMapData에서 마커 목록 가져오기 ('전체 보기' 제외)
      const allMarkers = QRLocations.filter((marker) => marker.id && marker.hash);

      // URL에서 마커 번호와 해시 추출
      const searchParams = new URLSearchParams(location.search);
      const markerId = searchParams.get('id');
      const hash = searchParams.get('hash');

      // 로컬 스토리지에서 기존 발견 목록 불러오기
      const foundMarkersData = localStorage.getItem('qrFoundMarkers') || '[]';
      let foundList;
      try {
        foundList = JSON.parse(foundMarkersData);
      } catch (e) {
        console.error('로컬 스토리지 데이터 파싱 오류:', e);
        foundList = [];
      }

      // Direct access to /qrtreasure/result (without parameters)
      if (!markerId || !hash) {
        setIsDirectAccess(true);
        setFoundMarkers(Array.isArray(foundList) ? foundList.length : 0);
        setTotalMarkers(allMarkers.length);
        setIsLoading(false);
        return;
      }

      // 현재 스캔한 마커 찾기
      const currentMarker = allMarkers.find((m) => m.id === markerId && m.hash === hash);
      if (!currentMarker) {
        navigate('/qrtreasure/map');
        return;
      }

      // 마커 이름 설정
      setMarkerName(currentMarker.title);

      // 마커ID와 해시 조합
      const markerKey = `${markerId}_${hash}`;

      // 이미 발견한 마커인지 확인
      const isAlreadyFound = Array.isArray(foundList) && foundList.includes(markerKey);

      if (!isAlreadyFound) {
        // 새로 발견한 마커인 경우 목록에 추가
        const newFoundList = Array.isArray(foundList) ? [...foundList, markerKey] : [markerKey];
        localStorage.setItem('qrFoundMarkers', JSON.stringify(newFoundList));
        setFoundMarkers(newFoundList.length);
      } else {
        // 이미 발견한 마커인 경우 기존 목록 유지
        setFoundMarkers(foundList.length);
      }

      // 전체 마커 수 설정
      setTotalMarkers(allMarkers.length);
      setIsLoading(false);
    };

    processQRData();
  }, [location.search, navigate]);

  if (isLoading) {
    return (
      <div className='flex flex-col h-screen'>
        <QRHeader showBackButton={false} />
        <div className='flex-grow flex items-center justify-center'>
          <div className='text-center'>
            <p className='text-xl mb-4'>로딩 중...</p>
          </div>
        </div>
      </div>
    );
  }

  function remainCount() {
    if (foundMarkers === 0) {
      return {
        count: 1,
        img: '/pamchu.png',
        currentPresent: '아직 보물을 찾지 않았어요',
        nextPresent: '바나나우유',
      };
    } else if (foundMarkers === 1 || foundMarkers === 2) {
      return {
        count: 3 - foundMarkers,
        img: '/banana.png',
        currentPresent: '바나나우유',
        nextPresent: '스타벅스 커피',
      };
    } else if (foundMarkers === 3 || foundMarkers === 4 || foundMarkers === 5) {
      return {
        count: 6 - foundMarkers,
        img: '/coffee.png',
        currentPresent: '스타벅스 커피',
        nextPresent: '스탠리 텀블러',
      };
    } else if (foundMarkers === 6) {
      return {
        count: 0,
        img: '/cup.png',
        currentPresent: '스탠리 텀블러',
        nextPresent: '',
      };
    }
  }

  const resultInfo = remainCount();

  return (
    <div className='flex flex-col w-full min-h-screen'>
      <QRHeader showBackButton={true} backTo='/qrtreasure/map' />

      <div className='flex-grow flex items-center justify-center py-6'>
        <div className='bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center'>
          <div className='text-center mb-4'>
            <h2 className='text-2xl font-bold'>나의 보물찾기 현황</h2>
            <p className='text-lg'>
              {foundMarkers}개 / {totalMarkers}개 발견!
            </p>
          </div>

          <img
            id='nftcapture'
            src={resultInfo?.img}
            alt='캐릭터'
            className='w-full m-auto h-auto'
          />

          {foundMarkers === 0 ? (
            <p className='pt-8 text-[18px] font-bold'>
              아직 보물을 찾지 않았어요. 보물을 찾아보세요!
            </p>
          ) : (
            <p className='pt-8 font-bold mb-4'>
              지금까지 {foundMarkers}개의 보물을 찾았어요! <br />
              스토리 공유하고 {resultInfo?.currentPresent}를 받아가세요🎉
            </p>
          )}

          {foundMarkers !== 6 && foundMarkers > 0 && (
            <p className='pt-6 text-[16px]'>
              {resultInfo?.count}개만 더 찾으면 {resultInfo?.nextPresent}를 받을 수 있어요!
            </p>
          )}

          {foundMarkers !== 6 && (
            <Link
              to='/qrtreasure/map'
              className='flex justify-center text-xs sm:text-sm md:text-[18px] bg-blue-500 hover:bg-blue-600 text-white font-bold my-4 py-3 px-4 sm:px-6 rounded-lg transition duration-200'
            >
              보물 더 찾기
            </Link>
          )}

          {foundMarkers > 0 && (
            <>
              <button
                onClick={() => captureAndShare()}
                className='w-full justify-center text-xs sm:text-sm md:text-[18px] bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 sm:px-6 rounded-lg transition duration-200'
              >
                인스타에 공유하고 선물 받기
              </button>

              <p className='mt-4 text-[13px]'>
                ※ 인스타그램에 공유하실 때 <br /> "@dokpami.nft"를 태그해주세요!
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
