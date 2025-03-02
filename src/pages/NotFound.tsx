import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className='flex flex-col items-center justify-center my-auto'>
      <h1 className='text-6xl font-bold text-gray-800'>404</h1>
      <p className='text-xl text-gray-600 mt-4'>페이지를 찾을 수 없습니다.</p>
      <Link
        to='/'
        className='mt-6 px-6 py-2 border-2 border-black bg-yellow-400 text-lg rounded-lg shadow-md hover:bg-yellow-500 transition'
      >
        홈으로 돌아가기
      </Link>
    </div>
  );
};

export default NotFound;
