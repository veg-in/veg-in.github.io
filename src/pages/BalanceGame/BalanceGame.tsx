import { useEffect, useState } from 'react';
import { BalanceGameQuestions } from '@/data/BalanceGameQuestions';
import BalanceChoiceButton from './_BalanceChoiceButton';
import ResultPage from './_ResultPage';

interface BalanceGameResult {
  // id: string;
  user: string;
  result: string;
}

export default function BalanceGame() {
  const gameQuestions = BalanceGameQuestions;
  const [results, setResults] = useState<string[]>([]);
  const [finalResult, setFinalResult] = useState('');

  const handleChoiceButton = (choiceType: string) => {
    setResults((prev) => [...prev, choiceType]);
  };

  useEffect(() => {
    // 모든 질문에 답변 완료 시, 최종 유형 계산
    if (results.length === gameQuestions.length) {
      const resultCount: Record<string, number> = {};
      results.forEach((type) => {
        resultCount[type] = (resultCount[type] || 0) + 1;
      });

      // 가장 많이 뽑인 결과들 추출
      const maxResultCount = Math.max(...Object.values(resultCount));
      const resultsWithMaxCount = Object.keys(resultCount).filter(
        (key) => resultCount[key] === maxResultCount,
      );

      // indexOf()가 더 낮은(앞선) 쪽이 우선으로 순서 정렬
      // ex) '집순' 타입이 '공부' 타입과 동점일 경우 더 높은 우선 순위로 선택 됨.
      const typePriorityOrder = ['감투', '집순', 'YOLO', '공부', 'N잡', '연애', '갓생', '인싸'];

      resultsWithMaxCount.sort((a, b) => {
        const aTypePriority = typePriorityOrder.indexOf(a);
        const bTypePriority = typePriorityOrder.indexOf(b);
        return aTypePriority - bTypePriority;
      });

      setFinalResult(resultsWithMaxCount[0]);
    }
  }, [results]);

  useEffect(() => {
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
    if (finalResult) {
      sendGameResult({ user: 'unregistered', result: finalResult });
      console.log('보냈음!', finalResult);
    }
  }, [finalResult]);

  return (
    <>
      <h1 className='text-2xl font-bold mb-8'>대학 생활 밸런스 게임</h1>

      {results.length === gameQuestions.length ? (
        finalResult ? (
          /* 모든 질문에 답변을 마쳤다면 결과 표시 */
          <ResultPage finalResult={finalResult} />
        ) : (
          /* 모든 질문 답변 ~ finalResult 나오는데 걸리는 사이 (React Hook 고려)*/
          <div>Loading Final Result..</div>
        )
      ) : (
        /* 모든 질문에 아직 답변을 못 했다면 다음 질문 */
        <div className='flex flex-col items-center'>
          <div className='flex flex-col items-center'>
            <h2 className='text-md'>
              {results.length + 1}/{gameQuestions.length}
            </h2>
            <h2 className='text-2xl mb-8'>{gameQuestions[results.length].topic}</h2>
            <div className='flex flex-col space-y-16'>
              <BalanceChoiceButton
                label={gameQuestions[results.length].selects.top.select}
                onClick={() => {
                  handleChoiceButton(gameQuestions[results.length].selects.top.type);
                }}
              />
              <BalanceChoiceButton
                label={gameQuestions[results.length].selects.bottom.select}
                onClick={() => {
                  handleChoiceButton(gameQuestions[results.length].selects.bottom.type);
                }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
