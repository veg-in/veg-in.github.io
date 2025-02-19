import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div className='w-[600px] h-[1080px] mx-auto bg-[#88D0E5] flex flex-col items-center justify-start p-8 overflow-y-auto'>
      <Outlet />
    </div>
  );
}
