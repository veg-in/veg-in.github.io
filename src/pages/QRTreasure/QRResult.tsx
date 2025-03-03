import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function QRResult() {
  const navigate = useNavigate();
  const location = useLocation();
  const [foundMarkers, setFoundMarkers] = useState<number>(0);
  const [totalMarkers, setTotalMarkers] = useState<number>(0);
  const [newMarkerFound, setNewMarkerFound] = useState<boolean>(false);
  const [markerName, setMarkerName] = useState<string>('');

  useEffect(() => {
    // URL에서 마커 번호와 해시 추출
    const searchParams = new URLSearchParams(location.search);
    const markerId = searchParams.get('id');
    const hash = searchParams.get('hash');

    if (!markerId || !hash) {
      navigate('/qrtreasure');
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

    // 현재 스캔한 마커 이름 찾기
    const currentMarker = allMarkers.find((m) => m.id === markerId && m.hash === hash);
    if (currentMarker) {
      setMarkerName(currentMarker.title);
    }

    // 로컬 스토리지에서 기존 발견 목록 불러오기
    const foundMarkersData = localStorage.getItem('qrFoundMarkers') || '[]';
    const foundList = JSON.parse(foundMarkersData) as string[];

    // 마커ID와 해시 조합을 검증
    const markerKey = `${markerId}_${hash}`;

    // 이미 발견한 마커가 아니라면 추가
    if (!foundList.includes(markerKey)) {
      const newFoundList = [...foundList, markerKey];
      localStorage.setItem('qrFoundMarkers', JSON.stringify(newFoundList));
      setFoundMarkers(newFoundList.length);
      setNewMarkerFound(true);
    } else {
      setFoundMarkers(foundList.length);
      setNewMarkerFound(false);
    }

    // 전체 마커 수 설정
    setTotalMarkers(allMarkers.length);
  }, [location.search, navigate]);

  const handleReturnToMap = () => {
    navigate('/qrtreasure');
  };

  return (
    <div className='flex flex-col items-center justify-center p-8 h-full'>
      <div className='bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center'>
        <h1 className='text-3xl font-bold mb-6'>QR 코드 발견!</h1>

        {newMarkerFound ? (
          <div className='mb-6 p-4 bg-green-100 rounded-lg'>
            <p className='text-lg font-bold text-green-700'>새로운 장소를 발견했습니다!</p>
            <p className='text-md text-green-600'>{markerName}</p>
          </div>
        ) : (
          <div className='mb-6 p-4 bg-yellow-100 rounded-lg'>
            <p className='text-lg font-bold text-yellow-700'>이미 발견한 장소입니다.</p>
            <p className='text-md text-yellow-600'>{markerName}</p>
          </div>
        )}

        <div className='mb-8'>
          <p className='text-xl mb-2'>
            총 <span className='font-bold text-blue-600'>{foundMarkers}</span>개의 장소를
            발견했어요!
          </p>

          {foundMarkers < totalMarkers && (
            <p className='text-lg text-gray-600'>
              <span className='font-bold text-red-500'>{totalMarkers - foundMarkers}</span>개를 더
              찾아보세요.
            </p>
          )}

          {foundMarkers >= totalMarkers && (
            <p className='text-lg text-green-600 font-bold'>
              모든 장소를 발견했습니다! 축하합니다! 🎉
            </p>
          )}
        </div>

        <button
          onClick={handleReturnToMap}
          className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition duration-200 w-full'
        >
          지도로 돌아가기
        </button>
      </div>
    </div>
  );
}
