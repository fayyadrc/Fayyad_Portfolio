import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import ProjectsSection from './components/ProjectsSection';
import MoreProjects from "./components/MoreProjects";
import ExperienceSection from './components/ExperienceSection';
import Footer from './components/Footer';
import { Project } from './types';
import './App.css';

function App() {
    const [activeSection, setActiveSection] = useState('about');
    const [isDarkMode, setIsDarkMode] = useState(false); // Dark mode state

    const projects: Project[] = [
        {
            title: "Expense Manager",
            description: "A comprehensive expense tracking application built with modern web technologies. Features include expense categorization, budget tracking, and detailed financial reports.",
            technologies: ["Python", "Flask", "HTML", "CSS", "Bootstrap", "MongoDB"],
            status: "Completed",
            link: "#"
        },
        {
            title: "CraveAI",
            description: "An intelligent food recommendation app that uses AI to suggest personalized meal options. Built with modern React architecture and real-time data synchronization.",
            technologies: ["React", "Tailwind CSS", "Supabase", "Authentication", "Real-time DB"],
            status: "In Development",
            link: "#"
        }
    ];




    return (
        <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-background text-foreground'}`}>
            <Navigation activeSection={activeSection} setActiveSection={setActiveSection}/>
            <Routes>
                <Route path="/" element={
                    <>
                        <HeroSection />
                        <ExperienceSection />
                        <ProjectsSection projects={projects} />
                    </>
                } />
                <Route path="/projects" element={<MoreProjects />} />
            </Routes>
            <Footer />
        </div>
    );
}

export default App;