import React from 'react';
import { Mail, Linkedin } from 'lucide-react';

interface FooterProps {}

export const Footer: React.FC<FooterProps> = () => {
  const currentYear = new Date().getFullYear();

  const handleMailClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.location.href = 'mailto:Support@Aadhya-Ai.com';
  };

  return (
    <footer className="mt-auto py-6 px-4 border-t border-gray-200/50 dark:border-gray-700/50">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <div className="text-sm text-gray-600 dark:text-gray-400 text-center md:text-left">
          © {currentYear} Aadhya & PotentiaNexus Ltd. All rights reserved.
        </div>
        <div className="flex items-center space-x-6 text-sm text-gray-600 dark:text-gray-400">
          <a 
            href="mailto:Support@Aadhya-Ai.com"
            onClick={handleMailClick}
            className="flex items-center space-x-2 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors"
            aria-label="Send email to support"
          >
            <Mail className="w-4 h-4" />
            <span>Support@Aadhya-Ai.com</span>
          </a>
          <a 
            href="https://www.linkedin.com/company/aadhya-ai/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors"
            aria-label="Visit our LinkedIn page"
          >
            <Linkedin className="w-4 h-4" />
            <span>Follow us on LinkedIn</span>
          </a>
        </div>
      </div>
    </footer>
  );
}; 