import React from 'react';

export interface AppwriteDocument {
  $id: string;
  $createdAt?: string;
  $updatedAt?: string;
}

export interface Project extends AppwriteDocument {
  $id: string;
  title: string;
  description: string;
  technologies: string;
  status: string;
  github: string;
  liveLink?: string;
}

export interface NavigationItem {
  label: string;
  href: string;
  isActive: boolean;
}

export interface Skill {
  name: string;
  animationDelay?: string;
}

export interface SocialLink {
  platform: string;
  icon: React.ElementType;
  url: string;
}

export interface ContactMethod {
  label: string;
  icon: React.ElementType;
  url: string;
  variant: 'default' | 'outline';
}

export interface Experience extends AppwriteDocument {
  $id: string;
  company: string;
  role: string;
  period: string;
  description: string;
  skills: string;
  emoji?: string;
}

