import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './egg-styles.css';

export default function About() {
  const navigate = useNavigate();
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    // 애니메이션이 완료된 후에 페이지 이동
    const timer = setTimeout(() => {
      setAnimationComplete(true); // 애니메이션 완료 후 상태 변경
    }, 9000); // 5초 + 2초 + 2초 = 9초 후에 페이지 이동

    return () => clearTimeout(timer);
  }, []); // 처음 마운트될 때만 실행

  useEffect(() => {
    if (animationComplete) {
      navigate('/AboutNext'); // 애니메이션 완료 후 라우팅
    }
  }, [animationComplete, navigate]);

  return (
    <>
      <div className={animationComplete ? '' : 'fade-to-white'}>
        <div className='h-screen flex justify-center items-center'>
          <img src='/egg.png' alt='falling egg' className='egg-img ml-50' />
        </div>
        <div className='flex justify-center items-end'>
          <img className='w-full max-w-[600px] h-auto' src='land.png' />
        </div>
      </div>
    </>
  );
}
