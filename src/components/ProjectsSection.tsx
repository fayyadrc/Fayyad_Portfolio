import React from 'react';
import { Link } from 'react-router-dom';
import { Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Project } from '../types';

const ProjectsSection: React.FC = () => {
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
      status: "Under Development",
      link: "#"
    }
  ];

  return (
    <section id="projects" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Featured Projects</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A selection of projects that I've worked on.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <div
              key={project.title}
              className="group bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" asChild>
                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </div>

              <p className="text-muted-foreground mb-4 leading-relaxed">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex justify-between items-center">
                <span className={`text-xs px-2 py-1 rounded-full ${
                  project.status === 'Completed'
                    ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                    : 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
                }`}>
                  {project.status}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/projects"
            className="text-primary hover:underline text-sm font-medium"
          >
            View all projects →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;