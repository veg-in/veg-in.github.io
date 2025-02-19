import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from '@/components/Layout';
import TestPage from '@/pages/TestBE';
import Landing from '@/pages/Landing';
import About from '@/pages/About';
import Quiz from '@/pages/Quiz';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path='/' element={<Landing />} />
          <Route path='/about' element={<About />} />
          <Route path='/quiz' element={<Quiz />} />
          <Route path='/test-be' element={<TestPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
