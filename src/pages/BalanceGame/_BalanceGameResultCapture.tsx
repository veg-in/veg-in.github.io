import React from 'react';
import html2canvas from 'html2canvas';
import { RefObject } from 'react';

interface BalanceGameResultCaptureProps {
  resultPageRef: RefObject<HTMLDivElement | null>;
}

const BalanceGameResultCapture: React.FC<BalanceGameResultCaptureProps> = ({ resultPageRef }) => {
  const captureAndShare = async () => {
    const element = resultPageRef.current;
    if (element) {
      try {
        await document.fonts.ready; // 폰트 로딩 대기
        const canvas = await html2canvas(element as HTMLDivElement, {
          useCORS: true,
          scale: 2,
        });
        const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/png'));
        if (!blob) {
          alert('이미지를 캡처할 수 없습니다.');
          return;
        }
        const file = new File([blob], 'balance_game_result.png', { type: 'image/png' });
        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          try {
            await navigator.share({
              files: [file],
              title: '밸런스게임 결과',
              text: '내가 고른 대학 생활은... #dokpami #BalanceGame',
            });
          } catch (error) {
            console.error('공유 중 오류:', error);
            alert('공유에 실패했습니다.');
          }
        } else {
          alert('이 브라우저에서는 공유가 지원되지 않습니다.');
        }
      } catch (error) {
        console.error('캡처 또는 공유 중 오류:', error);
        alert('캡처에 실패했습니다.');
      }
    } else {
      alert('캡처할 요소를 찾을 수 없습니다.');
    }
  };

  return (
    <div className='flex flex-col items-center mt-8'>
      <button
        onClick={captureAndShare}
        className='mb-4 font-bold text-sm bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600'
      >
        결과 공유하기
      </button>
      <div className='text-sm text-center mb-4'>
        공유하기 버튼을 눌러 인스타그램 스토리에 결과를 공유하세요! <br />
        @dokpami.nft를 태그하고 팔로우하면 이벤트에 참여할 수 있습니다.
      </div>
    </div>
  );
};

export default BalanceGameResultCapture;