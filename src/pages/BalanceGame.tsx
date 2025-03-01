import { useEffect, useState } from 'react';
import { storage } from '@/lib/firebase';
import { ref, getBlob, getDownloadURL } from 'firebase/storage';
import { BalanceGameQuestions, BalanceGameQuestions2 } from '@/data/BalanceGame';

// 버튼 컴포넌트 분리
interface BalanceGameButtonProps {
  label: string;
  onClick: () => void;
}

interface BalanceGameResult {
  user: string;
  result: string;
}

const BalanceGameButton = ({ label, onClick }: BalanceGameButtonProps) => {
  return (
    <button
      className='cursor-pointer py-2 w-96 border-2 border-black bg-yellow-400 active:bg-yellow-700 rounded-lg'
      onClick={onClick}
    >
      {label}
    </button>
  );
};

const sendGameResult = async ({ user, result }: BalanceGameResult) => {
  try {
    const response = await fetch('https://backend-60km.onrender.com/balancegame/results', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user, result }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log('Response data:', data);
    } else {
      console.error('Failed to send data:', response.status);
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

const BalanceGame = () => {
  const gameQuestions = BalanceGameQuestions2;
  const [currentQuestionIndex, setcurrentQuestionIndex] = useState(0);
  const [results, setResults] = useState(['']);
  const [finalResult, setfinalResult] = useState('');

  useEffect(() => {
    const storageRef = ref(storage, 'yonsei.png');
    console.log(storageRef);
    const gb = async () => {
      // const blob = await getBlob(storageRef);
      // console.log(blob);
      getDownloadURL(storageRef).then((url) => {
        console.log(url); // 올바른 URL 출력됨
      });
    };
    gb();
  });

  useEffect(() => {
    const resultCount = results.reduce<Record<string, number>>((acc, item) => {
      if (item !== '') {
        acc[item] = (acc[item] || 0) + 1;
      }
      return acc;
    }, {});

    const priorityOrder = ['감투', '집순', 'YOLO', '공부', 'N잡', '연애', '갓생', '인싸'];

    const maxCount = Math.max(...Object.values(resultCount));

    const keysWithMaxCount = Object.keys(resultCount).filter(
      (key) => resultCount[key] === maxCount,
    );

    const sortedKeys = keysWithMaxCount.sort((a, b) => {
      // const aPriority = priorityOrder.indexOf(a.replace('독팜희', ''));
      // const bPriority = priorityOrder.indexOf(b.replace('독팜희', ''));
      const aPriority = priorityOrder.indexOf(a.replace(' 팜쭈', ''));
      const bPriority = priorityOrder.indexOf(b.replace(' 팜쭈', ''));
      return aPriority - bPriority;
    });

    setfinalResult(sortedKeys[0]);
  }, [results]);

  useEffect(() => {
    if (currentQuestionIndex === gameQuestions.length) {
      sendGameResult({ user: 'unregistered', result: finalResult });
      console.log('보냈음!', finalResult);
    }
  }, [currentQuestionIndex]);

  return (
    <>
      <h1 className='text-4xl font-bold mb-8'>대학 생활 밸런스 게임</h1>

      {currentQuestionIndex < gameQuestions.length && (
        <div className='flex flex-col items-center'>
          <h2 className='text-xl mb-16'>대학생활 첫 걸음! 수강 신청, 어떻게 할래?</h2>
          <div className='flex flex-col items-center'>
            <h2 className='text-md'>
              {currentQuestionIndex + 1}/{gameQuestions.length}
            </h2>
            <h2 className='text-2xl mb-8'>{gameQuestions[currentQuestionIndex].topic}</h2>
            <div className='flex flex-col space-y-16'>
              <BalanceGameButton
                label={gameQuestions[currentQuestionIndex].selects.top.select}
                onClick={() => {
                  setcurrentQuestionIndex(currentQuestionIndex + 1);
                  setResults([...results, gameQuestions[currentQuestionIndex].selects.top.type]);
                }}
              />
              <BalanceGameButton
                label={gameQuestions[currentQuestionIndex].selects.bottom.select}
                onClick={() => {
                  setcurrentQuestionIndex(currentQuestionIndex + 1);
                  setResults([...results, gameQuestions[currentQuestionIndex].selects.bottom.type]);
                }}
              />
            </div>
          </div>
        </div>
      )}
      {currentQuestionIndex === gameQuestions.length && (
        <>
          <div className='flex flex-col items-center'>
            <h1 className='text-xl mb-8'>결과</h1>
          </div>
          <img src='/result_dokpami.png' className='w-48 h-48 object-contain mb-4' />
          <div className='font-bold text-xl mb-5'>
            {/*독수리 설명 문구*/} {finalResult}
          </div>
          <div className='mb-10 text-sm'>전체 참여자 중 약 00%가 이 유형이에요!</div>
          <div className='mb-10'>결과 설명{/*결과 설명*/}</div>
          <div className='mb-3 text-sm text-center'>
            @dokpami.nft를 팔로우한 후 <br /> 태그해서 인스타 스토리를 올리면 oo을 받을 수 있어!
          </div>
          <div className='mb-10 text-sm font-bold'>인스타 스토리 이벤트 참여하기</div>
          <button className='mb-8 font-bold text-sm bg-white border-2 border-black rounded px-3 py-2 hover:bg-blue-600'>
            Google Login하고 더 많은 이벤트 참여하기
          </button>
          <div className='text-sm font-bold'>BlockBlock x DOKPAMI</div>
        </>
      )}
    </>
  );
};

export default BalanceGame;
