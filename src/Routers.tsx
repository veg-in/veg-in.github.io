import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from '@/Layout';
import Landing from '@/pages/LandingPage/LandingPage';
import NotFound from './pages/NotFound';
import Home from './pages/HomePage/Index';
import Login from './pages/Login';
import MyPage from './pages/MyPage/Index';

export default function Routers() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path='/' element={<Landing />} />
          <Route path='/home' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/mapage' element={<MyPage />} />

          {/* 404 Not Found */}
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}
