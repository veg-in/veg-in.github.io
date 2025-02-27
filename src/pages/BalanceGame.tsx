import { useEffect, useState } from 'react';
import { BalanceGameQuestions } from '@/data/BalanceGame';

const BalanceGame = () => {
  const [count, setCount] = useState(0);
  const [results, setResults] = useState(['']);
  const [totalResultCount, setTotalResultCount] = useState({});
  const [top, setTop] = useState('');

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

    setTop(sortedKeys[0]);
    setTotalResultCount(resultCount);
  }, [results]);
  return (
    <>
      <h1 className='text-4xl font-bold mb-8'>대학 생활 밸런스 게임</h1>

      <h2 className='text-xl mb-16'>대학생활 첫 걸음! 수강 신청, 어떻게 할래?</h2>

      {count < BalanceGameQuestions.length && (
        <div className='flex flex-col items-center'>
          <h2 className='text-xl'>
            ({count + 1}/{BalanceGameQuestions.length})
          </h2>
          <h2 className='text-xl mb-8'>{BalanceGameQuestions[count].topic}</h2>
          <div className='flex flex-col space-y-16'>
            <button
              className='cursor-pointer py-2 w-90 border-2 border-black bg-yellow-400 active:bg-yellow-700 rounded-lg'
              onClick={() => {
                setCount(count + 1);
                setResults([...results, BalanceGameQuestions[count].selects.top.type]);
              }}
            >
              {BalanceGameQuestions[count].selects.top.select}
            </button>
            <button
              className='cursor-pointer py-2 w-90 border-2 border-black bg-yellow-400 active:bg-yellow-700 rounded-lg '
              onClick={() => {
                setCount(count + 1);
                setResults([...results, BalanceGameQuestions[count].selects.bottom.type]);
              }}
            >
              {BalanceGameQuestions[count].selects.bottom.select}
            </button>
          </div>
        </div>
      )}
      {count === BalanceGameQuestions.length && (
        <div className='flex flex-col items-center'>
          <h1 className='text-2xl'>결과</h1>
          <p>(높음) 감투, 집순 , 욜로 , 공부 , N잡 , 연애 , 갓생 , 인싸 (낮음)</p>

          <p>{JSON.stringify(totalResultCount)}</p>
          <p>{top}</p>
        </div>
      )}
    </>
  );
};

export default BalanceGame;
