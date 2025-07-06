import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { SidebarProvider } from './contexts/SidebarContext';
import ProtectedRoute from './components/ProtectedRoute';
import ScrollToTop from './components/ScrollToTop';
import ScrollToTopButton from './components/ScrollToTopButton';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';

import Programs from './pages/Programs';
import SkillsPrograms from './pages/SkillsPrograms';
import OrphanageServices from './pages/OrphanageServices';
import FightGBV from './pages/FightGBV';
import GenderViolenceServices from './pages/GenderViolenceServices';
import WomenSupport from './pages/WomenSupport';
import Projects from './pages/Projects';
import Registration from './pages/Registration';
import Application from './pages/Application';
import Notification from './pages/Notification';
import Contact from './pages/Contact';
import Profile from './pages/Profile';
import AdminDashboard from './pages/AdminDashboard';
import TrainerDashboard from './pages/TrainerDashboard';
import StudentDashboard from './pages/StudentDashboard';
import CorpDashboard from './pages/CorpDashboard';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <SidebarProvider>
        <Router>
          <ScrollToTop />
          <div className="App">
            <Header />
            <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />

              <Route path="/programs" element={<Programs />} />
              <Route path="/skills-programs" element={<SkillsPrograms />} />
              <Route path="/orphanage-services" element={<OrphanageServices />} />
              <Route path="/fight-gbv" element={<FightGBV />} />
              <Route path="/gender-violence-services" element={<GenderViolenceServices />} />
              <Route path="/women-support" element={<WomenSupport />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/registration" element={<Registration />} />
              <Route path="/application" element={<Application />} />
              <Route path="/notification" element={<Notification />} />
              <Route path="/contact" element={<Contact />} />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin"
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/trainer"
                element={
                  <ProtectedRoute allowedRoles={['trainer']}>
                    <TrainerDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/student"
                element={
                  <ProtectedRoute allowedRoles={['trainee']}>
                    <StudentDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/corp"
                element={
                  <ProtectedRoute allowedRoles={['corp_member']}>
                    <CorpDashboard />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>
          <Footer />
          <ScrollToTopButton />
        </div>
      </Router>
      </SidebarProvider>
    </AuthProvider>
  );
}

export default App;
