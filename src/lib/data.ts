import { Experience, Project, ContactMethod } from '../types';
import { Mail, Linkedin, Github } from 'lucide-react';

export const experiences: Experience[] = [
  {
    company: "Hogwarts School of Witchcraft and Wizardry",
    role: "Data Analyst Intern",
    period: "June 2025 – Present",
    description: "Wingardium Leviosa! Analyzed large datasets to extract actionable insights. Developed interactive dashboards and reports to visualize data trends.",
    skills: ["Python", "Pandas", "Numpy"],
    emoji: "💻",
  },
  {
    company: "Rolta EMEA",
    role: "Software Engineer Intern",
    period: "July 2023 – August 2023",
    description: "Developed Admin and Employee Dashboards for project hour management. Collaborated with cross-functional teams using full-stack development skills.",
    skills: ["ASP.NET MVC", "C#", "SQL Server"],
    emoji: "💻",
  }
];

export const allProjects: Project[] = [
  {
    title: "Expense Manager",
    description: "A comprehensive expense tracking application built with modern web technologies. Features include expense categorization, budget tracking, and detailed financial reports with data visualization.",
    technologies: ["Python", "Flask", "HTML", "CSS", "Bootstrap", "MongoDB"],
    status: "Completed",
    github: "https://github.com/fayyadrc/ExpenseTracker",
    liveLink: ""
  },
  {
    title: "CraveAI",
    description: "An intelligent food recommendation app that uses AI to suggest personalized meal options. Built with modern React architecture and real-time data synchronization.",
    technologies: ["React", "Tailwind CSS", "Supabase", "Authentication", "Real-time DB"],
    status: "Under Development",
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
    status: "Under Development",
    github: "#"
  }
];

export const topProjects: Project[] = allProjects.slice(0, 2);

export const skills: string[] = [
  "JavaScript/TypeScript", "Python", "React", "MongoDB", "Flask/Django",
  "Tailwind/Bootstrap", "Supabase", "Git", "HTML/CSS", "PostgreSQL/SQLServer"
];

export const contactMethods: ContactMethod[] = [
  {
    label: 'Send Email',
    icon: Mail,
    url: 'mailto:fayyad@gmail.com',
    variant: 'default'
  },
  {
    label: 'Connect on LinkedIn',
    icon: Linkedin,
    url: 'https://www.linkedin.com/in/fayyadrc/',
    variant: 'outline'
  },
  {
    label: 'View GitHub',
    icon: Github,
    url: 'https://github.com/fayyadrc',
    variant: 'outline'
  }
]; 