import { useEffect, useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import QRHeader from './_QRHeader';
import captureAndShare from '@/lib/share';

export default function QRResult() {
  const navigate = useNavigate();
  const location = useLocation();
  const [foundMarkers, setFoundMarkers] = useState(0);
  const [, setTotalMarkers] = useState(0);
  const [, setMarkerName] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const processQRCode = () => {
      // URL에서 마커 번호와 해시 추출
      const searchParams = new URLSearchParams(location.search);
      const markerId = searchParams.get('id');
      const hash = searchParams.get('hash');

      if (!markerId || !hash) {
        navigate('/qrtreasure/game');
        return;
      }

      // 전체 마커 목록 (QRTreasure의 locations 배열과 일치해야 함)
      const allMarkers = [
        { id: '1', hash: 'a1b2c3d4', title: '중도' },
        { id: '2', hash: 'e5f6g7h8', title: '백주년기념관' },
        { id: '3', hash: 'i9j0k1l2', title: '경영관' },
        { id: '4', hash: 'm3n4o5p6', title: '대운동장' },
        { id: '5', hash: 'q7r8s9t0', title: '독수리상' },
        { id: '6', hash: 'u1v2w3x4', title: '학관앞' },
      ];

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

      // 로컬 스토리지에서 기존 발견 목록 불러오기
      const foundMarkersData = localStorage.getItem('qrFoundMarkers') || '[]';
      let foundList;
      try {
        foundList = JSON.parse(foundMarkersData);
      } catch (e) {
        console.error('로컬 스토리지 데이터 파싱 오류:', e);
        foundList = [];
      }

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

    processQRCode();
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
    if (foundMarkers < 1) return 1;
    else if (foundMarkers < 3) return 3 - foundMarkers;
    else if (foundMarkers < 6) return 6 - foundMarkers;
  }

  return (
    <div className='flex flex-col w-full min-h-screen'>
      <QRHeader showBackButton={false} backTo='/qrtreasure/map' />

      <div id='nftcapture' className='flex-grow flex items-center justify-center p-8'>
        <div className='bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center'>
          <h2 className='text-2xl font-bold mb-6'>보물찾기 성공!</h2>

          <img src='/fullshot.png' alt='캐릭터' className='w-full h-auto' />
          <p className='pt-8 text-[20px] font-bold '>지금까지 {foundMarkers}개의 보물을 찾았어요</p>

          <p className=' py-6 text-[18px]'>
            {remainCount()}개만 더 찾으면 <br />
            {`<`}다음 선물{`>`}을 받을 수 있어요!
          </p>

          <Link
            to='/qrtreasure/map'
            className='flex justify-center text-[18px] bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition duration-200 '
          >
            보물 더 찾기
          </Link>

          <button
            onClick={() => captureAndShare()}
            className='my-4 w-full justify-center text-[18px] bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition duration-200 '
          >
            인스타에 공유하고 선물 받기
          </button>

          <p className='text-[13px]'>
            ※ 인스타그램에 공유하실 때 <br /> “@dokpami.nft”를 태그해주세요!
          </p>
        </div>
      </div>
    </div>
  );
}
