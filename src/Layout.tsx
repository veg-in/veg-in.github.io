import { Outlet, useLocation, Link } from 'react-router-dom';

export default function Layout() {
  const location = useLocation();
  const isSpecialPage = location.pathname === '/about' || location.pathname === '/AboutNext';

  return (
    <div
      className={`max-w-[600px] min-h-screen mx-auto flex flex-col items-center justify-start px-8 overflow-y-auto ${
        isSpecialPage ? 'bg-[#69B0EE]' : 'bg-[#88D0E5]'
      }`}
    >
      <Link to='/' className='border-2 border-black p-2 m-2'>
        Home
      </Link>
      <Outlet />
    </div>
  );
}
