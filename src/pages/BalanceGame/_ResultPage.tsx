import { BalanceGameResults } from '@/data/BalanceGameResult';
import { useEffect, useState } from 'react';
import { getTotalTypeCount, getTypePercentage } from './api';

interface ResultPageProps {
  finalResult: string;
}
export default function ResultPage({ finalResult }: ResultPageProps) {
  const [totalTypeCount, setTotalTypeCount] = useState(0);
  const [typePercentage, setTypePercentage] = useState('');

  const resultInfo = BalanceGameResults[finalResult];

  if (!resultInfo) return <div>결과를 찾을 수 없습니다.</div>;

  useEffect(() => {
    const getResultData = async ({ finalResult }: { finalResult: string }) => {
      const { totalTypeCount } = await getTotalTypeCount();
      const { typePercentage } = await getTypePercentage({ finalResult });

      setTotalTypeCount(totalTypeCount);
      setTypePercentage(typePercentage);
    };
    getResultData({ finalResult });
  }, [finalResult]);

  return (
    <>
      <div className='flex flex-col items-center'>
        <h1 className='mb-8'>내가 고른 대학 생활은...</h1>
      </div>
      <img src={resultInfo.imageURL} className='w-48 h-48 object-contain mb-4' />
      <div className='font-bold text-xl mb-5'>{resultInfo.title}</div>
      <div className='text-sm mb-4'>{resultInfo.subtitle}</div>
      <div className='text-sm mb-4'>
        전체 {totalTypeCount}개의 결과 중 {typePercentage}%가 이 유형이에요!
      </div>
      <div className='mb-10 whitespace-pre-line text-sm'>{resultInfo.content}</div>{' '}
      <div className='mb-3 text-sm text-center'>
        @dokpami.nft를 팔로우한 후 <br /> 태그해서 인스타 스토리를 올리면 oo을 받을 수 있어!
      </div>
      <div className='mb-10 text-sm font-bold'>인스타 스토리 이벤트 참여하기</div>
      <button
        className='mb-8 font-bold text-sm bg-white border-2 border-black rounded px-3 py-2 hover:bg-blue-600'
        onClick={() => {}}
      >
        Google Login하고 더 많은 이벤트 참여하기
      </button>
      <div className='text-sm font-bold'>BlockBlock x DOKPAMI</div>
    </>
  );
}
