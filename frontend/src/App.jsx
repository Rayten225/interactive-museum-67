import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Museum from './pages/Museum';
import Interactive from './pages/Interactive';
import ObjectPage from './pages/ObjectPage';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/museum" element={<Museum />} />
        <Route path="/interactive" element={<Interactive />} />
        <Route path="/exhibit/:id" element={<ObjectPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;