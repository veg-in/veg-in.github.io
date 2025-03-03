import { useState, useEffect } from 'react';

interface Location {
  title: string;
  lat: number;
  lng: number;
  id?: string;
  hash?: string;
}

export default function QRAdmin() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [baseUrl, setBaseUrl] = useState('');

  useEffect(() => {
    // 위치 데이터 로드
    setLocations([
      {
        title: '중도',
        lat: 37.563743700106016,
        lng: 126.93702902334138,
        id: '1',
        hash: 'a1b2c3d4',
      },
      {
        title: '백주년기념관',
        lat: 37.5620796504564,
        lng: 126.93805190387629,
        id: '2',
        hash: 'e5f6g7h8',
      },
      {
        title: '경영관',
        lat: 37.56483268505036,
        lng: 126.93899474018608,
        id: '3',
        hash: 'i9j0k1l2',
      },
      {
        title: '대운동장',
        lat: 37.56226633676402,
        lng: 126.93341687864819,
        id: '4',
        hash: 'm3n4o5p6',
      },
      {
        title: '독수리상',
        lat: 37.56216023139825,
        lng: 126.93708977744795,
        id: '5',
        hash: 'q7r8s9t0',
      },
      {
        title: '학관앞',
        lat: 37.56348529465163,
        lng: 126.93822334786489,
        id: '6',
        hash: 'u1v2w3x4',
      },
    ]);

    // 현재 사이트의 기본 URL 설정
    setBaseUrl(window.location.origin);
  }, []);

  // QR 코드용 URL 생성
  const generateQRUrl = (location: Location) => {
    if (!location.id || !location.hash) return '';
    return `${baseUrl}/qrtreasure/result?id=${location.id}&hash=${location.hash}`;
  };

  // 모든 저장된 QR 코드 데이터 초기화
  const resetAllQRData = () => {
    if (window.confirm('정말로 모든 QR 코드 발견 데이터를 초기화하시겠습니까?')) {
      localStorage.removeItem('qrFoundMarkers');
      alert('초기화가 완료되었습니다.');
    }
  };

  return (
    <div className='max-w-4xl mx-auto p-6'>
      <h1 className='text-3xl font-bold mb-6'>QR 코드 보물찾기 URL 목록</h1>

      <div className='mb-8'>
        <p className='mb-4'>자유롭게 테스트해보세요~</p>
        <button
          onClick={resetAllQRData}
          className='bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded'
        >
          모든 발견 데이터 초기화
        </button>
      </div>

      <div className='space-y-4'>
        {locations.map((location, index) => (
          <div key={index} className='border rounded-lg p-4 shadow-md'>
            <h3 className='text-xl font-bold mb-2'>{location.title}</h3>
            <p className='text-sm mb-2'>ID: {location.id}</p>
            <p className='text-sm mb-4'>해시: {location.hash}</p>

            <div>
              <p className='font-bold mb-2'>QR 코드에 사용할 URL:</p>
              <div className='bg-gray-100 p-3 rounded break-all'>{generateQRUrl(location)}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
