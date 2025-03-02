import { BalanceGameResults } from '@/data/BalanceGameResult';
// import { storage } from '@/lib/firebase';
// import { ref, getDownloadURL } from 'firebase/storage';

interface ResultPageProps {
  finalResult: string;
}
export default function ResultPage({ finalResult }: ResultPageProps) {
  // useEffect(() => {
  //   const storageRef = ref(storage, 'yonsei.png');
  //   console.log(storageRef);
  //   const gb = async () => {
  //     // const blob = await getBlob(storageRef);
  //     // console.log(blob);
  //     getDownloadURL(storageRef).then((url) => {
  //       console.log(url); // 올바른 URL 출력됨
  //     });
  //   };
  //   gb();
  // });

  // finalResult 값을 기반으로 올바른 키를 찾습니다
  const resultKey = Object.keys(BalanceGameResults).find((key) => key.includes(finalResult));

  // 찾은 키가 있으면 해당 정보를 사용하고, 없으면 기본값 사용
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
      <div className='flex flex-col items-center'>
        <h1 className='mb-8'>내가 고른 대학 생활은...</h1>
      </div>
      <img src='/result_dokpami.png' className='w-48 h-48 object-contain mb-4' />
      <div className='font-bold text-xl mb-5'>{info.title}</div>
      <div className='text-sm mb-4'>{info.subtitle}</div>
      <div className='mb-2 text-sm'>{info.participantRate}</div>{' '}
      <div className='mb-10 whitespace-pre-line text-sm'>{info.content}</div>{' '}
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
}
