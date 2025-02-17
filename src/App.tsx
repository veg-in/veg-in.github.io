import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import TestPage from './pages/TestBE';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/test-be' element={<TestPage />} />
    </Routes>
  );
}

export default App;
