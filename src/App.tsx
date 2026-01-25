import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { MembershipPage } from './pages/MembershipPage';
import { UpsellPage } from './pages/UpsellPage';

// Admin pages
import { AdminLoginPage } from './pages/admin/LoginPage';
import { DashboardPage } from './pages/admin/DashboardPage';
import { PromptsPage } from './pages/admin/PromptsPage';
import { ResourcesPage } from './pages/admin/ResourcesPage';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/membership" element={<MembershipPage />} />
        <Route path="/upsell" element={<UpsellPage />} />

        {/* Admin routes */}
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin/dashboard" element={<DashboardPage />} />
        <Route path="/admin/prompts" element={<PromptsPage />} />
        <Route path="/admin/resources" element={<ResourcesPage />} />
      </Routes>
    </Router>
  );
}

export default App;
