import { Outlet, useLocation, Link } from 'react-router-dom';
import { ConnectButton } from '@mysten/dapp-kit';

export default function Layout() {
  const location = useLocation();
  const isSpecialPage = location.pathname === '/about' || location.pathname === '/AboutNext';

  return (
    <div
      className={`max-w-[600px] min-h-screen mx-auto flex flex-col items-center justify-start px-8 overflow-y-auto ${
        isSpecialPage ? 'bg-[#69B0EE]' : 'bg-[#88D0E5]'
      }`}
    >
      <div className='w-full flex justify-between'>
        <Link to='/' className='border-2 border-black p-2 m-2'>
          Home
        </Link>
        {/* tailwindCSS 안 먹힘 좀 찾아봐야 할 듯 */}
        <ConnectButton connectText='임시 Connect Wallet' />
      </div>
      <Outlet />
    </div>
  );
}
