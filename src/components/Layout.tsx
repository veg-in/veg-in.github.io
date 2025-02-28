import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div className='max-w-[600px] min-h-screen mx-auto bg-[#88D0E5] flex flex-col items-center justify-start px-8 overflow-y-auto'>
      <Outlet />
    </div>
  );
}
