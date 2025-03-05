import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from '@/Layout';
import Landing from '@/pages/Landing/Landing';
import Intro from '@/pages/Landing/Intro';
import BalanceGame from '@/pages/BalanceGame/BalanceGame';
import TestBE from '@/pages/TestBE';
import QRTreasure from './pages/QRTreasure/QRTreasure';
import QRLanding from './pages/QRTreasure/QRLanding';
import QRAdmin from './pages/QRTreasure/QRAdmin';
import QRResult from './pages/QRTreasure/QRResult';
import NotFound from './pages/NotFound';

export default function Routers() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path='/klandingk' element={<Landing />} />
          {/* TODO : About이 Landing 으로 바뀌어서 /(root) 경로로 가고, */}
          <Route path='/intro' element={<Intro />} />
          {/* TODO : AboutNext가 About으로 바뀌어서 /about으로 가야 함 */}

          {/* Balane Game Path */}
          <Route path='/balancegame'>
            <Route index element={<BalanceGame />} />
          </Route>

          {/* QR Treasure Path - Updated with nested routes */}
          <Route path='/qrtreasure'>
            <Route index element={<QRLanding />} />
            <Route path='map' element={<QRTreasure />} />
            <Route path='admin' element={<QRAdmin />} />
            <Route path='result' element={<QRResult />} />
          </Route>

          <Route path='/test-be' element={<TestBE />} />

          {/* 404 Not Found */}
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}
