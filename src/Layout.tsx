import { Outlet, useLocation } from 'react-router-dom';
import Footer from './components/Footer';
export default function Layout() {
  const location = useLocation();

  // Footer를 숨기고 싶은 페이지 목록
  const noFooterPages = ['/', '/login'];

  return (
    <div>
      <div className='w-screen max-w-[600px] h-screen mx-auto px-5'>
        <Outlet />
      </div>
      {!noFooterPages.includes(location.pathname) && <Footer />}
    </div>
  );
}
