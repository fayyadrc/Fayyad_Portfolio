import { Mail, Linkedin, Github } from 'lucide-react';

const Footer = () => {


    return (
        <footer className="py-8 px-6 border-t border-gray-200">
            <div className="max-w-6xl mx-auto text-center space-y-4">
                {/* Let's Connect Section */}
                <div className="flex items-center justify-center gap-4">
                    <span className="font-medium">Let's Connect!</span>
                    <div className="flex items-center gap-3">
                        <a
                            href="mailto:fayyadrc@gmail.com"
                            className="p-2  hover:text-gray-900 transition-colors"
                            aria-label="Email"
                        >
                            <Mail size={20} />
                        </a>
                        <a
                            href="https://linkedin.com/in/your-profile"
                            className="p-2  hover:text-gray-900 transition-colors"
                            aria-label="LinkedIn"
                        >
                            <Linkedin size={20} />
                        </a>
                        <a
                            href="https://github.com/your-username"
                            className="p-2  hover:text-gray-900 transition-colors"
                            aria-label="GitHub"
                        >
                            <Github size={20} />
                        </a>
                    </div>
                </div>

                {/* Copyright */}
                <p className=" text-sm">
                    © {new Date().getFullYear()} Fayyad Rahman • Built with React, TypeScript & Appwrite
                </p>
            </div>
        </footer>
    );
};

export default Footer;