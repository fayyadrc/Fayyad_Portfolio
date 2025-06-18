import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, Github, ArrowLeft } from 'lucide-react';
import Navigation from "./Navigation";
import { Button } from '@/components/ui/button';
import { Project } from '../types';

const MoreProjects = () => {
    const [activeSection, setActiveSection] = useState('projects');

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    
    const allProjects: Project[] = [
        {
            title: "Expense Manager",
            description: "A comprehensive expense tracking application built with modern web technologies. Features include expense categorization, budget tracking, and detailed financial reports with data visualization.",
            technologies: ["Python", "Flask", "HTML", "CSS", "Bootstrap", "MongoDB"],
            status: "Completed",
            github: "https://github.com/fayyadrc/ExpenseTracker",
            liveLink: "https://example.com/expense-manager" 
        },
        {
            title: "CraveAI",
            description: "An intelligent food recommendation app that uses AI to suggest personalized meal options. Built with modern React architecture and real-time data synchronization.",
            technologies: ["React", "Tailwind CSS", "Supabase", "Authentication", "Real-time DB"],
            status: "In Development",
            github: "https://github.com/fayyadrc/CraveAI"
        },
        {
            title: "Portfolio Website",
            description: "A modern, responsive portfolio website built with React and TypeScript, featuring smooth animations and optimized performance.",
            technologies: ["React", "TypeScript", "Tailwind CSS"],
            status: "Completed",
            github: "https://github.com/fayyadrc/Portfolio_ReactTypeScript",
            liveLink: "https://fayyadrc.vercel.app" 
        },
        {
            title: "Premier League Analysis",
            description: "Machine Learning Model for Predictive Analytics",
            technologies: ["Testing"],
            status: "In Development",
            github: "#"
        },
    ];

    return (
        <div className="min-h-screen bg-background text-foreground">
            <Navigation activeSection={activeSection} setActiveSection={setActiveSection} />
            <main className="pt-20 pb-16 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-12">
                        <Link 
                            to="/" 
                            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-6"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Back to Home
                        </Link>
                        
                        <div className="text-center">
                            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                                All Projects
                            </h1>
                            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                                Explore my complete portfolio of projects, from web applications to full-stack solutions. 
                                Each project represents a learning experience.
                            </p>
                        </div> 
                    </div>

                    <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
                        {allProjects.map((project, index) => (
                            <div
                                key={project.title}
                                className="group bg-card border border-border rounded-xl p-6 flex flex-col justify-between h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-2 hover:border-primary/20"
                            >
                                <div>
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-primary"></div>
                                            <span className="text-xs text-muted-foreground font-medium">
                                                PROJECT {String(index + 1).padStart(2, '0')}
                                            </span>
                                        </div>
                                        <div className="flex gap-2">
                                            <Button variant="ghost" size="icon" asChild>
                                                <a href={project.github} target="_blank" rel="noopener noreferrer">
                                                    <Github className="h-4 w-4" />
                                                </a>
                                            </Button>
                                        </div>
                                    </div>

                                    <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                                        {project.title}
                                    </h3>

                                    <p className="text-muted-foreground mb-6 leading-relaxed text-sm">
                                        {project.description}
                                    </p>

                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {project.technologies.map((tech) => (
                                            <span
                                                key={tech}
                                                className="px-3 py-1 bg-muted/60 text-muted-foreground text-xs rounded-full font-medium hover:bg-primary/10 transition-colors"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex justify-between items-center mt-auto">
                                    <span className={`text-xs px-3 py-1 rounded-full ${
                                        project.status === 'Completed'
                                            ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                                            : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                                    }`}>
                                        {project.status}
                                    </span>
                                    
                                    {project.liveLink && (
                                        <Button variant="ghost" size="sm" className="text-xs" asChild>
                                            <a href={project.liveLink} target="_blank" rel="noopener noreferrer">
                                                Live Demo
                                            </a>
                                        </Button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default MoreProjects;