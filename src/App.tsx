import { BrowserRouter as Router,  Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import ProjectsSection from './components/ProjectsSection';
import MoreProjects from "./components/MoreProjects";
import ExperienceSection from './components/ExperienceSection';
import Footer from './components/Footer';
import './App.css';

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
                
            </Routes>
            <Footer />
        </div>
    );
}

export default App;