import { useState } from 'react';
import KakaoMap from './_KakaoMap';

interface Location {
  title: string;
  lat: number;
  lng: number;
  checked: boolean;
}

declare global {
  interface Window {
    kakao: any;
  }
}

export default function QRTreasure() {
  const [locations, setLocations] = useState<Location[]>([
    { title: '전체 보기', lat: 37.56357067982097, lng: 126.93782429801615, checked: false },
    { title: '중도', lat: 37.563743700106016, lng: 126.93702902334138, checked: false },
    { title: '백주년기념관', lat: 37.5620796504564, lng: 126.93805190387629, checked: false },
    { title: '경영관', lat: 37.56483268505036, lng: 126.93899474018608, checked: false },
    { title: '대운동장', lat: 37.56226633676402, lng: 126.93341687864819, checked: false },
    { title: '독수리상', lat: 37.56216023139825, lng: 126.93708977744795, checked: false },
    { title: '학관앞', lat: 37.56348529465163, lng: 126.93822334786489, checked: false },
  ]);

  const [selectedLocation, setSelectedLocation] = useState(locations[0]);

  // 마커 클릭 시 해당 마커의 checked 값 업데이트
  const handleMarkerClick = (title: string) => {
    // title 이름의 마커 받음
    setLocations(
      (
        prev, // 상태를 업데이트, 반영
      ) =>
        prev.map(
          (
            location, // ??
          ) => (location.title === title ? { ...location, checked: true } : location),
        ),
    );
  };

  return (
    <div className='max-w-4xl mx-auto p-4'>
      <h1 className='text-2xl font-bold mb-6'>카카오맵 테스트</h1>

      <div className='mb-4'>
        <h2 className='text-xl font-semibold mb-2'>위치 선택</h2>
        <div className='flex flex-wrap gap-2'>
          {locations.map((location, index) => (
            <button
              key={index}
              className={`px-4 py-2 rounded ${
                selectedLocation.title === location.title ? 'bg-blue-500 text-white' : 'bg-gray-200'
              }`}
              onClick={() => setSelectedLocation(location)}
            >
              {location.title}
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
          onMarkerClick={handleMarkerClick} // 마커 클릭 이벤트
        />
      </div>

      <div className='mt-4 p-4 bg-gray-100 rounded-lg'>
        <h3 className='font-semibold'>선택된 위치 정보</h3>
        <p>
          <strong>이름:</strong> {selectedLocation.title}
        </p>
        <p>
          <strong>위도:</strong> {selectedLocation.lat}
        </p>
        <p>
          <strong>경도:</strong> {selectedLocation.lng}
        </p>
      </div>
    </div>
  );
}
