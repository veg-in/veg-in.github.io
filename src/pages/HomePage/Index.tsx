import { IoInformationCircleOutline, IoSettingsOutline } from 'react-icons/io5';

import PostList from '@/pages/HomePage/PostList';
import FoodSpotlight from '@/pages/HomePage/FoodSpotlight';
import { Link } from 'react-router-dom';

export default function Index() {
  return (
    <div className='w-full h-screen flex flex-col pb-[100px]'>
      <div className='flex h-fit w-full justify-between py-4'>
        <img
          src='/logo.png' // Replace with actual image path
          alt='logo'
          width={60}
          height={60}
          className='rounded-full'
        />
        <div className='flex  place-content-center items-center gap-x-3'>
          <IoInformationCircleOutline size={38} />
          <Link to='/mapage'>
            <IoSettingsOutline size={38} />
          </Link>
        </div>
      </div>
      <div className='flex flex-1 flex-col justify-center gap-y-10 '>
        <img src='/banner.png' alt='Banner' className='w-full' />
        <PostList />
        <FoodSpotlight />
      </div>
    </div>
  );
}
