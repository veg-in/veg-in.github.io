import { useEffect, useState } from 'react';
import { BalanceGameQuestions } from '@/data/BalanceGame';

const BalanceGame = () => {
  const [currentQuestionIndex, setcurrentQuestionIndex] = useState(0);
  const [results, setResults] = useState(['']);
  const [finalResult, setfinalResult] = useState('');

  useEffect(() => {
    const resultCount = results.reduce<Record<string, number>>((acc, item) => {
      if (item !== '') {
        acc[item] = (acc[item] || 0) + 1;
      }
      return acc;
    }, {});

    const priorityOrder = ['감투', '집순', '욜로', '공부', 'N잡', '연애', '갓생', '인싸'];

    const maxCount = Math.max(...Object.values(resultCount));

    const keysWithMaxCount = Object.keys(resultCount).filter(
      (key) => resultCount[key] === maxCount,
    );

    const sortedKeys = keysWithMaxCount.sort((a, b) => {
      const aPriority = priorityOrder.indexOf(a.replace('독팜희', ''));
      const bPriority = priorityOrder.indexOf(b.replace('독팜희', ''));
      return aPriority - bPriority;
    });

    setfinalResult(sortedKeys[0]);
  }, [results]);
  return (
    <>
      <h1 className='text-4xl font-bold mb-8'>대학 생활 밸런스 게임</h1>

      {currentQuestionIndex < BalanceGameQuestions.length && (
        <div className='flex flex-col items-center'>
          <h2 className='text-xl mb-16'>대학생활 첫 걸음! 수강 신청, 어떻게 할래?</h2>
          <div className='flex flex-col items-center'>
            <h2 className='text-md'>
              {currentQuestionIndex + 1}/{BalanceGameQuestions.length}
            </h2>
            <h2 className='text-2xl mb-8'>{BalanceGameQuestions[currentQuestionIndex].topic}</h2>
            <div className='flex flex-col space-y-16'>
              <button
                className='cursor-pointer py-2 w-90 border-2 border-black bg-yellow-400 active:bg-yellow-700 rounded-lg'
                onClick={() => {
                  setcurrentQuestionIndex(currentQuestionIndex + 1);
                  setResults([
                    ...results,
                    BalanceGameQuestions[currentQuestionIndex].selects.top.type,
                  ]);
                }}
              >
                {BalanceGameQuestions[currentQuestionIndex].selects.top.select}
              </button>
              <button
                className='cursor-pointer py-2 w-90 border-2 border-black bg-yellow-400 active:bg-yellow-700 rounded-lg '
                onClick={() => {
                  setcurrentQuestionIndex(currentQuestionIndex + 1);
                  setResults([
                    ...results,
                    BalanceGameQuestions[currentQuestionIndex].selects.bottom.type,
                  ]);
                }}
              >
                {BalanceGameQuestions[currentQuestionIndex].selects.bottom.select}
              </button>
            </div>
          </div>
        </div>
      )}
      {currentQuestionIndex === BalanceGameQuestions.length && (
        <div className='flex flex-col items-center'>
          <h1 className='text-xl mb-8'>결과</h1>
          <p className='text-3xl'>{finalResult}</p>
        </div>
      )}
    </>
  );
};

export default BalanceGame;
