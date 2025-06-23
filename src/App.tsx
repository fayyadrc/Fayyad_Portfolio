import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import ProjectsSection from './components/ProjectsSection';
import MoreProjects from "./components/MoreProjects";
import ExperienceSection from './components/ExperienceSection';
import Footer from './components/Footer';
import './App.css';
import Admin from './pages/Admin';
import Login from './pages/Login';
import { authService } from './lib/authService';
import type { ReactNode } from 'react';

function RequireAuth({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);
  const location = useLocation();

  useEffect(() => {
    authService.getSession().then((user) => {
      setIsAuth(!!user);
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Checking auth...</div>;
  if (!isAuth) return <Navigate to="/login" state={{ from: location }} replace />;
  return children;
}

function App() {
    const [activeSection, setActiveSection] = useState('about');
    const [isDarkMode, setIsDarkMode] = useState(false); // Dark mode state

    return (
        <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-background text-foreground'}`}>
            <Navigation activeSection={activeSection} setActiveSection={setActiveSection}/>
            <Routes>
                <Route path="/" element={
                    <>
                        <HeroSection />
                        <ExperienceSection />
                        <ProjectsSection />
                    </>
                } />
                <Route path="/projects" element={<MoreProjects />} />
                <Route path="/admin" element={<RequireAuth><Admin /></RequireAuth>} />
                <Route path="/login" element={<Login />} />
            </Routes>
            <Footer />
        </div>
    );
}

export default App;