import html2canvas from 'html2canvas-pro';

export async function captureAndShare() {
  const element = document.getElementById('nftcapture');

  if (element) {
    try {
      // 📸 html2canvas로 캡처
      const canvas = await html2canvas(element, {
        useCORS: true,
        backgroundColor: null, // 투명 배경 유지
        scale: 2, // 고해상도 캡처
      });

      // 🖼 캡처된 캔버스를 Blob으로 변환
      const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/png'));
      if (!blob) {
        alert('이미지를 캡처할 수 없습니다.');
        return;
      }

      // 📁 Blob을 파일로 변환
      const file = new File([blob], 'nftcapture.png', { type: 'image/png' });

      // 🌍 Web Share API를 통한 공유
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        try {
          await navigator.share({
            files: [file],
            title: '보물찾기 성공!',
            text: '나도 보물을 찾았어요! 🎉 #dokpami #NFT',
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
}

export default captureAndShare;
