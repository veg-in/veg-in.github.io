import React from 'react';
import html2canvas from 'html2canvas';

interface BalanceGameResultCaptureProps {
  resultPageRef: React.RefObject<HTMLDivElement | null>;
}

const BalanceGameResultCapture: React.FC<BalanceGameResultCaptureProps> = ({ resultPageRef }) => {
  const handleCapture = () => {
    if (resultPageRef.current) {
      html2canvas(resultPageRef.current as HTMLDivElement, { useCORS: true }).then((canvas) => {
        const link = document.createElement('a');
        link.download = 'balance_game_result.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
      });
    }
  };

  const handleInstagramLink = () => {
    window.open('https://www.instagram.com/dokpami.nft/', '_blank');
  };

  return (
    <div className='flex flex-col items-center mt-8'>
      <button
        onClick={handleCapture}
        className='mb-4 font-bold text-sm bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600'
      >
        결과 페이지 캡처하기
      </button>
      <button
        onClick={handleInstagramLink}
        className='mb-4 font-bold text-sm bg-pink-500 text-white rounded px-4 py-2 hover:bg-pink-600'
      >
        인스타에 스토리 공유하기
      </button>
      <div className='text-sm text-center mb-4'>
        캡처한 이미지를 다운로드한 후, <br />
        인스타그램에서 @dokpami.nft를 팔로우하고 태그하여 스토리에 공유하세요!
      </div>
    </div>
  );
};

export default BalanceGameResultCapture;
