import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
interface QRHeaderProps {
  showBackButton?: boolean;
  backTo?: string;
  rightContent?: ReactNode;
  title?: string;
}

/**
 * QR 보물찾기 관련 페이지에서 사용하는 공통 헤더 컴포넌트
 * @param showBackButton - 뒤로가기 버튼 표시 여부
 * @param backTo - 뒤로가기 버튼 클릭 시 이동할 경로 (없으면 브라우저 히스토리 사용)
 * @param rightContent - 헤더 오른쪽에 표시할 추가 콘텐츠 (버튼, 메뉴 등)
 * @param title - 헤더 타이틀 (기본값: "QR 보물찾기 이벤트")
 */
const QRHeader: React.FC<QRHeaderProps> = ({
  showBackButton = false,
  backTo,
  rightContent,
  title = 'QR 보물찾기 이벤트',
}) => {
  const navigate = useNavigate();
  const handleBack = () => {
    if (backTo) {
      navigate(backTo);
    } else {
      navigate(-1);
    }
  };

  return (
    <div className='sticky top-5 z-50 w-full pt-2 pb-3'>
      <div className='flex items-center justify-between'>
        {/* 왼쪽 영역 (뒤로가기 버튼) */}
        <div className='w-10'>
          {showBackButton && (
            <button
              onClick={handleBack}
              className='cursor-pointer p-1 rounded-full hover:bg-blue-200 transition-colors'
              aria-label='뒤로 가기'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              >
                <polyline points='15 18 9 12 15 6' />
              </svg>
            </button>
          )}
        </div>
        {/* 중앙 영역 (타이틀) */}
        <div className='flex-grow flex justify-center font-Jua'>
          <div className='bg-[#FFE670] rounded-full px-6 py-2 shadow-md'>
            <h1 className='font-bold text-lg md:text-xl text-center'>{title}</h1>
          </div>
        </div>
        {/* 오른쪽 영역 (추가 콘텐츠) */}
        <div className='w-10 flex justify-end'>{rightContent}</div>
      </div>
    </div>
  );
};

export default QRHeader;
