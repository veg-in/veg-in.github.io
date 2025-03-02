import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from '@/Layout';
import Landing from '@/pages/Landing/Landing';
import About from '@/pages/Landing/About';
import BalanceGame from '@/pages/BalanceGame/BalanceGame';
import TestBE from '@/pages/TestBE';
import QRTreasure from './pages/QRTreasure/QRTreasure';
import AboutNext from '@/pages/Landing/AboutNext';
import NotFound from './pages/NotFound';

export default function Routers() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path='/' element={<Landing />} />
          {/* TODO : About이 Landing 으로 바뀌어서 /(root) 경로로 가고, */}
          <Route path='/about' element={<About />} />
          {/* TODO : AboutNext가 About으로 바뀌어서 /about으로 가야 함 */}
          <Route path='/aboutnext' element={<AboutNext />} />

          {/* Balane Game Path */}
          <Route path='/balancegame'>
            <Route index element={<BalanceGame />} />
          </Route>

          {/* QR Treasure Path */}
          <Route path='/qrtreasure'>
            <Route index element={<QRTreasure />} />
          </Route>

          <Route path='/test-be' element={<TestBE />} />

          {/* 404 Not Found */}
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}
