import { Experience, Project, ContactMethod } from '../types';
import { Mail, Linkedin, Github } from 'lucide-react';
import { databases } from './appwrite';

const DATABASE_ID = '68597f02002b29f05826';
const EXPERIENCES_COLLECTION_ID = '68597f0c00162bcc6dc8';
const PROJECTS_COLLECTION_ID = '68597f9a0036c4dd2a46';

export async function fetchExperiences(): Promise<Experience[]> {
  const res = await databases.listDocuments(DATABASE_ID, EXPERIENCES_COLLECTION_ID);
  return res.documents as unknown as Experience[];
}

export async function fetchProjects(): Promise<Project[]> {
  const res = await databases.listDocuments(DATABASE_ID, PROJECTS_COLLECTION_ID);
  return res.documents as unknown as Project[];
}

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