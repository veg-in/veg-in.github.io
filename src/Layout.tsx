import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div>
      <div className='w-screen h-screen max-w-[600px] px-5 mx-auto'>
        <Outlet />
      </div>
    </div>
  );
}
