const BalanceGame = () => {
  return (
    <>
      <h1 className='text-4xl font-bold mb-8'>대학 생활 밸런스 게임</h1>

      <h2 className='text-xl mb-8'>1/11</h2>
      <h2 className='text-xl mb-16'>대학생활 첫 걸음! 수강 신청, 어떻게 할래?</h2>
      <div className='flex flex-col space-y-16'>
        <button
          className='cursor-pointer py-2 w-64 border-2 border-black bg-yellow-400 active:bg-yellow-700 rounded-lg'
          onClick={() => {}}
        >
          21학점 듣고 조기 졸업
        </button>
        <button
          className='cursor-pointer py-2 w-64 border-2 border-black bg-yellow-400 active:bg-yellow-700 rounded-lg '
          onClick={() => {}}
        >
          15학점 듣고 초과 학기
        </button>
      </div>
    </>
  );
};

export default BalanceGame;
