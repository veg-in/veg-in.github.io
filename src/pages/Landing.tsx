import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <>
      <div className='flex gap-8 mb-12 mt-8'>
        <div className='text-7xl'>🔥</div>
      </div>
      <h1 className='text-4xl font-bold mb-8'>Welcome to Our Site</h1>
      <div className='flex gap-4'>
        <Link
          to='/about'
          className='px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors'
        >
          소개 페이지
        </Link>
        <Link
          to='/quiz'
          className='px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors'
        >
          퀴즈 페이지
        </Link>
      </div>
    </>
  );
};

export default Landing;
`ÍÍ`;
