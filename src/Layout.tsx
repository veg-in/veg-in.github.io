import { Outlet, Link, useLocation } from 'react-router-dom';
import { ConnectButton } from '@mysten/dapp-kit';

export default function Layout() {
  const location = useLocation();
  // const isLandingPage = location.pathname === '/about' || location.pathname === '/aboutnext';
  const isQrTreasurePage = location.pathname === '/qrtreasure';

  return (
    <div
      className='max-w-[600px] min-h-screen bg-[#BEDEFE] mx-auto flex flex-col items-center justify-start overflow-y-auto'
      // isLandingPage ? '' : ''
    >
      {!isQrTreasurePage && (
        <div className='w-full flex justify-between'>
          <Link to='/' className='border-2 border-black p-2 m-2'>
            Home
          </Link>
          {/* tailwindCSS 안 먹힘 좀 찾아봐야 할 듯 */}
          <ConnectButton connectText='임시 Connect Wallet' />
        </div>
      )}
      <Outlet />
    </div>
  );
}
