import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, Github, ArrowLeft } from 'lucide-react';
import Navigation from "./Navigation";
import { Button } from '@/components/ui/button';
import { Project } from '../types';
import { fetchProjects } from '../lib/data';

const MoreProjects = () => {
    const [activeSection, setActiveSection] = useState('projects');
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);
        fetchProjects().then(data => {
            setProjects(data);
            setLoading(false);
        });
    }, []);
    
    if (loading) {
        return <div className="text-center py-20">Loading projects...</div>;
    }

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
                        {projects.map((project, index) => (
                            <div
                                key={project.$id}
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
                                        {(
                                            typeof project.technologies === 'string'
                                                ? (project.technologies as string).split(',').map((t: string) => t.trim())
                                                : (project.technologies as string[])
                                        ).map((tech: string) => (
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