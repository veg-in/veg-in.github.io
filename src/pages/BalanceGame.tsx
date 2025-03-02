import { useEffect, useState } from 'react';
import { storage } from '@/lib/firebase';
import { ref, getDownloadURL } from 'firebase/storage';
import { BalanceGameQuestions2 } from '@/data/BalanceGame';
import { BalanceGameQuestions } from '@/data/BalanceGame';
import { BalanceGameResults } from '@/data/BalanceGameResult';


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
  const [results, setResults] = useState<string[]>([]); // 누적된 결과(독팜희)들을 담음
  const [finalResult, setFinalResult] = useState('');

  // 1) 질문에서 선택될 때마다 results에 "갓생독팜희" 같은 문자열 push
  const handleChoice = (choiceType: string) => {
    setResults((prev) => [...prev, choiceType]);
    setcurrentQuestionIndex((prev) => prev + 1);
  };

  // 2) 결과 계산
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
    if (results.length === BalanceGameQuestions.length) {
      // 모든 질문에 답변 완료 시, 최종 유형 계산
      const resultCount: Record<string, number> = {};
      results.forEach((type) => {
        resultCount[type] = (resultCount[type] || 0) + 1;
      });

      // 최다 득표수
      const maxCount = Math.max(...Object.values(resultCount));

      // maxCount와 같은 값만 추출
      const keysWithMaxCount = Object.keys(resultCount).filter(
        (key) => resultCount[key] === maxCount
      );

      // 우선순위 정렬
      // ex) '갓생독팜희' -> '갓생'
      // indexOf()가 더 낮은(앞선) 쪽이 우선
      keysWithMaxCount.sort((a, b) => {
        const aPriority = priorityOrder.indexOf(a.replace('독팜희', ''));
        const bPriority = priorityOrder.indexOf(b.replace('독팜희', ''));
        return aPriority - bPriority;
      });

      // 첫 번째가 최종 결과
      setFinalResult(keysWithMaxCount[0]);
    }
  }, [results]);

  // 3) 결과 페이지 생성
  const renderResultPage = () => {
    // 혹시 매핑이 없는 경우 대비
    const info = BalanceGameResults[finalResult] || {
      title: '결과를 찾을 수 없습니다',
      subtitle: '',
      participantRate: '',
      content: '',
    };

    return (
      <>
        <div className='flex flex-col items-center'>
          <h1 className='text-xl mb-8'>결과</h1>
        </div>
        <img src='/result_dokpami.png' className='w-48 h-48 object-contain mb-4' />
        <div className='font-bold text-xl mb-2'>{info.title}</div>
        <div className='text-sm mb-4 italic'>{info.subtitle}</div>
        <div className='mb-2 text-sm'>{info.participantRate}</div>
        <div className='mb-10 whitespace-pre-line text-sm'>{info.content}</div>
        <div className='mb-3 text-sm text-center'>
          @dokpami.nft를 팔로우한 후 <br /> 태그해서 인스타 스토리를 올리면 oo을 받을 수 있어!
        </div>
        <div className='mb-10 text-sm font-bold'>인스타 스토리 이벤트 참여하기</div>
        <button className='mb-8 font-bold text-sm bg-white border-2 border-black rounded px-3 py-2 hover:bg-blue-600'>
          Google Login하고 더 많은 이벤트 참여하기
        </button>
        <div className='text-sm font-bold'>BlockBlock x DOKPAMI</div>
      </>
    );
  };

  return (
    <>
      <h1 className='text-2xl font-bold mb-8'>대학 생활 밸런스 게임</h1>

      {currentQuestionIndex < gameQuestions.length && (
        <div className='flex flex-col items-center'>
          <h2 className='text-lg mb-16'>대학생활 첫 걸음! 수강 신청, 어떻게 할래?</h2>
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
            <h1 className='mb-8'>내가 고른 대학 생활은...</h1>
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
