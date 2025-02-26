import { useEffect, useRef, useState } from 'react';

interface KakaoMapProps {
  width?: string;
  height?: string;
  latitude?: number;
  longitude?: number;
  level?: number;
}

declare global {
  interface Window {
    kakao: any;
  }
}

export default function TestQR() {
  const [locations, setLocations] = useState([
    { title: '카카오', lat: 37.566826, lng: 126.9786567 },
    { title: '서울역', lat: 37.556026, lng: 126.972559 },
    { title: '남산타워', lat: 37.551046, lng: 126.988169 },
  ]);

  const [selectedLocation, setSelectedLocation] = useState(locations[0]);

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

function KakaoMap({
  width = '100%',
  height = '400px',
  latitude = 37.566826,
  longitude = 126.9786567,
  level = 3,
}: KakaoMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 카카오맵 스크립트 동적 로드
  useEffect(() => {
    // 이미 로드된 경우 중복 방지
    if (document.getElementById('kakao-map-sdk')) {
      if (window.kakao && window.kakao.maps) {
        setIsScriptLoaded(true);
      }
      return;
    }

    const KAKAO_MAP_API_KEY = import.meta.env.VITE_KAKAO_MAP_API_KEY;
    const script = document.createElement('script');
    script.id = 'kakao-map-sdk';
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_MAP_API_KEY}&autoload=false`;
    script.async = true;

    script.onload = () => {
      console.log('카카오맵 스크립트 로드 성공');
      window.kakao.maps.load(() => {
        console.log('카카오맵 초기화 완료');
        setIsScriptLoaded(true);
      });
    };

    script.onerror = (e) => {
      console.error('카카오맵 스크립트 로드 실패:', e);
    };

    document.head.appendChild(script);

    return () => {};
  }, []);

  // 지도 초기화
  useEffect(() => {
    if (!isScriptLoaded || !mapRef.current) return;

    try {
      console.log('지도 객체 생성 시작');
      const options = {
        center: new window.kakao.maps.LatLng(latitude, longitude),
        level: level,
      };

      const map = new window.kakao.maps.Map(mapRef.current, options);
      console.log('지도 생성됨');

      // 마커 추가
      const markerPosition = new window.kakao.maps.LatLng(latitude, longitude);
      const marker = new window.kakao.maps.Marker({
        position: markerPosition,
      });

      marker.setMap(map);
      console.log('마커 추가됨');

      // 지도 크기 조정 이벤트 발생
      setTimeout(() => {
        window.dispatchEvent(new Event('resize'));
      }, 100);
    } catch (e) {
      console.error('지도 초기화 오류:', e);
      setError('지도를 표시하는데 실패했습니다');
    }
  }, [latitude, longitude, level, isScriptLoaded]);

  return (
    <div className='w-full'>
      {error ? (
        <div className='text-red-500 text-center py-4'>{error}</div>
      ) : !isScriptLoaded ? (
        <div className='text-center py-4'>지도를 불러오는 중...</div>
      ) : null}
      <div
        ref={mapRef}
        style={{ width, height, display: error ? 'none' : 'block' }}
        className='border rounded-lg'
      />
    </div>
  );
}
