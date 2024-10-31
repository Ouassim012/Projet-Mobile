import React, { createContext, useContext, useState } from 'react';

type TypingContextType = {
  isTyping: boolean;
  setIsTyping: (typing: boolean) => void;
};

const TypingContext = createContext<TypingContextType | undefined>(undefined);

export const TypingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isTyping, setIsTyping] = useState(false);
  
  return (
    <TypingContext.Provider value={{ isTyping, setIsTyping }}>
      {children}
    </TypingContext.Provider>
  );
};

export const useTypingContext = () => {
  const context = useContext(TypingContext);
  if (!context) {
    throw new Error('useTypingContext must be used within a TypingProvider');
  }
  return context;
};
