import { useState, useEffect } from 'react';
import KakaoMap from './_KakaoMap';
import QRHeader from './_QRHeader';

interface Location {
  title: string;
  lat: number;
  lng: number;
  checked: boolean;
  id?: string;
  hash?: string;
  description?: string;
}

declare global {
  interface Window {
    kakao: any;
  }
}

export default function QRTreasure() {
  const [locations, setLocations] = useState<Location[]>([
    { title: '전체 보기', lat: 37.56357067982097, lng: 126.93782429801615, checked: false },
    {
      title: '중도',
      lat: 37.563743700106016,
      lng: 126.93702902334138,
      checked: false,
      id: '1',
      hash: 'a1b2c3d4',
      description: '설명어쩌구',
    },
    {
      title: '백주년기념관',
      lat: 37.5620796504564,
      lng: 126.93805190387629,
      checked: false,
      id: '2',
      hash: 'e5f6g7h8',
      description: '설명어쩌구',
    },
    {
      title: '경영관',
      lat: 37.56483268505036,
      lng: 126.93899474018608,
      checked: false,
      id: '3',
      hash: 'i9j0k1l2',
      description: '설명어쩌구',
    },
    {
      title: '대운동장',
      lat: 37.56226633676402,
      lng: 126.93341687864819,
      checked: false,
      id: '4',
      hash: 'm3n4o5p6',
      description: '설명어쩌구',
    },
    {
      title: '독수리상',
      lat: 37.56216023139825,
      lng: 126.93708977744795,
      checked: false,
      id: '5',
      hash: 'q7r8s9t0',
      description: '설명어쩌구',
    },
    {
      title: '학관앞',
      lat: 37.56348529465163,
      lng: 126.93822334786489,
      checked: false,
      id: '6',
      hash: 'u1v2w3x4',
      description: '설명어쩌구',
    },
  ]);

  const [selectedLocation, setSelectedLocation] = useState(locations[0]);
  const [, setFoundCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  // const totalMarkers = locations.length - 1; // "전체 보기" 제외

  // 로컬 스토리지에서 발견한 마커 정보 로딩
  useEffect(() => {
    const loadFoundMarkers = () => {
      try {
        const foundMarkersData = localStorage.getItem('qrFoundMarkers') || '[]';
        const foundList = JSON.parse(foundMarkersData) as string[];

        // 발견한 마커 표시
        const updatedLocations = locations.map((location) => {
          if (location.id && location.hash) {
            const markerKey = `${location.id}_${location.hash}`;
            return {
              ...location,
              checked: foundList.includes(markerKey),
            };
          }
          return location;
        });

        setLocations(updatedLocations);

        // 발견한 마커 수 계산
        const foundCount = foundList.length;
        setFoundCount(foundCount);
      } catch (error) {
        console.error('마커 정보 로딩 오류:', error);
      }
    };

    loadFoundMarkers();
  }, []);

  // 마커 클릭 시 해당 장소 정보 표시
  const handleMarkerClick = (title: string) => {
    const location = locations.find((loc) => loc.title === title);
    if (location) {
      setSelectedLocation(location);
    }
  };

  return (
    <div className='flex flex-col max-w-4xl mx-auto '>
      {/* 공통 헤더 - 뒤로가기 버튼 활성화 */}
      <QRHeader showBackButton={true} backTo='/qrtreasure' />

      <div className='pt-[80px]'>
        <div className='mb-4'>
          <h2 className='text-xl font-semibold mb-2'>보물 위치 찾기</h2>
          <div className='flex flex-wrap gap-2'>
            {locations.map((location, index) => (
              <button
                key={index}
                className={`px-4 py-2 rounded flex items-center font-semibold ${
                  selectedLocation.title === location.title ? 'bg-blue-500 text-white' : 'bg-white'
                } ${location.checked ? 'border-2 border-red-500' : ''}`}
                onClick={() => setSelectedLocation(location)}
              >
                {location.title}
                {location.checked && <span className='ml-2 text-red-500'>✓</span>}
              </button>
            ))}
          </div>
        </div>

        <div className='rounded-lg overflow-hidden border border-gray-300'>
          <KakaoMap
            width='100%'
            height='400px'
            latitude={selectedLocation.lat}
            longitude={selectedLocation.lng}
            level={3}
            locations={locations}
            showAll={selectedLocation.title === '전체 보기'}
            onMarkerClick={handleMarkerClick}
          />
        </div>

        <div className='mt-4 flex rounded-lg'>
          <img src='/src/assets/profile.png' alt='profile' className='w-1/5 h-fit' />
          <div className='w-full bg-white ml-3 p-2 rounded-xl'>
            {selectedLocation.title !== '전체 보기' ? (
              <>
                <p className='text-xl font-bold mb-2'>{selectedLocation.title}</p>
                <p className='mb-3'>{selectedLocation.description || '설명이 없습니다.'}</p>
                <div className='text-sm'>
                  <div>
                    {selectedLocation.id && (
                      <p>
                        <strong>발견 여부:</strong>{' '}
                        {selectedLocation.checked ? '발견함 ✓' : '아직 발견하지 않음'}
                      </p>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <p>지도에서 위치를 선택하거나 마커를 클릭하면 해당 장소의 정보가 표시됩니다.</p>
            )}
          </div>
        </div>

        <div className='mt-4 border-2 p-4 rounded-xl w-full bg-[#FFFDF2]'>
          <div className='flex justify-between'>
            <h3 className='text-[18px] font-bold'>이벤트 참여 방법 알아보기</h3>
            <button onClick={() => setIsOpen(!isOpen)}>더보기</button>
          </div>
          {isOpen ? (
            <>
              <br />
              <div className='text-[14px] text-[#191F28] font-regular'>
                <p className='text-[16px] font-bold underline'>이벤트 참여 방법</p>
                <p>1. 📍 지도에서 위치 마크 보고 QR코드 찾기</p>
                <p>2. 📸 카메라로 QR코드 스캔하기</p>
                <p>3. 📲 공유하기 버튼을 통해 인스타에 공유하고 @dokpami.nft 태그하기</p>
                <p>4. 🔍 다음 QR코드를 찾아 더 나은 선물 받기</p>
              </div>
              <br />
              <div className='text-[14px] text-[#191F28] font-regula'>
                <p className='text-[16px] font-bold underline'>상품 안내</p>
                <p>· 6개 QR코드 중 1개 이상 스캔 시 🥛바나나우유 10명 (추첨)</p>
                <p>· 6개 QR코드 중 3개 이상 스캔 시 ☕스타벅스 커피 3명 (추첨)</p>
                <p>· 6개 QR코드 모두 스캔 시 🏆선착순 1명에게 스탠리 텀블러 지급</p>
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}
