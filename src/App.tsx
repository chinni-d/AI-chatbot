import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import ChatInterface from './components/ChatInterface';
import Header from './components/Header';

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <Header />
        <main className="container mx-auto px-4 py-6">
          <ChatInterface />
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;