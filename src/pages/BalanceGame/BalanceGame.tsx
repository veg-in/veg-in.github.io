// BalanceGame.tsx
import React, { useEffect, useState, useRef } from 'react'; // useRef 추가
import { storage } from '@/lib/firebase';
import { ref, getDownloadURL } from 'firebase/storage';
import { BalanceGameQuestions2 } from '@/data/BalanceGame';
import { BalanceGameResults } from '@/data/BalanceGameResult';
import BalanceGameButton from './_BalanceGameButton';
import BalanceGameResultCapture from './BalanceGameResultCapture'; // 새 컴포넌트 임포트

interface BalanceGameResult {
  user: string;
  result: string;
}

const priorityOrder = ['감투', '집순', 'YOLO', '공부', 'N잡', '연애', '갓생', '인싸'];

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

export default function BalanceGame() {
  const gameQuestions = BalanceGameQuestions2;
  const [currentQuestionIndex, setcurrentQuestionIndex] = useState(0);
  const [results, setResults] = useState<string[]>([]);
  const [finalResult, setFinalResult] = useState('');
  const resultPageRef = useRef<HTMLDivElement | null>(null); // resultPageRef 추가

  useEffect(() => {
    const storageRef = ref(storage, 'yonsei.png');
    console.log(storageRef);
    const gb = async () => {
      getDownloadURL(storageRef).then((url) => {
        console.log(url);
      });
    };
    gb();
  });

  const handleChoice = (choiceType: string) => {
    setResults((prev) => [...prev, choiceType]);
    setcurrentQuestionIndex((prev) => prev + 1);
  };

  useEffect(() => {
    if (results.length === gameQuestions.length) {
      const resultCount: Record<string, number> = {};
      results.forEach((type) => {
        resultCount[type] = (resultCount[type] || 0) + 1;
      });
      const maxCount = Math.max(...Object.values(resultCount));
      const keysWithMaxCount = Object.keys(resultCount).filter(
        (key) => resultCount[key] === maxCount,
      );
      keysWithMaxCount.sort((a, b) => {
        const aPriority = priorityOrder.indexOf(a.replace('독팜희', ''));
        const bPriority = priorityOrder.indexOf(b.replace('독팜희', ''));
        return aPriority - bPriority;
      });
      setFinalResult(keysWithMaxCount[0]);
    }
  }, [results]);

  const renderResultPage = () => {
    const resultKey = Object.keys(BalanceGameResults).find((key) =>
      key.includes(finalResult.replace(' 팜쭈', '')),
    );
    const info = resultKey
      ? BalanceGameResults[resultKey]
      : {
          title: '결과를 찾을 수 없습니다',
          subtitle: '',
          participantRate: '',
          content: '',
        };

    return (
      <>
        <div id="result-page" ref={resultPageRef} className="flex flex-col items-center">
          <h1 className="mb-8">내가 고른 대학 생활은...</h1>
          <img src="/result_dokpami.png" className="w-48 h-48 object-contain mb-4" />
          <div className="font-bold text-xl mb-5">{info.title}</div>
          <div className="text-sm mb-4">{info.subtitle}</div>
          <div className="mb-2 text-sm">{info.participantRate}</div>
          <div className="mb-10 whitespace-pre-line text-sm">{info.content}</div>
        </div>
        <BalanceGameResultCapture resultPageRef={resultPageRef} /> {/* 새 컴포넌트 추가 */}
        <button className="mb-8 font-bold text-sm bg-white border-2 border-black rounded px-3 py-2 hover:bg-blue-600">
          Google Login하고 더 많은 이벤트 참여하기
        </button>
        <div className="text-sm font-bold">BlockBlock x DOKPAMI</div>
      </>
    );
  };

  useEffect(() => {
    if (currentQuestionIndex === gameQuestions.length && finalResult) {
      sendGameResult({ user: 'unregistered', result: finalResult });
      console.log('보냈음!', finalResult);
    }
  }, [currentQuestionIndex, finalResult]);

  return (
    <>
      <h1 className="text-2xl font-bold mb-8">대학 생활 밸런스 게임</h1>
      {currentQuestionIndex >= gameQuestions.length ? (
        renderResultPage()
      ) : (
        <div className="flex flex-col items-center">
          <div className="flex flex-col items-center">
            <h2 className="text-md">
              {currentQuestionIndex + 1}/{gameQuestions.length}
            </h2>
            <h2 className="text-2xl mb-8">{gameQuestions[currentQuestionIndex].topic}</h2>
            <div className="flex flex-col space-y-16">
              <BalanceGameButton
                label={gameQuestions[currentQuestionIndex].selects.top.select}
                onClick={() => {
                  handleChoice(gameQuestions[currentQuestionIndex].selects.top.type);
                }}
              />
              <BalanceGameButton
                label={gameQuestions[currentQuestionIndex].selects.bottom.select}
                onClick={() => {
                  handleChoice(gameQuestions[currentQuestionIndex].selects.bottom.type);
                }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}