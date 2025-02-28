import { Link, Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div className='max-w-[600px] min-h-screen mx-auto bg-[#88D0E5] flex flex-col items-center justify-start px-8 overflow-y-auto'>
      <Link to='/' className='border-2 border-black p-2 m-2'>Home</Link>
      <Outlet />
    </div>
  );
}
