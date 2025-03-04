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
  const [foundCount, setFoundCount] = useState(0);
  const totalMarkers = locations.length - 1; // "전체 보기" 제외

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
    <div className='flex flex-col max-w-4xl mx-auto'>
      {/* 공통 헤더 - 뒤로가기 버튼 활성화 */}
      <QRHeader showBackButton={true} backTo='/qrtreasure' />

      <div className='p-4'>
        <div className='mb-4 bg-blue-100 p-4 rounded-lg'>
          <p className='font-semibold'>
            찾은 마커: {foundCount}/{totalMarkers}
          </p>
          <div className='w-full bg-gray-300 h-4 rounded-full mt-2'>
            <div
              className='bg-blue-500 h-4 rounded-full'
              style={{ width: `${(foundCount / totalMarkers) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className='mb-4'>
          <h2 className='text-xl font-semibold mb-2'>위치 선택</h2>
          <div className='flex flex-wrap gap-2'>
            {locations.map((location, index) => (
              <button
                key={index}
                className={`px-4 py-2 rounded flex items-center ${
                  selectedLocation.title === location.title
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200'
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

        <div className='mt-4 p-4 bg-gray-100 rounded-lg'>
          <h3 className='font-semibold text-lg mb-2'>장소 정보</h3>
          {selectedLocation.title !== '전체 보기' ? (
            <>
              <p className='text-xl font-bold mb-2'>{selectedLocation.title}</p>
              <p className='mb-3'>{selectedLocation.description || '설명이 없습니다.'}</p>
              <div className='grid grid-cols-2 gap-2 text-sm'>
                <div>
                  <p>
                    <strong>위도:</strong> {selectedLocation.lat}
                  </p>
                  <p>
                    <strong>경도:</strong> {selectedLocation.lng}
                  </p>
                </div>
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
    </div>
  );
}
