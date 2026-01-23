import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { MembershipPage } from './pages/MembershipPage';
import { UpsellPage } from './pages/UpsellPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/membership" element={<MembershipPage />} />
        <Route path="/upsell" element={<UpsellPage />} />
      </Routes>
    </Router>
  );
}

export default App;
