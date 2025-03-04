import { Outlet, useLocation } from 'react-router-dom';

export default function Layout() {
  const location = useLocation();
  const isLandingPage =
    location.pathname === '/about' ||
    location.pathname === '/aboutnext' ||
    location.pathname == '/qrtreasure';

  return (
    <div
      className={`max-w-[600px] min-h-screen bg-[#BEDEFE] mx-auto flex flex-col items-center justify-start overflow-y-auto ${
        isLandingPage ? '' : 'px-8'
      }`}
    >
      <Outlet />
    </div>
  );
}
