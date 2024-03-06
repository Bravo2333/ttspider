import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import OtherPage from './pages/OtherPage';
import DataPage from './pages/DataPage';

function App() {
  return (
    <div className="App">
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/data" element={<DataPage />} />
        <Route path="/other" element={<OtherPage />} />
        {/* 可以在这里继续添加更多的路oute */}
      </Routes>
    </Router>
  </div>

  );
}

export default App;
