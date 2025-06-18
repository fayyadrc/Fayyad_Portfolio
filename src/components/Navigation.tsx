import React, { useState } from 'react';
import { Github, Linkedin, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { NavigationItem } from '../types';

interface NavigationProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeSection, setActiveSection }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle('dark', !isDarkMode);
  };

  const navigationItems: NavigationItem[] = [
    { label: 'about', href: '#', isActive: activeSection === 'about' },
    { label: 'projects', href: '#projects', isActive: activeSection === 'projects' },
    { label: 'contact', href: '#contact', isActive: activeSection === 'contact' }
  ];

  return (
      <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-md border-b border-border z-50">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold">@fayyadrc</h1>
            <div className="hidden md:flex space-x-8">
              {navigationItems.map((item) => (
                  <button
                      key={item.label}
                      onClick={() => setActiveSection(item.label)}
                      className={`capitalize transition-colors hover:text-primary ${
                          item.isActive ? 'text-primary' : 'text-muted-foreground'
                      }`}
                  >
                    {item.label}
                  </button>
              ))}
            </div>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" asChild>
                <a href="https://github.com/fayyadrc" target="_blank" rel="noopener noreferrer">
                  <Github className="h-5 w-5" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a href="https://www.linkedin.com/in/fayyadrc/" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="h-5 w-5" />
                </a>
              </Button>
              <button onClick={toggleDarkMode} className="p-2">
                {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>
      </nav>
  );
};

export default Navigation;