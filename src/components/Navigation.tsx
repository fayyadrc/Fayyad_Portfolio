import React, { useState } from 'react';
import { Github, Linkedin, Sun, Moon , FileUser} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { NavigationItem } from '../types';
import { Link } from 'react-router-dom';

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
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-3 md:py-4">
          <div className="flex justify-between items-center">
            <Link to="/" className="text-lg md:text-xl font-bold hover:text-primary transition-colors">
        @fayyadrc
      </Link>
            <div className="hidden md:flex space-x-6 md:space-x-8">
              {navigationItems.map((item) => (
                  <button
                      key={item.label}
                      onClick={() => setActiveSection(item.label)}
                      className={`capitalize transition-colors hover:text-primary text-sm md:text-base ${
                          item.isActive ? 'text-primary' : 'text-muted-foreground'
                      }`}
                  >
                    {item.label}
                  </button>
              ))}
            </div>
            <div className="flex space-x-2 md:space-x-4">
              <Button variant="ghost" size="icon" asChild className="h-8 w-8 md:h-10 md:w-10">
                <a href="https://github.com/fayyadrc" target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4 md:h-5 md:w-5" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild className="h-8 w-8 md:h-10 md:w-10">
                <a href="https://www.linkedin.com/in/fayyadrc/" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="h-4 w-4 md:h-5 md:w-5" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild className="h-8 w-8 md:h-10 md:w-10">
                <a href="" target="_blank" rel="noopener noreferrer">
                  <FileUser className="h-4 w-4 md:h-5 md:w-5" />
                </a>
              </Button>
              <button onClick={toggleDarkMode} className="p-1.5 md:p-2">
                {isDarkMode ? <Sun className="h-4 w-4 md:h-5 md:w-5" /> : <Moon className="h-4 w-4 md:h-5 md:w-5" />}
              </button>
            </div>
          </div>
        </div>
      </nav>
  );
};

export default Navigation;