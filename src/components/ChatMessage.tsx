import React from 'react';
import { Message } from '../types';

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.sender === 'user';
  const timestamp = new Date(message.timestamp).toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit' 
  });

  return (
    <div 
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} animate-fade-in`}
    >
      <div className={`flex ${isUser ? 'flex-row-reverse' : 'flex-row'} items-end max-w-[80%]`}>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 
                        ${isUser ? 'ml-2 bg-blue-500 text-white' : 'mr-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white'}`}>
          <span className="text-xs">{isUser ? 'You' : 'AI'}</span>
        </div>
        
        <div 
          className={`py-3 px-4 rounded-2xl ${
            isUser 
              ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-tr-none' 
              : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white rounded-tl-none'
          }`}
        >
          <p className="text-sm whitespace-pre-wrap break-words">{message.content}</p>
          <span className={`text-xs mt-1 block ${
            isUser ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'
          }`}>
            {timestamp}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;