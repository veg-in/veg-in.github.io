import { useEffect, useRef, useState } from 'react';

interface KakaoMapProps {
  width?: string;
  height?: string;
  latitude?: number;
  longitude?: number;
  level?: number;
  locations: { title: string; lat: number; lng: number; checked: boolean; description?: string }[];
  showAll: boolean;
  onMarkerClick: (title: string) => void; // 클릭 이벤트 전달
}

export default function KakaoMap({
  width = '100%',
  height = '400px',
  latitude = 37.563543608193534,
  longitude = 126.93774509060312,
  level = 3,
  locations,
  showAll,
  onMarkerClick, // 마커 클릭 이벤트
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

      const markerImgSrc = '/marker_white.png';
      const checkedMarkerImgSrc = '/marker_red.png'; // 선택된 마커 이미지
      const normalSize = new window.kakao.maps.Size(30, 45); // 기본 마커 사이즈
      const hoverSize = new window.kakao.maps.Size(32, 48); // 마우스 오버시 마커 사이즈
      const checkedSize = new window.kakao.maps.Size(30, 45); // 체크된 마커 사이즈

      const normalMarkerImg = new window.kakao.maps.MarkerImage(markerImgSrc, normalSize); // 기본 마커 이미지를 생성
      const hoverMarkerImg = new window.kakao.maps.MarkerImage(markerImgSrc, hoverSize); // 호버 마커 이미지
      const checkedMarkerImg = new window.kakao.maps.MarkerImage(checkedMarkerImgSrc, checkedSize); // 체크된 마커 이미지

      if (showAll) {
        // "전체 보기" 클릭하면 모든 마커 표시
        const bounds = new window.kakao.maps.LatLngBounds(); // 여러 개 좌표를 포함하는 경계 상자 생성

        let map = new window.kakao.maps.Map(mapRef.current, {
          center: new window.kakao.maps.LatLng(latitude, longitude),
          level,
        });

        locations.forEach((location) => {
          if (location.title === '전체 보기') return; // 전체 보기 마커는 표시하지 않음

          const markerPosition = new window.kakao.maps.LatLng(location.lat, location.lng);
          const marker = new window.kakao.maps.Marker({
            position: markerPosition,
            image: location.checked ? checkedMarkerImg : normalMarkerImg,
          });

          marker.setMap(map);
          bounds.extend(markerPosition); // 모든 마커가 지도 안에 들어오도록

          window.kakao.maps.event.addListener(marker, 'mouseover', () => {
            if (!location.checked) marker.setImage(hoverMarkerImg);
          });

          window.kakao.maps.event.addListener(marker, 'mouseout', () => {
            if (!location.checked) marker.setImage(normalMarkerImg);
          });

          window.kakao.maps.event.addListener(marker, 'click', () => {
            // 마커 클릭 시 장소 정보만 표시 (체크 기능 제거)
            onMarkerClick(location.title);
          });
        });

        if (!bounds.isEmpty()) {
          map.setBounds(bounds); // 지도 크기 자동 조정
        }
        console.log('모든 마커 추가됨');
      } else {
        // 장소 선택 시, 마커 하나 표시
        const selectedLoc = locations.find((loc) => loc.lat === latitude && loc.lng === longitude);
        if (!selectedLoc || selectedLoc.title === '전체 보기') return;

        const markerPosition = new window.kakao.maps.LatLng(latitude, longitude);
        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
          image: selectedLoc.checked ? checkedMarkerImg : normalMarkerImg,
        });

        window.kakao.maps.event.addListener(marker, 'mouseover', () => {
          if (!selectedLoc.checked) marker.setImage(hoverMarkerImg);
        });

        window.kakao.maps.event.addListener(marker, 'mouseout', () => {
          if (!selectedLoc.checked) marker.setImage(normalMarkerImg);
        });

        window.kakao.maps.event.addListener(marker, 'click', () => {
          // 마커 클릭 시 장소 정보만 표시 (체크 기능 제거)
          onMarkerClick(selectedLoc.title);
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
