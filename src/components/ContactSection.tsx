//import { Mail, Linkedin, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ContactMethod } from '../types';

const ContactSection: React.FC = () => {
  const contactMethods: ContactMethod[] = [
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

  return (
    <section id="contact" className="py-20 px-6 bg-muted/30">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-6">Let's Work Together</h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
          I'm always interested in new opportunities and exciting projects. 
          Whether you have a question or just want to say hi, feel free to reach out!
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {contactMethods.map((method) => (
            <Button 
              key={method.label} 
              size="lg" 
              variant={method.variant === 'default' ? 'default' : 'outline'} 
              asChild
            >
              <a 
                href={method.url} 
                target={method.url.startsWith('mailto:') ? undefined : '_blank'} 
                rel={method.url.startsWith('mailto:') ? undefined : 'noopener noreferrer'} 
                className="flex items-center gap-2"
              >
                <method.icon className="h-5 w-5" />
                {method.label}
              </a>
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

