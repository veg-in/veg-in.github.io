import { useEffect, useRef, useState } from 'react';

interface KakaoMapProps {
  width?: string;
  height?: string;
  latitude?: number;
  longitude?: number;
  level?: number;
  locations: { title: string; lat: number; lng: number }[];
  showAll: boolean;
}

declare global {
  interface Window {
    kakao: any;
  }
}

export default function TestQR() {
  const locations = [
    { title: '전체 보기', lat: 37.56357067982097, lng: 126.93782429801615 },
    { title: '중도', lat: 37.563743700106016, lng: 126.93702902334138 },
    { title: '백주년기념관', lat: 37.5620796504564, lng: 126.93805190387629 },
    { title: '경영관', lat: 37.56483268505036, lng: 126.93899474018608 },
    { title: '대운동장', lat: 37.56226633676402, lng: 126.93341687864819 },
    { title: '독수리상', lat: 37.56216023139825, lng: 126.93708977744795 },
    { title: '학관앞', lat: 37.56348529465163, lng: 126.93822334786489 },
  ];

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
              className={`px-4 py-2 rounded ${selectedLocation.title === location.title ? 'bg-blue-500 text-white' : 'bg-gray-200'
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
  latitude = 37.563543608193534,
  longitude = 126.93774509060312,
  level = 3,
  locations,
  showAll,
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

    return () => { };
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

    
      const markerImgSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";
      const normalSize = new window.kakao.maps.Size(24, 35); // 기본 마커 사이즈   
      const hoverSize = new window.kakao.maps.Size(32, 45); // 마우스 오버시 마커 사이즈

      const normalMarkerImg = new window.kakao.maps.MarkerImage(markerImgSrc, normalSize); // 기본 마커 이미지를 생성
      const hoverMarkerImg = new window.kakao.maps.MarkerImage(markerImgSrc, hoverSize); // 기본 마커 이미지를 생성

      if (showAll) {
        // "전체 보기" 클릭하면 모든 마커 표시
        const bounds = new window.kakao.maps.LatLngBounds(); // 여러 개 좌표를 포함하는 경계 상자 생성

        locations.forEach((location) => {
          const markerPosition = new window.kakao.maps.LatLng(location.lat, location.lng);
          const marker = new window.kakao.maps.Marker({ position: markerPosition, image: normalMarkerImg });

          marker.setMap(map);
          bounds.extend(markerPosition); // 모든 마커가 지도 안에 들어오도록

          window.kakao.maps.event.addListener(marker, 'mouseover', () => {
            marker.setImage(hoverMarkerImg); // 마커 크기 증가
          });

          window.kakao.maps.event.addListener(marker, 'mouseout', () => {
            marker.setImage(normalMarkerImg); // 원래 크기로 복구
          });
        });

        map.setBounds(bounds); // 지도 크기 자동 조정
        console.log('모든 마커 추가됨');
      } else {
        // 장소 선택 시, 마커 하나 표시
        const markerPosition = new window.kakao.maps.LatLng(latitude, longitude);
        const marker = new window.kakao.maps.Marker({ position: markerPosition, image: normalMarkerImg });
        window.kakao.maps.event.addListener(marker, 'mouseover', () => {
          marker.setImage(hoverMarkerImg); // 마커 크기 증가
        });

        window.kakao.maps.event.addListener(marker, 'mouseout', () => {
          marker.setImage(normalMarkerImg); // 원래 크기로 복구
        });
        marker.setMap(map);
        console.log('단일 마커 추가됨');
      }
      // 지도 크기 조정 이벤트 발생
      setTimeout(() => {
        window.dispatchEvent(new Event('resize'));
      }, 100);
    } catch (e) {
      console.error('지도 초기화 오류:', e);
      setError('지도를 표시하는데 실패했습니다');
    }
  }, [latitude, longitude, level, isScriptLoaded, locations, showAll]);



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
