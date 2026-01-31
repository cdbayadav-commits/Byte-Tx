import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './components/Landing';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        {/* Persistent Backgrounds */}
        <div className="gradient-overlay"></div>
        <div className="grain-overlay"></div>

        {/* Content Routing */}
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
