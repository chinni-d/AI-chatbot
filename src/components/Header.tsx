import React from 'react';
import { Bot } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const Header: React.FC = () => {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm transition-colors duration-300">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Bot className="h-8 w-8 text-blue-500" />
          <h1 className="text-xl font-semibold text-gray-800 dark:text-white">ChatBot</h1>
        </div>
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Header;